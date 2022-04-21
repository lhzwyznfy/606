async function drawChart() {

    // 1. Access data

  const pathHR = "./day1/HR.csv"//"./1128-1/HR1128.csv"
  const dataset1 = await d3.csv(pathHR)
  //console.table(dataset1[0].TIMESTAMP)  
    //添加时间
    const T0 = parseInt(dataset1[0].TIMESTAMP);
    let T00 = 0;
    for (i=0;i<dataset1.length;i++){
        dataset1[i].TIMESTAMP =  T00 + T0;
        T00+=1;
    }
    //添加时间

    //EDA-------------------------------------
    const pathEDA = "./day1/EDA.csv"//"./1128-1/EDA.csv"
    const dataset2 = await d3.csv(pathEDA)
    const EDAvalue = Object.values(dataset2);  

    //console.log(dataset2);
    const EDAccessor = d => d.EDA;

    //每秒的平均值
    const EDAvalueAVE = [];
    var sumEDA  = 0;
    for(i=0;i<EDAvalue.length;i++){
    sumEDA+=parseFloat(EDAvalue[i].EDA);
    
      if ((i+1)%4 == 0){
        let K = sumEDA/4;
        //console.log(K.toFixed(2))
        EDAvalueAVE.push(K.toFixed(2));
        //console.log(sumEDA);
        sumEDA=0;
      }
    }
    //console.log(EDAvalueAVE);
    //EDA-------------------------------------

    //TEMP------------------------------------
    const pathTEMP = "./day1/TEMP.csv"//"./1128-1/TEMP.csv"
    const dataset3 = await d3.csv(pathTEMP)
    const TEMPvalue = Object.values(dataset3);  

    const TEMPAccessor = d => d.TEMP;

      //每4个值取一个平均
    const TEMPvalueAVE = [];
    var sumTEMP  = 0;
    for(i=0;i<TEMPvalue.length;i++){
    sumTEMP+=parseFloat(TEMPvalue[i].TEMP);
    
      if ((i+1)%4 == 0){
        TEMPvalueAVE.push(Math.abs((sumTEMP/4-30)*6).toFixed(2));
        //console.log(sumEDA);
        sumTEMP=0;
      }
    }
    //console.log(TEMPvalueAVE);
    //TEMP------------------------------------

    //把EDA和TEMP加到HR里面------------------------------------
    //console.log(datahandle);

    for (i=0;i<dataset1.length;i++){
        if(!EDAvalueAVE[i]){
            dataset1[i].EDA = 0;
        }else{
            dataset1[i].EDA = EDAvalueAVE[i];}

        if(!TEMPvalueAVE[i]){
            dataset1[i].TEMP = 0;
        }else{
            dataset1[i].TEMP = TEMPvalueAVE[i];}
        
       // console.log(1);
    }
    //console.log(dataset1[0])
    //把EDA和TEMP加到HR里面------------------------------------


    //计算IBI和HRV----------------------------------------------------------------------------------------
    const pathIBI = "./day1/IBI.csv"
    const dataIBI1 = await d3.csv(pathIBI)

    let HRVTIMEO = parseInt(dataIBI1[0].TIME);

    //第一个IBI平均值
    let IBI = 0;
    for (i=0;i<16;i++){
      IBI =  IBI + parseFloat(dataIBI1[i].IBI)*1000;
      //console.log(IBIAVG);  
    }
    let IBIAVG = IBI/16;//单位是ms

    //第一个HRV
    let HRV = 0;
    let SQAR = 0;
    for (i=0;i<16;i++){
      SQAR =  SQAR + Math.pow((dataIBI1[i].IBI*1000-IBIAVG), 2);
    //console.log(IBIAVG);  
    }
    let HRVAVG = Math.sqrt(SQAR/15);//样本标准差 单位ms
    //console.log(HRVAVG);

    
    const IBINUM = Math.floor(dataIBI1.length/16);
    //console.log(IBINUM);

    let HRVCAL = HRVAVG;
    let IBICAL = IBIAVG;
    let HRVhandle = [];
  
    for(i=0;i<IBINUM;i++){
      if(i==0){
        let item = {};
        item.SDNN = parseInt(HRVCAL);
        item.IBI = parseInt(IBICAL);
        let num = 16;
        let time =  HRVTIMEO+parseInt(dataIBI1[num].TTO)-parseInt(dataIBI1[0].TTO);
        let time1 = new Date(time * 1000).toLocaleString().replace(/:\d{1,2}$/,'');

        item.TIMESTAMP = time1;
        item.TIME = time;
        item.num = 1;

        const HRHRV = dataset1.findIndex(item=>item.TIMESTAMP === HRVTIMEO);
        if (HRHRV == -1){
            item.HR = 0;
            item.EDA = 0;
            item.TEMP = 0;
        }else{
            item.HR = parseFloat(dataset1[HRHRV].HR);
            item.EDA = parseFloat(dataset1[HRHRV].EDA);
            item.TEMP = parseFloat(dataset1[HRHRV].TEMP);
        }

        HRVhandle.push(item);
      }else{
        IBIthis = 16*(i+1);
        HRVCAL = (15*HRVCAL + Math.abs(dataIBI1[IBIthis].IBI*1000-IBICAL))/16;
        IBICAL = (15*IBICAL + dataIBI1[IBIthis].IBI*1000)/16;

        let item = {};
        item.SDNN = parseInt(HRVCAL);
        item.IBI = parseInt(IBICAL);
        let num = 16*(i+1);
        let time =  HRVTIMEO + parseInt(dataIBI1[num].TTO)-parseInt(dataIBI1[0].TTO);
        let time1 = new Date(time * 1000).toLocaleString().replace(/:\d{1,2}$/,'');

        item.TIMESTAMP = time1;
        item.TIME = time;
        item.num = 1+i;

        const HRHRV = dataset1.findIndex(item=>item.TIMESTAMP === time);
        if (HRHRV == -1){
            item.HR = 0;
            item.EDA = 0;
            item.TEMP = 0;
        }else{
            item.HR = parseFloat(dataset1[HRHRV].HR);
            item.EDA = parseFloat(dataset1[HRHRV].EDA);
            item.TEMP = parseFloat(dataset1[HRHRV].TEMP);
        }


        HRVhandle.push(item);
        //SDNN.push(parseInt(HRVCAL));
        //IBIL.push(parseInt(IBICAL));
      }
    }


    //console.log(SDNN);//^^^^^^^^^^^^
    //console.log(IBIL);//^^^^^^^^^^^^
    console.log(HRVhandle);
    dataobj = HRVhandle;

    
    //IBI----------------------------------------------------------------------------------------

  const HRAccessor = d=>d.HR;

  const dateParse = d3.timeParse("%Y/%m/%d %H:%M");
  const dateAccessor1 = d => dateParse(d.TIMESTAMP);

  const dateParseH = d3.timeParse("%H:%M");
  const dateAccessorH = d => dateParseH(d.TIMESTAMP.slice(-5));

//1900年的时间-------------------------------------------------------------------
  const oriTIME = [];
  const dateParsetest = d3.timeParse("%H:%M");
  const A = dateParsetest("9:0");
  const B = dateParsetest("22:0");
  oriTIME.push(A);
  oriTIME.push(B);

 //1900年的时间-------------------------------------------------------------------

  const width = 800
  let dimensions = {
    width: width,
    height: width,
    radius: width / 2,
    margin: {
      top: 80,
      right: 120,
      bottom: 120,
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

  //  Draw canvas

  const wrapper = d3.select("#wrapper")//是整体的画布
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)


  const bounds = wrapper.append("g")//画布里创建居中对齐的组
    .style("transform", `translate(${
      dimensions.margin.left + dimensions.boundedRadius
      }px, ${
      dimensions.margin.top + dimensions.boundedRadius
      }px)`)

//刻度
    //4
    //时间对应到角度
   
    const angleScale1 = d3.scaleTime()//时间对应到角度
        .domain(d3.extent(oriTIME))
        .range([0, Math.PI * 2]);// this is in radians


    //--------------------------EDA-------------------------------------------------------------------------------------
    const getXFromDataPoint = (d, offset = 1.3) => getCoordinatesForAngle(//offset 显示宽度？ coordinate坐标
        angleScale1(dateAccessorH(d)),
        offset
        )[0]
    const getYFromDataPoint = (d, offset = 1.3) => getCoordinatesForAngle(
        angleScale1(dateAccessorH(d)),
        offset
        )[1]

    const EDARadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj, EDAccessor))
        .range([1, 5])

    //--------------------------EDA-------------------------------------------------------------------------------------------

    //TEMP----------------------------------------------------------------------------------------------------------------
        // make sure to use a sqrt scale for circle areas
        const TEMPRadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj, TEMPAccessor))
        .range([1, 10])
    //TEMP----------------------------------------------------------------------------------------------------------------

    //外围
    const peripherals = bounds.append("g")//上一个组里又加了这个组
    

    const hours = d3.timeHours(...angleScale1.domain()) 

    //插入图片
      peripherals.append("image")
      .attr("href","./jpg/bg.png")
      .attr("width",width*1.05)
      .attr("x",-width/1.8)
      .attr("y",-width/2.06)

    //hour底色

    hours.forEach(hour => {
        const angle = angleScale1(hour)
        const [x, y] = getCoordinatesForAngle(angle)

    
    peripherals.append("line")
      .attr("x2", x)
      .attr("y2", y)
      .attr("class", "grid-line")
      .attr("opacity","0.6")
      .attr("stroke-dasharray","3")

    const [labelX, labelY] = getCoordinatesForAngle(angle, 1.05);
/////////////////////////
    // Create the label for the spoke
    peripherals.append("text")
      .attr("x", labelX)
      .attr("y", labelY)
      .attr("class", "tick-label")
      .text(d3.timeFormat("%H")(hour)+" H")
      .style("text-anchor",
        Math.abs(labelX) < 5 ? "middle" :
          labelX > 0 ? "start" :
            "end")
  })


  
  // HRV
  const HRVAccessor = d=>d.SDNN;
  const HRVAccessorp = d=>d.SDNN-20;


  const radiusScaleHRV = d3.scaleLinear()
  .domain(d3.extent([
    ...dataobj.map(HRVAccessor),//展开语法
    ...dataobj.map(HRVAccessorp),
  ]))
  .range([width*0.31, width*0.35])//dimensions.boundedRadius
  .nice()
  
  const HRVTicks = radiusScaleHRV.ticks(5)
    //console.log(HRVTicks)
    //console.log(width*0.31, width*0.35)
    //console.log(radiusScaleHRV(150))

  // Generate concentric circles for our radar chart
  const gridCircles = HRVTicks.map(d => (
    peripherals.append("circle")
      .attr("r", radiusScaleHRV(d))
      .attr("class", "grid-line")
      .attr("stroke-dasharray","10,5,2")
  ))



  
   // Draw our tick label on top of our <rect>
   const tickLabels = HRVTicks.map(d => {
    if (!d) return
    return peripherals.append("text")
      .attr("x", 6)
      .attr("y", -radiusScaleHRV(d) + 2)
      .attr("class", "tick-label-temperature")
      .text(`${d3.format(".0f")(d)}/ms`)
  })

//-----------EDA-----------------------------------------------------------------
    // Define cloud cover
    const EDAGroup = bounds.append("g").attr("z-index","3")
    const EDAOffset = 1
    const EDADots = EDAGroup.selectAll("circle")
        .data(dataobj)
        .enter().append("circle")
        .attr("class", "cloud-dot")
        .attr("cx", d => getXFromDataPoint(d, EDAOffset))
        .attr("cy", d => getYFromDataPoint(d, EDAOffset))
    // Notice how we're using the size of the dot to indicate cloud coverage
        .attr("r", d => EDARadiusScale(EDAccessor(d)))
        //.on("mouseover", Emouseover )
        //.on("mouseleave", Emouseleave );
    //-----------EDA-----------------------------------------------------------------
  
    //-----------TEMP-----------------------------------------------------------------
    // Define cloud cover
    const TEMPGroup = bounds.append("g").attr("z-index","3")
    const TEMPOffset = 0.93
    const TEMPDots = TEMPGroup.selectAll("circle")
        .data(dataobj)
        .enter().append("circle")
        .attr("class", "TEMP-dot")
        .attr("cx", d => getXFromDataPoint(d, TEMPOffset))
        .attr("cy", d => getYFromDataPoint(d, TEMPOffset))
    // Notice how we're using the size of the dot to indicate cloud coverage
        .attr("r", d => TEMPRadiusScale(TEMPAccessor(d)))
        //.on("mouseover", Tmouseover )
        //.on("mouseleave", Tmouseleave);
    //-----------TEMP-----------------------------------------------------------------


    //draw hrv--------------------------------------------
    const compute = d3.interpolate("#a5cc91","#7a6a56");
    const linear = d3.scaleLinear().domain([0,120]).range([0,1]);
        //console.log(compute(0));
        //console.log(compute(0.5));
        //console.log(compute(1));
        //渐变不管用

    const areaHRVGenerator = d3.areaRadial()
        .angle(d => angleScale1(dateAccessorH(d)))
        .innerRadius(d => radiusScaleHRV(Math.abs(HRVAccessor(d)-HRAccessor(d)/3)))
        .outerRadius(d => radiusScaleHRV(HRVAccessor(d)+HRAccessor(d)/3)); 


    const areaHRV = bounds.selectAll("path")
          .data(dataobj)
          .enter()
          .append("path")
          .attr("class", "area")
          .attr("d", areaHRVGenerator(dataobj))
          .style("fill",function(d,i){
              const N = linear(d.HR);
              const M = compute(N);
              //console.log(M);
              return M
            })

            
            /*const area = bounds.append("path")//不打断path
            .attr("class", "area")
            .attr("d", areaHRVGenerator(dataobj))
            .style("fill", "red")
            console.log(area)*/
    //draw hrv--------------------------------------------

    //红点====================================================================================
        var tooltip1 = d3.select("#my_dataviz")
            .append("div")
            .style("opacity",0)
            .attr("class","tooltip1")
            .style("background-color", "none")
        //-------------------------------------------------------------------------------------
        var mouseover = function(d) {
            d3.select(this).style("fill","pink").attr("r",10);
            tooltip1.style("opacity", 1);
            tooltip1
            .html("Hign Exercise Intensity<br><br>EDA: " + d.EDA + " <br> HR: " + d.MAX )
            .style("left", "80px")
            .style("top", "300px");
        } 

        var mouseleave = function(d) {
            d3.select(this).style("fill","purple").attr("r",5);
            tooltip1.style("opacity", 0);
        }

        var mouseoverlow = function(d) {
            d3.select(this).style("fill","pink").attr("r",10);
            d3.select(this).style("fill","orange").attr("r",10);
            tooltip1.style("opacity", 1);
            tooltip1
            .html("Stress<br><br>EDA: " + d.EDA + " <br> HR: " + d.MAX )
            .style("left", "80px")//(d3.mouse(this)[0]-20)+"px")
            .style("top", "300px")//(d3.mouse(this)[1])+"px");
        
        } 

        var mouseleavelow = function(d) {
            d3.select(this).style("fill","blue").attr("r",3);
            tooltip1.style("opacity", 0);
        }
        //-------------------------------------------------------------------------------------
        const dataPointHR = dataobj.filter(d => d.HR >= 110 && d.EDA >=0.3 )
        //console.log(dataPointHR);
        const redGroup = bounds.append("g")//.attr("z-index","3");
        const redOffset = 0.99;
        const redDots = redGroup.selectAll("circle")
            .data(dataPointHR)
            .enter().append("circle")
            .attr("class", "reddots")
            .attr("cx", d => getXFromDataPoint(d, redOffset))
            .attr("cy", d => getYFromDataPoint(d, redOffset))
            .attr("r",5)
            .on("mouseover", mouseover )
            .on("mouseleave", mouseleave );
            //-------------------------------------------------

        const dataPointlow = dataobj.filter(d => d.HR >= 110 && d.EDA <0.3 )
        //console.log(dataPointlow);
        const redGrouplow = bounds.append("g")//.attr("z-index","3");
        const redOffsetlow = 0.99;
        const redDotslow = redGrouplow.selectAll("circle")
            .data(dataPointlow)
            .enter().append("circle")
            .attr("class", "reddotslow")
            .attr("cx", d => getXFromDataPoint(d, redOffsetlow))
            .attr("cy", d => getYFromDataPoint(d, redOffsetlow))
            .attr("r",3)
            .on("mouseover", mouseoverlow )
            .on("mouseleave", mouseleavelow );;
            //-------------------------------------------------
        
  //draw HR ------------------------------------------------------------------------------



  //说明-----------------------------------------------------------------------------------
  const annotationGroup = bounds.append("g")

  const drawAnnotation = (angle, offset, text) => {
    const [x1, y1] = getCoordinatesForAngle(angle, offset)
    // Draw annotation line so that it is outside of our concentric circles
    const [x2, y2] = getCoordinatesForAngle(angle, -1.2)

    annotationGroup.append("line")
      .attr("class", "annotation-line")
      .attr("x1", x1)
      .attr("x2", x2)
      .attr("y1", y1)
      .attr("y2", y2)

    annotationGroup.append("text")
      .attr("class", "annotation-text")
      .attr("x", x2 - 30)
      .attr("y", y2+10)
      .text(text)
  }

  drawAnnotation(Math.PI * 0.2, -EDAOffset, "EDA")
  drawAnnotation(Math.PI * 0.3, -TEMPOffset, "TEMP")
  drawAnnotation(Math.PI * 0.15, -0.9, "HR+HRV")
  //说明-----------------------------------------------------------------------------------


  
  
  //交互-----------------------------------------------------------------------------------------------------

  //底圆
  const whiteCircle = bounds.append("circle")
    .attr("class", "white-circle")
    .attr("r", dimensions.width/3.5 )


  const listenerCircle = bounds.append("circle")
    .attr("class", "listener-circle")
    .attr("r", dimensions.width /2.5)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip")
  const tooltipLine = bounds.append("path")
    .attr("class", "tooltip-line")



  function onMouseMove(e) {
    const [x, y] = d3.mouse(this)

    const getAngleFromCoordinates = (x, y) => Math.atan2(y, x)//弧度值
    let angle = getAngleFromCoordinates(x, y) + Math.PI / 2
    if (angle < 0) angle = (Math.PI * 2) + angle

    const tooltipArcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(dimensions.boundedRadius * 0.98)
      .startAngle(angle+0.015 )
      .endAngle(angle + 0.03)

    tooltipLine.attr("d", tooltipArcGenerator()).style("opacity", 0.2).style("fill","orange")

    const outerCoordinates = getCoordinatesForAngle(angle, 1.2)
    
    tooltip
    .style("opacity", 1)
    .style("transform", `translate(${13}px,${88}px)`)


    //日期
    const date = angleScale1.invert(angle)
    const dateString = d3.timeFormat("%H:%M")(date)
    const D = HRVhandle[0].TIMESTAMP.slice(0,-5);
    const M = D+dateString;
    const dataPoint = dataobj.filter(d => d.TIMESTAMP == M)[0]
    //console.log(dataPoint)

    tooltip.select("#tooltip-date")
    .text(d3.timeFormat(D+" %H:%M")(date))

    if(dataPoint != undefined){
    //文字
    const Ttrue = (TEMPAccessor(dataPoint)/6+30).toFixed(2); //Math.abs((sumTEMP/240-30)*6)

    tooltip.select("#tooltip-HRV-min")
        .text(HRVAccessor(dataPoint)+"/ms")
    tooltip.select("#tooltip-cloud")
        .text(EDAccessor(dataPoint))
    tooltip.select("#tooltip-precipitation")
        .text(Ttrue+"°C")
    //文字
    }


  }

  function onMouseLeave() {
    tooltipLine.style("opacity", 0)
    const D = HRVhandle[0].TIMESTAMP.slice(0,-5);
    tooltip.select("#tooltip-date")
      .text(d3.timeFormat(D))
    tooltip.select("#tooltip-HRV-min")
    .text("0/ms")
    tooltip.select("#tooltip-cloud")
      .text("0")
    tooltip.select("#tooltip-precipitation")
      .text("0°C")
  }
  //删掉if

 //交互-----------------------------------------------------------------------------------------------------
 
}
drawChart()