async function drawChart() {

  // 1. Access data

  const pathHR = "./1128-1/HR1128.csv"
  const dataset1 = await d3.csv(pathHR)
  //console.table(dataset1[0].TIMESTAMP)  
    //自动添加时间
    const T0 = parseInt(dataset1[0].TIMESTAMP);
    let T00 = 0;
    for (i=0;i<dataset1.length;i++){
        dataset1[i].TIMESTAMP =  T00 + T0;
        T00+=1;
    }
    //console.log(dataset1[1].TIMESTAMP);
    //console.log(dataset1[2].TIMESTAMP);
    //自动添加时间
    
  //sec-------------------------------------------------------------------------------------------
      const pathHR1124 = "./1124-1/HR.csv"
      const dataset1124 = await d3.csv(pathHR1124)
    
      //自动添加时间
        const T02 = parseInt(dataset1124[0].TIMESTAMP);
        let T002 = 0;
        for (i=0;i<dataset1124.length;i++){
            dataset1124[i].TIMESTAMP =  T002 + T02;
            T002+=1;
        }
        //console.log(dataset1124[1].TIMESTAMP);
        //console.log(dataset1124[2].TIMESTAMP);
        //自动添加时间

      //EDA
      const pathEDA1124 = "./1124-1/EDA.csv"
      //TEMP
      const pathTEMP1124 = "./1124-1/TEMP.csv"
      //TEMP
  //sec-------------------------------------------------------------------------------------------

  //third-------------------------------------------------------------------------------------------
      const pathHR1023 = "./1023-1/HR.csv"
      const dataset1023 = await d3.csv(pathHR1023)

     //自动添加时间
        const T03 = parseInt(dataset1023[0].TIMESTAMP);
        let T003 = 0;
        for (i=0;i<dataset1023.length;i++){
            dataset1023[i].TIMESTAMP =  T003 + T03;
            T003+=1;
        }
        //console.log(dataset1023[1].TIMESTAMP);
        //console.log(dataset1023[2].TIMESTAMP);
    //自动添加时间

      //EDA
      const pathEDA1023 = "./1023-1/EDA.csv"
      //TEMP
      const pathTEMP1023 = "./1023-1/TEMP.csv"
      //TEMP
  //third-------------------------------------------------------------------------------------------


  //forth-------------------------------------------------------------------------------------------
    const pathHR1221 = "./1221-1/HR.csv"
    const dataset1221 = await d3.csv(pathHR1221)

    //自动添加时间
        const T04 = parseInt(dataset1221[0].TIMESTAMP);
        let T004 = 0;
        for (i=0;i<dataset1221.length;i++){
            dataset1221[i].TIMESTAMP =  T004 + T04;
            T004+=1;
        }
        //console.log(dataset1221[1].TIMESTAMP);
        //console.log(dataset1221[2].TIMESTAMP);
     //自动添加时间

    //EDA
    const pathEDA1221 = "./1221-1/EDA.csv"
    //TEMP
    const pathTEMP1221 = "./1221-1/TEMP.csv"
    //TEMP
  //forth-------------------------------------------------------------------------------------------


  //fifth-------------------------------------------------------------------------------------------
    const pathHR1115 = "./1115-1/HR.csv"
    const dataset1115 = await d3.csv(pathHR1115)

    //自动添加时间
    const T05 = parseInt(dataset1115[0].TIMESTAMP);
    let T005 = 0;
    for (i=0;i<dataset1115.length;i++){
        dataset1115[i].TIMESTAMP =  T005 + T05;
        T005+=1;
    }
    //console.log(dataset1115[1].TIMESTAMP);
    //console.log(dataset1115[2].TIMESTAMP);
    //自动添加时间

    //EDA
    const pathEDA1115 = "./1115-1/EDA.csv"
    //TEMP
    const pathTEMP1115 = "./1115-1/TEMP.csv"
    //TEMP
  //fifth-------------------------------------------------------------------------------------------


  //sixth-------------------------------------------------------------------------------------------
    const pathHR1110 = "./1110-1/HR.csv"
    const dataset1110 = await d3.csv(pathHR1110)

    //自动添加时间
    const T06 = parseInt(dataset1110[0].TIMESTAMP);
    let T006 = 0;
    for (i=0;i<dataset1110.length;i++){
        dataset1110[i].TIMESTAMP =  T006 + T06;
        T006+=1;
    }
    //console.log(dataset1110[1].TIMESTAMP);
    //console.log(dataset1110[2].TIMESTAMP);
    //自动添加时间

    //EDA
    const pathEDA1110 = "./1110-1/EDA.csv"
    //TEMP
    const pathTEMP1110 = "./1110-1/TEMP.csv"
    //TEMP
  //sixth-------------------------------------------------------------------------------------------

  //seventh-------------------------------------------------------------------------------------------
    const pathHR1112 = "./1112-1/HR.csv"
    const dataset1112 = await d3.csv(pathHR1112)

    //自动添加时间
    const T07 = parseInt(dataset1112[0].TIMESTAMP);
    let T007 = 0;
    for (i=0;i<dataset1112.length;i++){
        dataset1112[i].TIMESTAMP =  T007 + T07;
        T007+=1;
    }
    //console.log(dataset1112[1].TIMESTAMP);
    //console.log(dataset1112[2].TIMESTAMP);
    //自动添加时间

    //EDA
    const pathEDA1112 = "./1112-1/EDA.csv"
    //TEMP
    const pathTEMP1112 = "./1112-1/TEMP.csv"
    //TEMP
  //seventh-------------------------------------------------------------------------------------------

  //EDA------------------------------------------------------------------------
  const pathEDA = "./1128-1/EDA.csv"
  const dataset2 = await d3.csv(pathEDA)
  const EDAvalue = Object.values(dataset2);  
  //每240个值取一个平均
  const EDAvalueAVE = [];
  var sumEDA  = 0;
  for(i=0;i<EDAvalue.length;i++){
    sumEDA+=parseInt(EDAvalue[i].EDA);
    
      if ((i+1)%240 == 0){
        let K = sumEDA/240;
        //console.log(K.toFixed(2))
        EDAvalueAVE.push(K.toFixed(2));
        //console.log(sumEDA);
        sumEDA=0;
      }
  }
  //console.log(EDAvalueAVE);
  const EDAccessor = d => d.EDA;
//EDA--------------------------------------------------------------------------

  //TEMP------------------------------------------------------------------------
  const pathTEMP = "./1128-1/TEMP.csv"
  const dataset3 = await d3.csv(pathTEMP)
  const TEMPvalue = Object.values(dataset3);  
  //每240个值取一个平均
  const TEMPvalueAVE = [];
  var sumTEMP  = 0;
  for(i=0;i<TEMPvalue.length;i++){
    sumTEMP+=parseInt(TEMPvalue[i].TEMP);
    
      if ((i+1)%240 == 0){
        TEMPvalueAVE.push(Math.abs((sumTEMP/240-30)*6));
        //console.log(sumEDA);
        sumTEMP=0;
      }
  }
  //console.log(TEMPvalueAVE);
  const TEMPAccessor = d => d.TEMP;
//TEMP--------------------------------------------------------------------------
  
  const datalength = dataset1.length;
  //console.log(datalength);

  const HRMinAccessor = d=>d.MIN;
  const HRMaxAccessor = d=>d.MAX;

  const dateParse = d3.timeParse("%Y/%m/%d %H:%M");
  const dateAccessor1 = d => dateParse(d.TIMESTAMP);

  //const dateParse = d3.timeParse("%H:%M");
  //const dateAccessor1 = d=> dateParse(d.TIMESTAMP.slice(11));
//1900年的时间-------------------------------------------------------------------
  const oriTIME = [];
  const dateParsetest = d3.timeParse("%Y/%m/%d %H:%M");
  const A = dateParsetest("1900/01/01 0:0");
  const B = dateParsetest("1900/01/01 24:0");
  oriTIME.push(A);
  oriTIME.push(B);
  //console.log(oriTIME);
 //1900年的时间-------------------------------------------------------------------
  // 2. Create chart dimensions

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

  // Convert from an angle to an x,y coordinate - with an ability to supply an option offset将角度转化为xy坐标
  // Trigonometry FTW
  const getCoordinatesForAngle = (angle, offset = 0.87) => [//偏移量是1    ？？？？
    Math.cos(angle - Math.PI / 2) * dimensions.boundedRadius * offset,//PI=pai.Math.PI = 3.14 = 180°
    Math.sin(angle - Math.PI / 2) * dimensions.boundedRadius * offset,//cos²x+sin²x=1
  ]

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")//是整体的画布
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  // Note that we are starting our bounds from the center of our circle. When we place our data and peripherals on
  // the chart, we only need to know where they should be positioned in respect to the center of our circle.
  const bounds = wrapper.append("g")//画布里创建居中对齐的组
    .style("transform", `translate(${
      dimensions.margin.left + dimensions.boundedRadius
      }px, ${
      dimensions.margin.top + dimensions.boundedRadius
      }px)`)

  // Draw the gradient for our radial temperature chart
  const defs = wrapper.append("defs")//defs是被引用的元素的容器，允许定义以后需要重复使用的元素，利用<use>实现调用
  const gradientId = "temperature-gradient"
  const gradient = defs.append("radialGradient")//gradient倾斜度、坡度。radialGradient径向渐变
    .attr("id", gradientId)
  const numberOfStops = 10
  const gradientColorScale = d3.interpolateRdYlGn//Rainbow//YlOrRd//interpolate插入；YlOrRd色条
  d3.range(numberOfStops).forEach(i => {
    gradient.append("stop")
      .attr("offset", `${i * 100 / (numberOfStops - 1)}%`)
      .attr("stop-color", gradientColorScale(i
        / (numberOfStops - 1)
      ))
  })
//以上是颜色渐变

//刻度
  //替换掉了dataset里面的时间戳
 for(var num = 0; num < datalength; num++){
        let time1 = parseInt(dataset1[num].TIMESTAMP);
        //console.log(time1);
        dataset1[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
        dataset1[num].HR = parseInt(dataset1[num].HR);

    }
   //每60s合并，求HR最大值和最小值 dataobj
    let datahandle = {};
    dataset1.forEach((item, index) => {
        let { TIMESTAMP } = item;
        if (!datahandle[TIMESTAMP]) {
            datahandle[TIMESTAMP] = {
                TIMESTAMP,
                HR: [],
                EDA:[],
                TEMP:[],
            }
        }
        datahandle[TIMESTAMP].HR.push(item.HR);
    });
    const dataobj = Object.values(datahandle); 
    for (i=0;i<dataobj.length;i++){
        dataobj[i].MAX = d3.max(dataobj[i].HR);
        dataobj[i].MIN = d3.min(dataobj[i].HR);
        if(!EDAvalueAVE[i]){
            dataobj[i].EDA = 0;
        }else{
            dataobj[i].EDA = EDAvalueAVE[i];}

        if(!TEMPvalueAVE[i]){
            dataobj[i].TEMP = 0;
        }else{
            dataobj[i].TEMP = TEMPvalueAVE[i];}
        
       // console.log(1);
    }
    // 最终输出
    //console.log(dataobj);



    //4
    //时间对应到角度
   
    const angleScale1 = d3.scaleTime()//时间对应到角度
        .domain(d3.extent(oriTIME))
        .range([0, Math.PI * 2]);// this is in radians

    
    const radiusScale1 = d3.scaleLinear()
    .domain(d3.extent([
      ...dataobj.map(HRMaxAccessor),//展开语法
      ...dataobj.map(HRMinAccessor),
    ]))
    .range([width*0.3, dimensions.boundedRadius])
    // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
    .nice()

    //--------------------------EDA-------------------------------------------------------------------------------------
     // Let's create some helper functions to calculate x and y values from a specific data point
    const getXFromDataPoint = (d, offset = 1.4) => getCoordinatesForAngle(//offset 显示宽度？ coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
    const getYFromDataPoint = (d, offset = 1.4) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]

    // make sure to use a sqrt scale for circle areas
    const EDARadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj, EDAccessor))
        .range([1, 5])
    const HRColorScale = d3.scaleLinear()
        .domain(d3.extent([
        ...dataobj.map(HRMaxAccessor),
        ...dataobj.map(HRMinAccessor),
    ]))

    //--------------------------EDA-------------------------------------------------------------------------------------------

    //TEMP----------------------------------------------------------------------------------------------------------------
        // make sure to use a sqrt scale for circle areas
        const TEMPRadiusScale = d3.scaleSqrt()//平方根
        .domain(d3.extent(dataobj, TEMPAccessor))
        .range([1, 10])
    //TEMP----------------------------------------------------------------------------------------------------------------


    // 6. Draw peripherals//外围
    const peripherals = bounds.append("g")//上一个组里又加了这个组

    // Create a spoke for each minu in our chart
    const hours = d3.timeHours(...angleScale1.domain()) 
    //console.log(hours) // Get an array of minu from our domain

    // // Take a peek at our minu data
    //console.log(minu)

    //hour底色

    peripherals.append("circle")
    .attr("r", width/2.65)
    .attr("class", "hour-bg")


    peripherals.append("circle")
      .attr("r", width/2.65)
      .attr("class", "hour-cir")
    //hour底色

    hours.forEach(hour => {
        const angle = angleScale1(hour)
        const [x, y] = getCoordinatesForAngle(angle)

    // Generates a spoke from the center of the circle
    peripherals.append("line")
      // We do not need to define x1 and y1 attributes here because they have default values of 0
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
      // text-anchor for SVG elements is analogous to text-align for traditional HTML elements.
      // Without it, we can see that our labels on the left are not properly aligned
      .style("text-anchor",
        Math.abs(labelX) < 5 ? "middle" :
          labelX > 0 ? "start" :
            "end")
  })


  
  // HR
  const HRTicks = radiusScale1.ticks(5)
  // Generate concentric circles for our radar chart
  const gridCircles = HRTicks.map(d => (
    peripherals.append("circle")
      .attr("r", radiusScale1(d))
      .attr("class", "grid-line")
      .attr("stroke-dasharray","10,5,2")
  ))

  // Label each concentric circle

  // Draw a <rect> element for our label
  const tickLabelBackgrounds = HRTicks.map(d => {
    if (!d) return  // Not likely to occur unless our data set is skipping dates
    return peripherals.append("rect")
      .attr("y", -radiusScale1(d) - 10)
      .attr("width", 40)
      .attr("height", 20)
      .attr("fill", "white")//#f8f9fa
  })

  
   // Draw our tick label on top of our <rect>
   const tickLabels = HRTicks.map(d => {
    if (!d) return
    return peripherals.append("text")
      .attr("x", 6)
      .attr("y", -radiusScale1(d) + 2)
      .attr("class", "tick-label-temperature")
      .text(`${d3.format(".0f")(d)}/s`)
  })

  /*//冰点
  const HRFreezing =  radiusScale1.domain()[0] > 0
  if (HRFreezing) {
    const freezingCircle = bounds.append("circle")
      .attr("r", radiusScale1(90))
      .attr("class", "freezing-circle")
  }*/
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

  //draw HR ------------------------------------------------------------------------------
  const areaGenerator = d3.areaRadial()
    .angle(d => angleScale1(dateAccessor1(d)))
    .innerRadius(d => radiusScale1(HRMinAccessor(d)))
    .outerRadius(d => radiusScale1(HRMaxAccessor(d)));


  const area = bounds.append("path")//大的组里加一个路径
    .attr("class", "area")
    .attr("d", areaGenerator(dataobj))
    .style("fill", `url(#${gradientId})`)
          //做一个交互
          //.on("mouseover", HRmouseover)
          //.on("mouseleave", HRmouseleave);
          //做一个交互


    //画红点====================================================================================
        var tooltip1 = d3.select("#my_dataviz")
            .append("div")
            .style("opacity",0)
            .attr("class","tooltip1")
            .style("background-color", "none")
            //.style("border","solid")
            //.style("border-with","0.5px")
            //.style("border-radius","5px")
            //.style("border-color","pink")
            //.style("padding","10px");
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
        const dataPointHR = dataobj.filter(d => d.MAX >= 110 && d.EDA >=0.3 )
        console.log(dataPointHR);
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

        const dataPointlow = dataobj.filter(d => d.MAX >= 110 && d.EDA <0.3 )
        console.log(dataPointlow);
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


  //sec---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21124 = await d3.csv(pathEDA1124)
    const EDAvalue1124 = Object.values(dataset21124);  
    //每240个值取一个平均
    const EDAvalueAVE1124 = [];
    var sumEDA1124  = 0;
    for(i=0;i<EDAvalue1124.length;i++){
      sumEDA1124+=parseInt(EDAvalue1124[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1124/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1124.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1124=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1124 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31124 = await d3.csv(pathTEMP1124)
    const TEMPvalue1124 = Object.values(dataset31124);  
    //每240个值取一个平均
    const TEMPvalueAVE1124 = [];
    var sumTEMP1124  = 0;
    for(i=0;i<TEMPvalue1124.length;i++){
    sumTEMP1124+=parseInt(TEMPvalue1124[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1124.push(Math.abs((sumTEMP1124/240-30)*6));
          //console.log(sumTEMP1124);
          sumTEMP1124=0;
        }
    }
    //console.log(TEMPvalueAVE1124);
    const TEMPAccessor1124 = d => d.TEMP;
    //TEMP

    const datalength1124 = dataset1124.length;
    console.log(datalength1124);

    const HRMinAccessor1124 = d=>d.MIN;
    const HRMaxAccessor1124 = d=>d.MAX;

    //替换掉了dataset1124里面的时间戳
    for(var num = 0; num < datalength1124; num++){
      let time1 = parseInt(dataset1124[num].TIMESTAMP);
      //console.log(time1);
      dataset1124[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1124[num].HR = parseInt(dataset1124[num].HR);
    }
    

    let datahandle1124 = {};
    dataset1124.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1124[TIMESTAMP]) {
          datahandle1124[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1124[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1124 = Object.values(datahandle1124); 
      for (i=0;i<dataobj1124.length;i++){
          dataobj1124[i].MAX = d3.max(dataobj1124[i].HR);
          dataobj1124[i].MIN = d3.min(dataobj1124[i].HR);
          if(!EDAvalueAVE1124[i]){
              dataobj1124[i].EDA = 0;
          }else{
             dataobj1124[i].EDA = EDAvalueAVE1124[i];}

          if(!TEMPvalueAVE1124[i]){
              dataobj1124[i].TEMP = 0;
          }else{
             dataobj1124[i].TEMP = TEMPvalueAVE1124[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1124);


      const radiusScale1124 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1124.map(HRMaxAccessor1124),//展开语法
          ...dataobj1124.map(HRMinAccessor1124),
        ]))
        .range([width*0.3*0.87, dimensions.boundedRadius*0.87])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1124 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1124 = HRTicks1124.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1124(d))
        .attr("class", "grid-line2")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1124 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1124 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1124 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1124, EDAccessor1124))
          .range([0.6, 1.5])

         // Define cloud cover
        const EDAGroup1124 = bounds.append("g").attr("z-index","3")
        const EDAOffset1124 = 0.83
        const EDADots1124 = EDAGroup1124.selectAll("circle")
          .data(dataobj1124)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1124(d, EDAOffset1124))
          .attr("cy", d => getYFromDataPoint1124(d, EDAOffset1124))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1124(EDAccessor1124(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1124 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1124, TEMPAccessor1124))
          .range([1, 7])

        // Define cloud cover
        const TEMPGroup1124 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1124 = 0.78
        const TEMPDots1124 = TEMPGroup1124.selectAll("circle")
          .data(dataobj1124)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1124(d, TEMPOffset1124))
          .attr("cy", d => getYFromDataPoint1124(d, TEMPOffset1124))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1124(TEMPAccessor1124(d)))
      //TEMP

      //draw HR
        const areaGenerator1124 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1124(HRMinAccessor1124(d)))
          .outerRadius(d => radiusScale1124(HRMaxAccessor1124(d)));


        const area1124 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1124(dataobj1124))
          .style("fill", `url(#${gradientId})`)
      //draw HR

  //sec---------------------------------------------------------------------------------------------------------------

  //third---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21023 = await d3.csv(pathEDA1023)
    const EDAvalue1023 = Object.values(dataset21023);  
    //每240个值取一个平均
    const EDAvalueAVE1023 = [];
    var sumEDA1023  = 0;
    for(i=0;i<EDAvalue1023.length;i++){
      sumEDA1023+=parseInt(EDAvalue1023[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1023/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1023.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1023=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1023 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31023 = await d3.csv(pathTEMP1023)
    const TEMPvalue1023 = Object.values(dataset31023);  
    //每240个值取一个平均
    const TEMPvalueAVE1023 = [];
    var sumTEMP1023  = 0;
    for(i=0;i<TEMPvalue1023.length;i++){
    sumTEMP1023+=parseInt(TEMPvalue1023[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1023.push(Math.abs((sumTEMP1023/240-30)*6));
          //console.log(sumTEMP1023);
          sumTEMP1023=0;
        }
    }
    //console.log(TEMPvalueAVE1023);
    const TEMPAccessor1023 = d => d.TEMP;
    //TEMP

    const datalength1023 = dataset1023.length;
    //console.log(datalength1023);

    const HRMinAccessor1023 = d=>d.MIN;
    const HRMaxAccessor1023 = d=>d.MAX;

    //替换掉了dataset1023里面的时间戳
    for(var num = 0; num < datalength1023; num++){
      let time1 = parseInt(dataset1023[num].TIMESTAMP);
      //console.log(time1);
      dataset1023[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1023[num].HR = parseInt(dataset1023[num].HR);
    }
    

    let datahandle1023 = {};
    dataset1023.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1023[TIMESTAMP]) {
          datahandle1023[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1023[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1023 = Object.values(datahandle1023); 
      for (i=0;i<dataobj1023.length;i++){
          dataobj1023[i].MAX = d3.max(dataobj1023[i].HR);
          dataobj1023[i].MIN = d3.min(dataobj1023[i].HR);
          if(!EDAvalueAVE1023[i]){
              dataobj1023[i].EDA = 0;
          }else{
             dataobj1023[i].EDA = EDAvalueAVE1023[i];}

          if(!TEMPvalueAVE1023[i]){
              dataobj1023[i].TEMP = 0;
          }else{
             dataobj1023[i].TEMP = TEMPvalueAVE1023[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1023);


      const radiusScale1023 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1023.map(HRMaxAccessor1023),//展开语法
          ...dataobj1023.map(HRMinAccessor1023),
        ]))
        .range([width*0.3*0.5+59, dimensions.boundedRadius*0.66])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1023 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1023 = HRTicks1023.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1023(d))
        .attr("class", "grid-line3")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1023 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1023 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1023 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1023, EDAccessor1023))
          .range([0.6, 1.2])

         // Define cloud cover
        const EDAGroup1023 = bounds.append("g").attr("z-index","3")
        const EDAOffset1023 = 0.73
        const EDADots1023 = EDAGroup1023.selectAll("circle")
          .data(dataobj1023)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1023(d, EDAOffset1023))
          .attr("cy", d => getYFromDataPoint1023(d, EDAOffset1023))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1023(EDAccessor1023(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1023 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1023, TEMPAccessor1023))
          .range([1, 5])

        // Define cloud cover
        const TEMPGroup1023 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1023 = 0.68
        const TEMPDots1023 = TEMPGroup1023.selectAll("circle")
          .data(dataobj1023)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1023(d, TEMPOffset1023))
          .attr("cy", d => getYFromDataPoint1023(d, TEMPOffset1023))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1023(TEMPAccessor1023(d)))
      //TEMP

      //draw HR
        const areaGenerator1023 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1023(HRMinAccessor1023(d)))
          .outerRadius(d => radiusScale1023(HRMaxAccessor1023(d)));


        const area1023 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1023(dataobj1023))
          .style("fill", `url(#${gradientId})`)
      //draw HR

  //third---------------------------------------------------------------------------------------------------------------

  
  //forth---------------------------------------------------------------------------------------------------------------

    //forth---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21221 = await d3.csv(pathEDA1221)
    const EDAvalue1221 = Object.values(dataset21221);  
    //每240个值取一个平均
    const EDAvalueAVE1221 = [];
    var sumEDA1221  = 0;
    for(i=0;i<EDAvalue1221.length;i++){
      sumEDA1221+=parseInt(EDAvalue1221[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1221/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1221.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1221=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1221 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31221 = await d3.csv(pathTEMP1221)
    const TEMPvalue1221 = Object.values(dataset31221);  
    //每240个值取一个平均
    const TEMPvalueAVE1221 = [];
    var sumTEMP1221  = 0;
    for(i=0;i<TEMPvalue1221.length;i++){
    sumTEMP1221+=parseInt(TEMPvalue1221[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1221.push(Math.abs((sumTEMP1221/240-30)*6));
          //console.log(sumTEMP1221);
          sumTEMP1221=0;
        }
    }
    //console.log(TEMPvalueAVE1221);
    const TEMPAccessor1221 = d => d.TEMP;
    //TEMP

    const datalength1221 = dataset1221.length;
    //console.log(datalength1221);

    const HRMinAccessor1221 = d=>d.MIN;
    const HRMaxAccessor1221 = d=>d.MAX;

    //替换掉了dataset1221里面的时间戳
    for(var num = 0; num < datalength1221; num++){
      let time1 = parseInt(dataset1221[num].TIMESTAMP);
      //console.log(time1);
      dataset1221[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1221[num].HR = parseInt(dataset1221[num].HR);
    }
    

    let datahandle1221 = {};
    dataset1221.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1221[TIMESTAMP]) {
          datahandle1221[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1221[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1221 = Object.values(datahandle1221); 
      for (i=0;i<dataobj1221.length;i++){
          dataobj1221[i].MAX = d3.max(dataobj1221[i].HR);
          dataobj1221[i].MIN = d3.min(dataobj1221[i].HR);
          if(!EDAvalueAVE1221[i]){
              dataobj1221[i].EDA = 0;
          }else{
             dataobj1221[i].EDA = EDAvalueAVE1221[i];}

          if(!TEMPvalueAVE1221[i]){
              dataobj1221[i].TEMP = 0;
          }else{
             dataobj1221[i].TEMP = TEMPvalueAVE1221[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1221);


      const radiusScale1221 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1221.map(HRMaxAccessor1221),//展开语法
          ...dataobj1221.map(HRMinAccessor1221),
        ]))
        .range([width*0.3*0.6, dimensions.boundedRadius*0.63])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1221 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1221 = HRTicks1221.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1221(d))
        .attr("class", "grid-line4")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1221 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1221 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1221 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1221, EDAccessor1221))
          .range([0.6, 1.2])

         // Define cloud cover
        const EDAGroup1221 = bounds.append("g").attr("z-index","3")
        const EDAOffset1221 = 0.61
        const EDADots1221 = EDAGroup1221.selectAll("circle")
          .data(dataobj1221)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1221(d, EDAOffset1221))
          .attr("cy", d => getYFromDataPoint1221(d, EDAOffset1221))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1221(EDAccessor1221(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1221 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1221, TEMPAccessor1221))
          .range([1, 4])

        // Define cloud cover
        const TEMPGroup1221 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1221 = 0.58
        const TEMPDots1221 = TEMPGroup1221.selectAll("circle")
          .data(dataobj1221)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1221(d, TEMPOffset1221))
          .attr("cy", d => getYFromDataPoint1221(d, TEMPOffset1221))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1221(TEMPAccessor1221(d)))
      //TEMP

      //draw HR
        const areaGenerator1221 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1221(HRMinAccessor1221(d)))
          .outerRadius(d => radiusScale1221(HRMaxAccessor1221(d)));


        const area1221 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1221(dataobj1221))
          .style("fill", `url(#${gradientId})`)
      //draw HR

  //fifth---------------------------------------------------------------------------------------------------------------
//fifth---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21115 = await d3.csv(pathEDA1115)
    const EDAvalue1115 = Object.values(dataset21115);  
    //每240个值取一个平均
    const EDAvalueAVE1115 = [];
    var sumEDA1115  = 0;
    for(i=0;i<EDAvalue1115.length;i++){
      sumEDA1115+=parseInt(EDAvalue1115[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1115/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1115.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1115=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1115 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31115 = await d3.csv(pathTEMP1115)
    const TEMPvalue1115 = Object.values(dataset31115);  
    //每240个值取一个平均
    const TEMPvalueAVE1115 = [];
    var sumTEMP1115  = 0;
    for(i=0;i<TEMPvalue1115.length;i++){
    sumTEMP1115+=parseInt(TEMPvalue1115[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1115.push(Math.abs((sumTEMP1115/240-30)*6));
          //console.log(sumTEMP1115);
          sumTEMP1115=0;
        }
    }
    //console.log(TEMPvalueAVE1115);
    const TEMPAccessor1115 = d => d.TEMP;
    //TEMP

    const datalength1115 = dataset1115.length;
    console.log(datalength1115);

    const HRMinAccessor1115 = d=>d.MIN;
    const HRMaxAccessor1115 = d=>d.MAX;

    //替换掉了dataset1115里面的时间戳
    for(var num = 0; num < datalength1115; num++){
      let time1 = parseInt(dataset1115[num].TIMESTAMP);
      //console.log(time1);
      dataset1115[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1115[num].HR = parseInt(dataset1115[num].HR);
    }
    

    let datahandle1115 = {};
    dataset1115.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1115[TIMESTAMP]) {
          datahandle1115[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1115[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1115 = Object.values(datahandle1115); 
      for (i=0;i<dataobj1115.length;i++){
          dataobj1115[i].MAX = d3.max(dataobj1115[i].HR);
          dataobj1115[i].MIN = d3.min(dataobj1115[i].HR);
          if(!EDAvalueAVE1115[i]){
              dataobj1115[i].EDA = 0;
          }else{
             dataobj1115[i].EDA = EDAvalueAVE1115[i];}

          if(!TEMPvalueAVE1115[i]){
              dataobj1115[i].TEMP = 0;
          }else{
             dataobj1115[i].TEMP = TEMPvalueAVE1115[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1115);


      const radiusScale1115 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1115.map(HRMaxAccessor1115),//展开语法
          ...dataobj1115.map(HRMinAccessor1115),
        ]))
        .range([width*0.3*0.48, dimensions.boundedRadius*0.53])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1115 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1115 = HRTicks1115.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1115(d))
        .attr("class", "grid-line5")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1115 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1115 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1115 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1115, EDAccessor1115))
          .range([0.6, 1.3])

         // Define cloud cover
        const EDAGroup1115 = bounds.append("g").attr("z-index","3")
        const EDAOffset1115 = 0.51
        const EDADots1115 = EDAGroup1115.selectAll("circle")
          .data(dataobj1115)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1115(d, EDAOffset1115))
          .attr("cy", d => getYFromDataPoint1115(d, EDAOffset1115))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1115(EDAccessor1115(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1115 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1115, TEMPAccessor1115))
          .range([1, 3])

        // Define cloud cover
        const TEMPGroup1115 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1115 = 0.47
        const TEMPDots1115 = TEMPGroup1115.selectAll("circle")
          .data(dataobj1115)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1115(d, TEMPOffset1115))
          .attr("cy", d => getYFromDataPoint1115(d, TEMPOffset1115))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1115(TEMPAccessor1115(d)))
      //TEMP

      //draw HR
        const areaGenerator1115 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1115(HRMinAccessor1115(d)))
          .outerRadius(d => radiusScale1115(HRMaxAccessor1115(d)));


        const area1115 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1115(dataobj1115))
          .style("fill", `url(#${gradientId})`)
      //draw HR
//fifth--------------------------------------------------------------------------------------------------


//sixth---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21110 = await d3.csv(pathEDA1110)
    const EDAvalue1110 = Object.values(dataset21110);  
    //每240个值取一个平均
    const EDAvalueAVE1110 = [];
    var sumEDA1110  = 0;
    for(i=0;i<EDAvalue1110.length;i++){
      sumEDA1110+=parseInt(EDAvalue1110[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1110/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1110.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1110=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1110 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31110 = await d3.csv(pathTEMP1110)
    const TEMPvalue1110 = Object.values(dataset31110);  
    //每240个值取一个平均
    const TEMPvalueAVE1110 = [];
    var sumTEMP1110  = 0;
    for(i=0;i<TEMPvalue1110.length;i++){
    sumTEMP1115+=parseInt(TEMPvalue1110[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1110.push(Math.abs((sumTEMP1110/240-30)*6));
          //console.log(sumTEMP1110);
          sumTEMP1110=0;
        }
    }
    //console.log(TEMPvalueAVE1110);
    const TEMPAccessor1110 = d => d.TEMP;
    //TEMP

    const datalength1110 = dataset1110.length;
    console.log(datalength1110);

    const HRMinAccessor1110 = d=>d.MIN;
    const HRMaxAccessor1110 = d=>d.MAX;

    //替换掉了dataset1110里面的时间戳
    for(var num = 0; num < datalength1110; num++){
      let time1 = parseInt(dataset1110[num].TIMESTAMP);
      //console.log(time1);
      dataset1110[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1110[num].HR = parseInt(dataset1110[num].HR);
    }
    

    let datahandle1110 = {};
    dataset1110.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1110[TIMESTAMP]) {
          datahandle1110[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1110[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1110 = Object.values(datahandle1110); 
      for (i=0;i<dataobj1110.length;i++){
          dataobj1110[i].MAX = d3.max(dataobj1110[i].HR);
          dataobj1110[i].MIN = d3.min(dataobj1110[i].HR);
          if(!EDAvalueAVE1110[i]){
              dataobj1110[i].EDA = 0;
          }else{
             dataobj1110[i].EDA = EDAvalueAVE1110[i];}

          if(!TEMPvalueAVE1110[i]){
              dataobj1110[i].TEMP = 0;
          }else{
             dataobj1110[i].TEMP = TEMPvalueAVE1110[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1110);


      const radiusScale1110 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1110.map(HRMaxAccessor1110),//展开语法
          ...dataobj1110.map(HRMinAccessor1110),
        ]))
        .range([width*0.3*0.42, dimensions.boundedRadius*0.41])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1110 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1110 = HRTicks1110.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1110(d))
        .attr("class", "grid-line6")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1110 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1110 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1110 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1110, EDAccessor1110))
          .range([0.6, 1.2])

         // Define cloud cover
        const EDAGroup1110 = bounds.append("g").attr("z-index","3")
        const EDAOffset1110 = 0.42
        const EDADots1110 = EDAGroup1110.selectAll("circle")
          .data(dataobj1110)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1110(d, EDAOffset1110))
          .attr("cy", d => getYFromDataPoint1110(d, EDAOffset1110))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1110(EDAccessor1110(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1110 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1110, TEMPAccessor1110))
          .range([1, 3])

        // Define cloud cover
        const TEMPGroup1110 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1110 = 0.38
        const TEMPDots1110 = TEMPGroup1110.selectAll("circle")
          .data(dataobj1110)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1110(d, TEMPOffset1110))
          .attr("cy", d => getYFromDataPoint1110(d, TEMPOffset1110))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1110(TEMPAccessor1110(d)))
      //TEMP

      //draw HR
        const areaGenerator1110 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1110(HRMinAccessor1110(d)))
          .outerRadius(d => radiusScale1110(HRMaxAccessor1110(d)));


        const area1110 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1110(dataobj1110))
          .style("fill", `url(#${gradientId})`)
      //draw HR
//sixth--------------------------------------------------------------------------------------------------


//seventh---------------------------------------------------------------------------------------------------------------
    //EDA
    const dataset21112 = await d3.csv(pathEDA1112)
    const EDAvalue1112 = Object.values(dataset21112);  
    //每240个值取一个平均
    const EDAvalueAVE1112 = [];
    var sumEDA1112  = 0;
    for(i=0;i<EDAvalue1112.length;i++){
      sumEDA1112+=parseInt(EDAvalue1112[i].EDA);
  
        if ((i+1)%240 == 0){
          let K = Math.abs((sumEDA1112/240-0.8)*4);
          //console.log(K.toFixed(2))
          EDAvalueAVE1112.push(K.toFixed(2));
          //console.log(sumEDA1124);
          sumEDA1112=0;
        }
    }
    //console.log(EDAvalueAVE);
    const EDAccessor1112 = d => d.EDA;
    //EDA

    //TEMP
    const dataset31112 = await d3.csv(pathTEMP1112)
    const TEMPvalue1112 = Object.values(dataset31112);  
    //每240个值取一个平均
    const TEMPvalueAVE1112 = [];
    var sumTEMP1112  = 0;
    for(i=0;i<TEMPvalue1112.length;i++){
    sumTEMP1115+=parseInt(TEMPvalue1112[i].TEMP);
  
        if ((i+1)%240 == 0){
          TEMPvalueAVE1112.push(Math.abs((sumTEMP1112/240-30)*6));
          //console.log(sumTEMP1112);
          sumTEMP1112=0;
        }
    }
    //console.log(TEMPvalueAVE1112);
    const TEMPAccessor1112 = d => d.TEMP;
    //TEMP

    const datalength1112 = dataset1112.length;
    console.log(datalength1112);

    const HRMinAccessor1112 = d=>d.MIN;
    const HRMaxAccessor1112 = d=>d.MAX;

    //替换掉了dataset1112里面的时间戳
    for(var num = 0; num < datalength1112; num++){
      let time1 = parseInt(dataset1112[num].TIMESTAMP);
      //console.log(time1);
      dataset1112[num].TIMESTAMP = new Date(time1 * 1000).toLocaleString().replace(/:\d{1,2}$/,'');
      dataset1112[num].HR = parseInt(dataset1112[num].HR);
    }
    

    let datahandle1112 = {};
    dataset1112.forEach((item, index) => {
      let { TIMESTAMP } = item;
      if (!datahandle1112[TIMESTAMP]) {
          datahandle1112[TIMESTAMP] = {
              TIMESTAMP,
              HR: [],
              EDA:[],
              TEMP:[],
          }
      }
      datahandle1112[TIMESTAMP].HR.push(item.HR);
    });

    const dataobj1112 = Object.values(datahandle1112); 
      for (i=0;i<dataobj1112.length;i++){
          dataobj1112[i].MAX = d3.max(dataobj1112[i].HR);
          dataobj1112[i].MIN = d3.min(dataobj1112[i].HR);
          if(!EDAvalueAVE1112[i]){
              dataobj1112[i].EDA = 0;
          }else{
             dataobj1112[i].EDA = EDAvalueAVE1112[i];}

          if(!TEMPvalueAVE1112[i]){
              dataobj1112[i].TEMP = 0;
          }else{
             dataobj1112[i].TEMP = TEMPvalueAVE1112[i];}
        
        // console.log(1);
      }
      // 最终输出
      //console.log(dataobj1112);


      const radiusScale1112 = d3.scaleLinear()
        .domain(d3.extent([
          ...dataobj1112.map(HRMaxAccessor1112),//展开语法
          ...dataobj1112.map(HRMinAccessor1112),
        ]))
        .range([width*0.3*0.32, dimensions.boundedRadius*0.32])
        // We're just drawing circles for our radar chart, so we can keep this friendly using .nice()
        .nice()

        const HRTicks1112 = radiusScale1.ticks(5)
      // Generate concentric circles for our radar chart
      const gridCircles1112 = HRTicks1110.map(d => (
      peripherals.append("circle")
        .attr("r", radiusScale1112(d))
        .attr("class", "grid-line7")
        .attr("stroke-dasharray","10,5,2")
      ))

      //EDA
      const getXFromDataPoint1112 = (d, offset = 1) => getCoordinatesForAngle( //coordinate坐标
        angleScale1(dateAccessor1(d)),
        offset
        )[0]
      const getYFromDataPoint1112 = (d, offset = 1) => getCoordinatesForAngle(
        angleScale1(dateAccessor1(d)),
        offset
        )[1]


        const EDARadiusScale1112 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1112, EDAccessor1112))
          .range([0.6, 1.2])

         // Define cloud cover
        const EDAGroup1112 = bounds.append("g").attr("z-index","3")
        const EDAOffset1112 = 0.33
        const EDADots1112 = EDAGroup1112.selectAll("circle")
          .data(dataobj1112)
          .enter().append("circle")
          .attr("class", "cloud-dot")
          .attr("cx", d => getXFromDataPoint1112(d, EDAOffset1112))
          .attr("cy", d => getYFromDataPoint1112(d, EDAOffset1112))
          // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => EDARadiusScale1110(EDAccessor1110(d)))
      //EDA

      //TEMP
        const TEMPRadiusScale1112 = d3.scaleSqrt()//平方根
          .domain(d3.extent(dataobj1112, TEMPAccessor1112))
          .range([1, 2.5])

        // Define cloud cover
        const TEMPGroup1112 = bounds.append("g").attr("z-index","3")
        const TEMPOffset1112 = 0.3
        const TEMPDots1112 = TEMPGroup1112.selectAll("circle")
          .data(dataobj1112)
          .enter().append("circle")
          .attr("class", "TEMP-dot")
          .attr("cx", d => getXFromDataPoint1112(d, TEMPOffset1112))
          .attr("cy", d => getYFromDataPoint1112(d, TEMPOffset1112))
        // Notice how we're using the size of the dot to indicate cloud coverage
          .attr("r", d => TEMPRadiusScale1110(TEMPAccessor1110(d)))
      //TEMP

      //draw HR===========================================================================================
        const areaGenerator1112 = d3.areaRadial()
          .angle(d => angleScale1(dateAccessor1(d)))
          .innerRadius(d => radiusScale1112(HRMinAccessor1112(d)))
          .outerRadius(d => radiusScale1112(HRMaxAccessor1112(d)));


        const area1112 = bounds.append("path")//大的组里加一个路径
          .attr("class", "area")
          .attr("d", areaGenerator1112(dataobj1112))
          .style("fill", `url(#${gradientId})`)
      //draw HR
//seventh--------------------------------------------------------------------------------------------------

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
  drawAnnotation(Math.PI * 0.15, -0.9, "HR")
  //说明-----------------------------------------------------------------------------------

  //EDA 和 TEMP放大------------------------------------------------------------------------------------------
 /* var Tmouseover = function(d) {
    console.log("e");
    d3.select(this).style("class", "TEMP-doto").attr("r",function (d) { return TEMPRadiusScale(TEMPAccessor(d))*3; });
  }
  var Emouseover = function(d) {
    d3.select(this).style("class", "cloud-doto").attr("r",function (d) { return EDARadiusScale(EDAccessor(d))*3; });
  }

  var HRmouseover = function(d) {
    console.log("11111");
    d3.select(this).innerRadius(d => radiusScale1(HRMinAccessor(d)-10))
    .outerRadius(d => radiusScale1(HRMaxAccessor(d))+10);
  }

  var HRmouseleave = function(d) {
    d3.select(this).innerRadius(d => radiusScale1(HRMinAccessor(d)))
    .outerRadius(d => radiusScale1(HRMaxAccessor(d)));
  }


  var Tmouseleave = function(d) {
    d3.select(this).style("class", "TEMP-dot").attr("r",function (d) { return TEMPRadiusScale(TEMPAccessor(d)); });
  }

  var Emouseleave = function(d) {
  d3.select(this).style("class", "cloud-dot").attr("r",function (d) { return EDARadiusScale(EDAccessor(d)); });
  }*/
  //EDA 和 TEMP放大------------------------------------------------------------------------------------------
  
  
  
  //交互-----------------------------------------------------------------------------------------------------
  // 7. Set up interactions

  const whiteCircle = bounds.append("circle")
    .attr("class", "white-circle")
    .attr("r", dimensions.width/3.5 )


  const listenerCircle = bounds.append("circle")
    .attr("class", "listener-circle")
    .attr("r", dimensions.width /3)
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
    .style("transform", `translate(${
      dimensions.margin.left + dimensions.boundedRadius-75}px, 
      ${dimensions.margin.top + dimensions.boundedRadius-68}px)`)
      /*.style("transform", `translate(calc(${
        outerCoordinates[0] < - 50 ? "40px - 100" :
          outerCoordinates[0] > 50 ? "-40px + 0" :
            "-50"
        }% + ${
        outerCoordinates[0]
        + dimensions.margin.top
        + dimensions.boundedRadius
        }px), calc(${
        outerCoordinates[1] < - 50 ? "40px - 100" :
          outerCoordinates[1] > 50 ? "-40px + 0" :
            "-50"
        }% + ${
        outerCoordinates[1]
        + dimensions.margin.top
        + dimensions.boundedRadius
        }px))`)*/
        

    const date = angleScale1.invert(angle)
    //console.log(date);
    const dateString = d3.timeFormat("%H:%M")(date)
    //console.log(dateString);

    const D = dataset1[0].TIMESTAMP.slice(0,-5);
    
    const M = D+dateString;
    //console.log(M);

    const dataPoint = dataobj.filter(d => d.TIMESTAMP == M)[0]

    
    //console.log(dataPoint)
    if (!dataPoint) {
      
    tooltip.select("#tooltip-date")
      .text(d3.timeFormat(" %H:%M")(date))
      //  HR
    tooltip.select("#tooltip-temperature-min")
      .html(`HR: 0.0/s`)
    tooltip.select("#tooltip-temperature-max")
      .html(`0.0/s`)
    //HR


    tooltip.select("#tooltip-cloud")
      .text("0")
    tooltip.select("#tooltip-precipitation")
      .text("0°C")

    }else{

      tooltip.select("#tooltip-date")
      .text(d3.timeFormat(D+" %H:%M")(date))
    const Ttrue = (TEMPAccessor(dataPoint)/6+30).toFixed(2); //Math.abs((sumTEMP/240-30)*6)
      //console.log(dataPoint)
    

      //  HR
    tooltip.select("#tooltip-temperature-min")
      .html(`HR: ${d3.format(".1f")(
        HRMinAccessor(dataPoint))
        }/s`)
    tooltip.select("#tooltip-temperature-max")
      .html(`${d3.format(".1f")(
        HRMaxAccessor(dataPoint))
        }/s`)
    //HR


    tooltip.select("#tooltip-cloud")
      .text(EDAccessor(dataPoint))
    tooltip.select("#tooltip-precipitation")
      .text(Ttrue+"°C")
    /*tooltip.select("#tooltip-precipitation-type")
      .text(precipitationTypeAccessor(dataPoint))*/
    /*tooltip.select(".tooltip-precipitation-type")
      .style("color", precipitationTypeAccessor(dataPoint)
        ? precipitationTypeColorScale(
          precipitationTypeAccessor(dataPoint)
        )
        : "#dadadd")*/
    tooltip.select("#tooltip-temperature-min")
      .style("color", HRColorScale(
        HRMinAccessor(dataPoint)
      ))
    tooltip.select("#tooltip-temperature-max")
      .style("color", HRColorScale(
        HRMaxAccessor(dataPoint)
      ));
  }}

  function onMouseLeave() {
    //tooltip.style("opacity", 0)
    tooltipLine.style("opacity", 0)
    const D = dataset1[0].TIMESTAMP.slice(0,-5);
    
    tooltip.select("#tooltip-date")
      .text(d3.timeFormat(D))
    tooltip.select("#tooltip-temperature-min")
      .html(`HR: 0.0/s`)
    tooltip.select("#tooltip-temperature-max")
      .html(`0.0/s`)
    //HR

    tooltip.select("#tooltip-cloud")
      .text("0")
    tooltip.select("#tooltip-precipitation")
      .text("0°C")
  }

 //交互-----------------------------------------------------------------------------------------------------



 //第二个！！！-------------------------------------------------------------------------------------------------------
 
}
drawChart()