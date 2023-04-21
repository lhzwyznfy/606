async function drawChart(dates) { 
    console.log(dates)
    // 1. Access data
    //tags
    const tag = "./Participants/P1/m-day"+dates+"/tags.csv"
    const tags = await d3.csv(tag)
    //HR
    const pathHR = "./Participants/P1/m-day"+dates+"/HR.csv"//"./1128-1/HR1128.csv"
    const dataset1 = await d3.csv(pathHR) 
    //IBI
    const pathIBI = "./Participants/P1/m-day"+dates+"/IBI.csv"
    const dataIBI1 = await d3.csv(pathIBI);
    //TEMP
    const pathTEMP = "./Participants/P1/m-day"+dates+"/TEMP.csv"
    const dataset3 = await d3.csv(pathTEMP)
    const TEMPvalue = Object.values(dataset3); 
    //SCR
    const pathSCR = "./Participants/P1/m-day"+dates+"/SCR.csv"
    const dataSCR1 = await d3.csv(pathSCR);
    //Accessors
    const HRAccessor = d=>d.HR;
    const EDAccessor = d => d.EDA;
    const TEMPAccessor = d => d.TEMP;
    //1900字符串转时间
    const dateParseH = d3.timeParse("%H:%M");
    const dateAccessorH = d => dateParseH(d.TIME.slice(-5));
    //监测当天字符串转时间
    const dateParse = d3.timeParse("%Y/%m/%d %H:%M");
    const dateAccessor1 = d => dateParse(d.TIME);
    //SCR-------------------------------------  
    SCRtime = [];
    for(i=0;i<dataSCR1.length;i++){
        SCRtime.push(parseInt(dataSCR1[i].peak_end_times_stamp));
    }
    //dataset1添加时间
    const T0 = parseInt(dataset1[0].TIMESTAMP);
    let T00 = 0;
    for (i=0;i<dataset1.length;i++){
        dataset1[i].HR = parseFloat(dataset1[i].HR);
        dataset1[i].TIMESTAMP =  T00 + T0;
        T00+=1;
    }
    //TEMP------------------------每秒的平均值 TEMPvalueAVE 
    const TEMPvalueAVE = [];
    TEMPstart = parseInt(TEMPvalue[0].TIMESTAMP);
    var sumTEMP  = 0;
    tempitem = {};
    averagetemp = 0;
    for(i=0;i<TEMPvalue.length;i++){
      sumTEMP+=parseFloat(TEMPvalue[i].TEMP);
      if ((i+1)%4 == 0){
        TEMPstart = TEMPstart+1;
        tempitem.TIMESTAMP = TEMPstart;
        tempitem.TEMP = (sumTEMP/4).toFixed(2);
        TEMPvalueAVE.push(tempitem);
        averagetemp += sumTEMP;
        sumTEMP=0;
        tempitem={};
        }
    }
    averagetemp = (averagetemp/TEMPvalue.length).toFixed(2);
    //把SCR和TEMP加到HR里面------------------------------------
    map = {};
    result = [];
    itemmach = {};
    baseline = 0;
    for(i=0;i<dataset1.length;i++){
        baseline += parseFloat(dataset1[i].HR);
        if(!TEMPvalueAVE[i]){
            dataset1[i].TEMP = averagetemp;
        }else{
            dataset1[i].TEMP = TEMPvalueAVE[i].TEMP;}
        if(SCRtime[i]){
            ind = dataset1.findIndex(d => d.TIMESTAMP == SCRtime[i]);
            if(ind != -1){dataset1[ind].SCR = 1;}
        }
    }
    HRbaseline = (baseline/dataset1.length).toFixed(2);
    console.log(HRbaseline);
    console.log("现在我们有了每秒对应的HR和TEMP,以及这一秒有无SCR")
    console.log(dataset1)
    //以上是基本的dataset1--------------




    //筛选掉不合格的IBI
    dataIBI1.filter( d => 450<= parseFloat(d.IBI)*1000<=1250);
    const IBIminute = [];//分钟的平均IBI
    timejiange = 360;//这里
    function IBIminu(t,t0){
        if(t-t0<=timejiange){//60s//这里改了
            return true;
        }else{
            return false;
        }
    }
    numn = 0;  
    linshi = [];
    ceshi = [];
    IBIlinshi = 0;
    jishu = 0;
    chushiTIME = parseInt(dataIBI1[0].TIME);
    itemzong = {};
    handle = [];
    TTOstart = chushiTIME;
    TIMESS = 0;
    baselinehrv = 0;
    edaaverage = 0;
    n=0;
    for(i=0;i<dataIBI1.length;i++){
        IBIvalue = parseFloat(dataIBI1[i].IBI)*1000;//IBI单位从s改成ms
        thistime = parseInt(dataIBI1[i].TTO)/* - parseFloat(dataIBI1[0].TTO)*/ + chushiTIME;//这一行的时间戳
        if(IBIminu(thistime,TTOstart)){
            linshi.push(IBIvalue);
            IBIlinshi= IBIlinshi + IBIvalue;
            continue;   
        }
        TTOstart = TTOstart + timejiange;//60s//在这里改了
        //超出范围之后
        jishumin = i-1;//第i个的IBI数值并没有算进linshi里
        if(linshi.length==0){avg=0; itemzong.L = 0;}else{avg = IBIlinshi/linshi.length;}
        //判断这两分钟内是不是一个IBI都没有，否则算出IBI平均值   
        IBIminute.push(avg);//将这几分钟的平均值加入数组
        itemzong.L = linshi.length;//这几分钟内有几个IBI     
        itemzong.IBIAVG = avg;//这几分钟的IBI平均值
        //parseInt(parseFloat(dataIBI1[jishumin].TTO) - parseFloat(dataIBI1[0].TTO) + chushiTIME);
        TIMESS =new Date((TTOstart) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');//这里，两分钟end的时间，而非时间戳
        //TIMESS1=parseInt(parseFloat(dataIBI1[i].TTO) - parseFloat(dataIBI1[0].TTO) + chushiTIME);
        itemzong.TIME = TIMESS;
        itemzong.TIMESTAMP = TTOstart;
        
        //加SCR、TEMP、HR
        const HRHRVS = dataset1.findIndex(item=>item.TIMESTAMP === TTOstart-timejiange);//这里，持续的时间
        const HRHRVE = dataset1.findIndex(item=>item.TIMESTAMP === TTOstart);
        HRM = 0;
        TEMPM = 0;
        SCRC = 0;
        if (HRHRVS == -1 || HRHRVE ==-1){
          itemzong.HR = 0;
          itemzong.EDA = 0;
          itemzong.TEMP = 0;
          itemzong.SCRS = 0;
        }else{
        //求两分钟的平均TEMP、平均HR，以及SCR个数
          for(n=0;n<timejiange;n++){//这里
            HRM = parseFloat(HRM) + parseFloat(dataset1[HRHRVS+n].HR);
            TEMPM = TEMPM + parseFloat(dataset1[HRHRVS+n].TEMP);
            if(dataset1[HRHRVS+n].SCR){SCRC += 1;}
          }
          itemzong.HR = parseFloat((HRM/(timejiange)).toFixed(2));
          itemzong.TEMP = parseFloat((TEMPM/(timejiange)).toFixed(2));
          itemzong.SCRS = SCRC;

        }
        //加SCR、TEMP、HR
    
        //SDNN
        SQAR=0;
        for(n=0;n<linshi.length;n++){
          SQAR =  SQAR + Math.pow((linshi[n]-avg), 2);
        }
        let SDNNavg = Math.sqrt(SQAR/(linshi.length-1));//样本标准差 单位ms
        if(isNaN(SDNNavg)){SDNNavg=0;}
        if(SDNNavg>250){SDNNavg=250;}
        itemzong.SDNN = parseFloat(SDNNavg.toFixed(2));
        baselinehrv = baselinehrv + itemzong.SDNN;
        handle.push(itemzong);
        TIMESS = 0;
        numn = i;
        linshi = [];
        ceshi = [];
        linshi.unshift(IBIvalue);//在linshi这个数组最前面加上现在这个没被加进去的IBI
        IBIlinshi = IBIvalue;
        jishu++;
        itemzong ={};
    }

    //求平均滤波
    avgHR = [];
      for(i=0;i<handle.length;i++){
        if(i==0){avgHR.push(HRbaseline);continue;}
        if(i==1 || i==handle.length-1 || i==handle.length-2){
          avgHR.push(handle[i].HR);
          }else{
          avg1 = ((parseFloat(handle[i-2].HR) + parseFloat(handle[i-1].HR) + parseFloat(handle[i].HR) + parseFloat(handle[i+1].HR )+ parseFloat(handle[i+2].HR))/5).toFixed(2);
          avgHR.push(avg1);}
        }
        res=handle.map((item,index)=>{
          return {...item,HR:parseFloat(avgHR[index])}
        })
    //求平均滤波
    
    baselinehrv = baselinehrv/handle.length;
    console.log("baselinehrv "+baselinehrv)
    console.log("现在的完整数组为handle:");
    console.log(handle);

    //1900年的时间-------------------------------------------------------------------
    const oriTIME = [];
    const dateParsetest = d3.timeParse("%H:%M");
    const strA = "9:00"; 
    const strB = "19:00"; 
    starttime = parseInt(handle[0].TIME.slice(-5,-3));
    endtime = parseInt(handle[handle.length-1].TIME.slice(-5,-3))+1;
    starttimemin = handle[0].TIME.slice(-5);
    endtimemin = handle[handle.length-1].TIME.slice(-5);
    const A = dateParsetest(strA);
    const B = dateParsetest(strB);
    oriTIME.push(A);
    oriTIME.push(B);
    console.log(oriTIME)
    const C = dateParsetest((parseInt(strA)-1)+":58");
    const D = dateParsetest(parseInt(strB)+":58");
    dataobj1 = res.filter((d=>dateAccessorH(d)>C && dateAccessorH(d)<D));
    console.log("dataobj1为筛选时间后的数组:")
    console.log(dataobj1);

    //定义画布
    const width = 800
    let dimensions = {
    width: width,
    height: width*2,
    radius: width / 2,
    margin: {
      top: 0,
      right: 120,
      bottom: 0,
      left: 120,
    },
    }
    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom
    dimensions.boundedRadius = dimensions.radius
      - ((dimensions.margin.left + dimensions.margin.right) / 2)

    const getCoordinatesForAngle = (angle, offset = 0.8) => [//偏移量是1    ？？？？
      Math.cos(angle - Math.PI / 2) * dimensions.boundedRadius * offset,//PI=pai.Math.PI = 3.14 = 180°
      Math.sin(angle - Math.PI / 2) * dimensions.boundedRadius * offset,//cos²x+sin²x=1
    ]

    //Draw canvas
    d3.select("#wrapper").html("")
    const wrapper = d3.select("#wrapper")//是整体的画布
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    const bounds1 = wrapper.append("g")//画布里创建居中对齐的组
    .style("transform", `translate(${
      dimensions.margin.left + dimensions.boundedRadius
      }px, ${
      dimensions.margin.top + dimensions.boundedRadius
      }px)`)
    //  Draw canvas
    
    //刻度
    //时间对应到角度
    const angleScale1 = d3.scaleTime()//时间对应到角度
        .domain(d3.extent(oriTIME))//d3.extent(dataobj1, dateAccessorH))
        .range([0, Math.PI * 2]);// this is in radians
    //--------------------------EDA-------------------------------------------------------------------------------------
    const getXFromDataPoint = (d, offset = 0.8) => getCoordinatesForAngle(//offset 显示宽度？ coordinate坐标
        angleScale1(dateAccessorH(d)),
        0.3
        )[0]
    const getYFromDataPoint = (d, offset = 0.8) => getCoordinatesForAngle(
        angleScale1(dateAccessorH(d)),
        0.3
        )[1]
    const EDARadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj1, EDAccessor))
        .range([1, 20])
    //--------------------------EDA-------------------------------------------------------------------------------------------

    //TEMP----------------------------------------------------------------------------------------------------------------
        // make sure to use a sqrt scale for circle areas
        const TEMPRadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj1, TEMPAccessor))
        .range([1, 6])
    //TEMP----------------------------------------------------------------------------------------------------------------
    
    //外围
    const peripherals = bounds1.append("g")//上一个组里又加了这个组
    const hours = d3.timeHours(...angleScale1.domain()) 

    // HRV
    const HRVAccessor = d=>d.SDNN;
    const SCRAccessor = d=>d.SCRS;

    const radiusScaleHRV = d3.scaleLinear()
    .domain(d3.extent([10,250]))
    .range([width*0.15, width*0.25])//dimensions.boundedRadius 直径
    .nice()
    const radiusScaleHR = d3.scaleLinear()
    .domain(d3.extent([40,180]))
    .range([width*0.15, width*0.25])//dimensions.boundedRadius 直径
    .nice()
  
    //draw hrv--------------------------------------------
    const linearscr = d3.scaleLinear().domain(d3.extent(dataobj1, SCRAccessor)).range([0.8,0.2]);

    var π = Math.PI,
    τ = 2 * π,
    n = 360;
    console.log(dataobj1.filter(d=> d.SDNN != 0))
    const HRVRadiusScalexuxian = d3.scaleSqrt()//平方根
      .domain([0,250])//d3.extent(dataobj1, HRVAccessor)
      .range([HRbaseline/7, HRbaseline/3])//50
        
      //试一下滤镜
      var defslvjing = bounds1.append("defs");
      // 添加模糊滤镜
      var filterBlur = defslvjing.append('filter')
        .attr('id', 'filterBlur')
        .attr('x', -2)
        .attr('y', -2)
        .attr('width', 3)
        .attr('height', 3);
      // 添加辅助滤镜
      filterBlur.append('feOffset')
        .attr('result', 'offOut')
        .attr('in', 'SourceGraphic')
        .attr('dx', 0)
        .attr('dy', 0); 
      // 添加模糊滤镜
      filterBlur.append('feGaussianBlur')
        .attr('result', 'blurOut')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', 10);  
      // 添加辅助滤镜
      filterBlur.append('feBlend')
        .attr('in', 'SourceGraphic')
        .attr('in2', 'blurOut')
        .attr('mode', 'multiply');
      //试一下滤镜

      //以下是一组
      const areaHRGenerator = d3.areaRadial()
      .angle(d => angleScale1(dateAccessorH(d)))
      .outerRadius(d=>radiusScaleHR(HRAccessor(d)))
      .innerRadius(d=>4*HRVRadiusScalexuxian(HRVAccessor(d)))
      .curve(d3.curveNatural); 

      //blur
      var blurscr = bounds1.append("defs");
      var blurr = blurscr.append("filter")
      .attr("id","blur")
      .append("feGaussianBlur")
      .attr("stdDeviation", 10);

      //试一下线
      const getXFromDataPointline = (d, offset = 0.8) => getCoordinatesForAngle(//offset 显示宽度？ coordinate坐标
      angleScale1(dateAccessorH(d)),
      offset
      )[0]
      const getYFromDataPointline = (d, offset = 0.8) => getCoordinatesForAngle(
      angleScale1(dateAccessorH(d)),
      offset
      )[1]

      const lineGroup = bounds1.append("g").attr("z-index","3")
      const masks = lineGroup.append("defs")

      //蒙版
      //水墨
     const mask = masks.append("mask").attr("id","mask1")
     mask.append("rect")
      .attr("width", width*0.5)
      .attr("height",width*0.5)
      .attr("fill","black")

     const areaHRV2 = mask.append("path")
      .datum(dataobj1)
      .attr("d", areaHRGenerator(dataobj1))   
      .style("fill","white")
      .attr("stroke","none")
      .attr("opacity","1")
      //水墨
      //蒙版

    datapath = [];
    dataobj1.forEach( d=>{     
      p = [];   
      item={}
      item.SCRS = d.SCRS;
      item.TIME = d.TIME;
      item.outR = HRAccessor(d);
      item.SDNN = d.SDNN;
      p.push(item);
      item = {};
      datapath.push(p);
    })
    console.log("这个是datapath");
    console.log(datapath);//object


    const mous = d3.select("#mous");

    var HRt = dataobj1.map(d=>d.HR);
    var HRVt = dataobj1.map(d=>d.SDNN);
    var SCRt = dataobj1.map(d=>d.SCRS);

    for(i=0;i<datapath.length;i++){
          const Ht = HRt[i];
          const SDNNt = HRVt[i];
          const SCt = SCRt[i];

          let g = lineGroup.append("g").datum(datapath[i])
          g.selectAll("path").data(datapath[i]).join("path")
            //.attr("class", "SCRline")
            .attr("stroke","none")
            .attr("d",
              d3.arc()
              .outerRadius(d=>radiusScaleHR(d.outR)+20)
              .innerRadius(0)
              .startAngle(function(d) { return angleScale1(dateAccessorH(d)); })
              .endAngle(function(d) { return angleScale1(dateAccessorH(d))+0.03 }))
            .attr("fill", function(d) { 
              if(d.SCRS != 0){  return d3.hsl(123, 0, Math.abs(linearscr(d.SCRS))); }
              else{ return "#efefef" }
            })
            .attr("opacity","1")
            .style("mask",'url(#mask1)')
            .style("filter", "url(#blur)")

            .on("mouseover",(event,d) => {
              const t = mous.style("opacity", 1).html("生理数据<br><br>"+"HR:"+Ht+"<br>"+"HRV:"+SDNNt+"<br>"+"SCR:"+SCt
              )//.style("color","#203d5d").style("font-size","0.8em").style("padding","20px").style()

              d3.select(event.currentTarget)
                .transition()
                .duration(300)
                .attr("transform",d=>{
                  return "scale(" + "1.5" + ")" 
                  })

                .attr("fill",function(d) { 
                  if(d.SCRS != 0 && d.SDNN>baselinehrv && d.outR>HRbaseline){  return d3.hsl(20, 200, Math.abs(linearscr(d.SCRS)));  }
                  else if(d.SCRS >=5 || d.SDNN>baselinehrv || d.outR>HRbaseline){ return d3.hsl(40, 100, Math.abs(linearscr(d.SCRS))); }
                  else{return d3.hsl(100, 100, Math.abs(linearscr(d.SCRS)));}
                }
                );
              //console.log("选择到啦！")
            })//这里是改颜色

            .on("mousemove",(event,d)=>{
              //console.log((event.pageY-10))
              return mous.style('top', (event.pageY-dimensions.margin.top)+'px').style('left',(event.pageX-dimensions.margin.left)+'px')
            })

            .on("mouseout",(event,d) => {
              mous.style("opacity", 0)

              d3.select(event.currentTarget)
              .transition()
              .duration(2000)
              .attr("transform",d=>{
                return "scale(" + "1" + ")" 
                })
            });


      }




      //tags-----------------------------------------------------------------------------------------------------------------------
      const getXFromDataPointtags = (d, offset = 0.8) => getCoordinatesForAngle(//offset 显示宽度？ coordinate坐标
      angleScale1(dateAccessorH(d)),
      0.7
      )[0]
      const getYFromDataPointtags = (d, offset = 0.8) => getCoordinatesForAngle(
      angleScale1(dateAccessorH(d)),
      0.7
      )[1]
      Ttags = [];
      //console.log(tags);
      for(i=0;i<tags.length;i++){
        itemtags = {};
        if(i==0 && tags.length-1 !=0){//按两下是高压
          console.log("i=0")
          if(parseInt(tags[i].TIMESTAMP)+2>parseInt(tags[i+1].TIMESTAMP)){
            itemtags.H = tags[i].TIMESTAMP;
            itemtags.L = 0;
            itemtags.TIME = new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');

          }else{
            itemtags.L = tags[i].TIMESTAMP;
            itemtags.H = 0;
            itemtags.TIME = new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
          } 
        }

        if(i==0 && tags.length-1 ==0){//按两下是高压
            itemtags.L = tags[i].TIMESTAMP;
            itemtags.H = 0;
            itemtags.TIME = new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
        }
        if(i==tags.length-1 && tags.length-1 !=0){
          if(parseInt(tags[i-1].TIMESTAMP)+2>parseInt(tags[i].TIMESTAMP)){
            continue;
          }else{
            itemtags.L = tags[i].TIMESTAMP;
            itemtags.H = 0;
            itemtags.TIME = new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
          }
        }
        if(i != 0 && i != tags.length -1){
          if(parseInt(tags[i-1].TIMESTAMP)+2>parseInt(tags[i].TIMESTAMP)){
            continue;
          }else{
            if(parseInt(tags[i].TIMESTAMP)+2>parseInt(tags[i+1].TIMESTAMP)){
              itemtags.H = tags[i].TIMESTAMP;
              itemtags.L = 0;
              itemtags.TIME = new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
            }else{
              //console.log("111")
              itemtags.L = tags[i].TIMESTAMP;
              itemtags.H = 0;
              itemtags.TIME= new Date(parseInt(tags[i].TIMESTAMP) * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
            }
          }
        }
        Ttags.push(itemtags)
      }
      console.log("Ttags")
      console.log(Ttags)
      //Ttags = Ttags.filter(d => parseInt(d.H) < parseInt(dataobj1[dataobj1.length-1].TIMESTAMP) && parseInt(d.L) < parseInt(dataobj1[dataobj1.length-1].TIMESTAMP))
      const tagsGroupH = bounds1.append("g").attr("z-index","10")

      //tags
      const basetag = bounds1.append("circle")
      .attr("r","195")
      .attr("class","baseline1")
      .attr("cx","0")
      .attr("cy","0")
      .attr("stroke-width","1")
      //.attr("opacity","0.2")
      .attr("stroke-dasharray","2,2,2")

      //种类 single/double
      const areaHRVtagsH = tagsGroupH.selectAll("path")
        .data(Ttags.filter(d =>parseInt(d.H) !=0))
        .enter()
        .append("path")
        .attr("transform", d => {
          x = getXFromDataPointtags(d, 1);
          y = getYFromDataPointtags(d, 1);
          return "translate(" + x + "," + y + ")"}
        )
        .attr("d",d3.arc()
        .outerRadius(5)
        .innerRadius(2.5)
        .startAngle(0)
        .endAngle(Math.PI*2))
        .attr("fill", "white")
        .style("stroke","grey")
        .attr("stroke-width","1")
        .attr("opacity","1")
        .on("click",(event,d) => {
          const t = mous.style("opacity", 1).html("时间<br><br>"+new Date(parseInt(d.H) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '))
          d3.select(event.currentTarget)
            .transition()
            .duration(300)
            .attr("fill","orange")
            .transition()
            .duration(2000)
            .attr("fill","white")
            //mous.style("opacity", 0)
        })

      const tagsGroupL = bounds1.append("g").attr("z-index","10")
      const areaHRVtagsL = tagsGroupL.selectAll("circle")
        .data(Ttags.filter(d =>parseInt(d.L)!=0))
        .enter()
        .append("circle")
        .attr("fill","white")
        .attr("cx", d => (getXFromDataPointtags(d, 1)))
        .attr("cy", d =>  (getYFromDataPointtags(d, 1)))
        .attr("r","5")
        .style("stroke","grey")
        .attr("stroke-width","1")
        .attr("opacity","1")
        .on("click",(event,d) => {
          const t = mous.style("opacity", 1).html("时间<br><br>"+new Date(parseInt(d.L) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '))
          d3.select(event.currentTarget)
            .transition()
            .duration(300)
            .attr("fill","orange")
            .transition()
            .duration(2000)
            .attr("fill","white")
            //mous.style("opacity", 0)
        })

      //tags

      //记录


      //x和y坐标
      const getCoordinatesForAnglerect = (banjing, angle, offset = 0.8) => [//偏移量是1    ？？？？
        Math.cos(angle - Math.PI / 2) * banjing ,//PI=pai.Math.PI = 3.14 = 180°
        Math.sin(angle - Math.PI / 2) * banjing ,//cos²x+sin²x=1
      ]

      const getXFromDataPointrect = (d, offset = 0.8) => getCoordinatesForAnglerect(//offset 显示宽度？ coordinate坐标
        radiusScaleHRV(HRVAccessor(d)),
        angleScale1(dateAccessorH(d)),
        0.845
        )[0]
      const getYFromDataPointrect = (d, offset = 0.8) => getCoordinatesForAnglerect(
        radiusScaleHRV(HRVAccessor(d)),
        angleScale1(dateAccessorH(d)),
        0.845
        )[1]
      //x和y坐标

      //HRV的基线
      const basecircle = bounds1.append("circle")
        .attr("r", d=> radiusScaleHR(HRbaseline))
        .attr("class","baseline")
        .attr("fill","none")
        .attr("cx","0")
        .attr("cy","0")
        .attr("stroke-width","0.8")
        .attr("stroke-dasharray","0.5,1,4")
      //基准圆
      const basecircle0 = bounds1.append("circle")
        .attr("r", "80")
        .attr("class","baseline0")
        .attr("fill","none")
        .attr("cx","0")
        .attr("cy","0")
        .attr("stroke-width","0.5")
        .attr("opacity","0.2")
        .attr("stroke-dasharray","4,4,4")

      //起始位置
      starttriangle = d3.symbol().type(d3.symbolTriangle).size(20);
      const tickLabelBackgrounds = peripherals.append("path")
        .attr("transform", "translate(0,"+(-radiusScaleHR(baseline))+") rotate(90)")
        .attr("d",starttriangle)
        .attr("fill", "grey")

      //时间背景圆
      const timebackground = bounds1.append("path")
        .attr("class","timebackground")
        .attr("fill",d=>{if(baselinehrv<60 && HRbaseline>70){return "#2F2F2F"}else{return "#413633"}})
        .attr("d",d3.arc()
        .outerRadius(245)
        .innerRadius(222)
        .startAngle(0)
        .endAngle(360))
        .attr("stroke-width","0.5")
        //.attr("transform","translate(10,0)")
        //.attr("stroke-dasharray","4,4,4") 

      //分割线
      const annotationGroup = bounds1.append("g")
      const drawAnnotation = (angle, offset, text) => {
        const [x1, y1] = getCoordinatesForAngle(angle, offset)
        const [x2, y2] = getCoordinatesForAngle(angle, offset+0.1)  
        annotationGroup.append("line")
          .attr("class", "annotation-line")
          .attr("x1", x1)
          .attr("x2", x2)
          .attr("y1", y1)
          .attr("y2", y2)
        annotationGroup.append("text")
          .attr("class", "annotation-text")
          .attr("x", d=>{if(x2>0){return x2+6}else{return x2-20}})
          .attr("y", y2)
          .text(text)
      }

      //时间刻度
      for(i=parseInt(strA)+1;i<parseInt(strB);i++){
        drawAnnotation(angleScale1(dateParseH(i + ":00")), 0.7, i+":00");
      }
      if(parseInt(strB.slice(-2))>0){
        drawAnnotation(angleScale1(dateParseH(parseInt(strB) + ":00")), 0.7, parseInt(strB)+":00");
      }
      drawAnnotation(0, 0.7, strA);


      //记录
      const ipt = d3.select("#ipt");//输入
      calculate = 0;


      const drawtagline = (angle, offset) => {
        const [x2, y2] = getCoordinatesForAngle(angle, offset+0.3);
        xnote = 0;
        tnote = 0;
        linel = 60;
        if(x2>0){
          xnote = x2+linel;
          tnote = x2+2*linel;
        }else{
          xnote = x2-linel;
          tnote = x2-2*linel; 
        }

        annotationGroup.append("line")
          .attr("class", "annotation-line")
          .attr("x1", 0)
          .attr("x2", x2)
          .attr("y1", 0)
          .attr("y2", y2)

        annotationGroup.append("line")
          .attr("class", "annotation-line")
          .attr("x1",x2)
          .attr("y1",y2)
          .attr("x2",xnote)
          .attr("y2",y2)

        const textcircle = annotationGroup.append("g");
        textcircle.append("circle")
          .attr("r","5px")
          .attr("fill","black")
          .attr("cx",xnote)
          .attr("cy",y2)
          .on("click",(event,d)=>{
              calculate += 1;
              if(calculate % 2 ==1){
              d3.select(event.currentTarget)
                .transition()
                .duration(200)
                .attr("fill","orange")
              }else{
              d3.select(event.currentTarget)
                .transition()
                .duration(200)
                .attr("fill","black")    
              }
          })
                       
        textcircle.append("text")
          .text("事件记录")
          .attr("font-size","0.6em")
          .attr("fill","black")
          .attr("x",tnote)
          .attr("y",y2)
          .on("click",(event,d)=>{
            if(document.getElementById("ipt").style.display != 'none'){
              d3.select(event.currentTarget).text(context)
              document.getElementById("ipt").style.display = 'none';
            }else{
              document.getElementById("ipt").style.display = '';
            }



          })

        //const t = mous.style("opacity", 1).html("时间<br><br>"+new Date(parseInt(d.H) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '))
      }

      for(i=0;i<Ttags.length;i++){
        drawtagline(angleScale1(dateParseH(Ttags[i].TIME.slice(-5))),0.7);
      }


}
//drawChart()




  //交互-----------------------------------------------------------------------------------------------------
   /* const listenerCircle = bounds1.append("circle")
      .attr("class", "listener-circle")
      .attr("r", dimensions.width /2.5)
      .on("mousemove", onMouseMove)
      .on("mouseleave", onMouseLeave)
    const tooltip = d3.select("#tooltip")
    const tooltipLine = bounds1.append("path")
      .attr("class", "tooltip-line")

    function onMouseMove(e) {
      const [x, y] = d3.mouse(this)
      const getAngleFromCoordinates = (x, y) => Math.atan2(y, x)//弧度值
      let angle = getAngleFromCoordinates(x, y) + Math.PI / 2
      if (angle < 0) angle = (Math.PI * 2) + angle

    const tooltipArcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(dimensions.boundedRadius * 0.6)
      .startAngle(angle+0.02)
      .endAngle(angle - 0.02)

    tooltipLine.attr("d", tooltipArcGenerator())
      .style("opacity", 0.2)
      .style("fill","blue")

    tooltip
      .style("opacity", 1)
      .style("transform", `translate(${-150}px,${1100}px)`)

    //日期
    const date = angleScale1.invert(angle)
    const dateString = d3.timeFormat("%H:%M")(date)
    const todayD = dataobj1[0].TIME.slice(0,-5);
    const todayM = todayD+dateString;
    const dataPoint = dataobj1.filter(d => d.TIMESTAMP == todayM)[0]
    tooltip.select("#tooltip-date")
      .text(d3.timeFormat(todayD+" %H:%M")(date))

    if(dataPoint != undefined){
      //文字
      tooltip.select("#tooltip-HRV-min")
        .text(HRVAccessor(dataPoint).toFixed(2)+"/ms")
      //tooltip.select("#tooltip-cloud")
        //.text(EDAccessor(dataPoint))
      //tooltip.select("#tooltip-precipitation")
        //.text(Ttrue+"°C")
      //文字
      }
    }

    function onMouseLeave() {
      tooltipLine.style("opacity", 0)
      const todayD = dataobj1[0].TIME.slice(0,-5);
      tooltip.select("#tooltip-date")
        .text(d3.timeFormat(todayD))
      tooltip.select("#tooltip-HRV-min")
      .text("0/ms")
      tooltip.select("#tooltip-cloud")
        .text("0")
      tooltip.select("#tooltip-precipitation")
        .text("0°C")
    }*/

  //交互-----------------------------------------------------------------------------------------------------