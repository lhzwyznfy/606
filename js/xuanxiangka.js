let tabBox = document.getElementById('tabBox');
let navBox = document.getElementById('navBox');
let navList = navBox.getElementsByTagName('li');
let detailList = tabBox.getElementsByTagName('div');
let context="事件记录";
let dates=1;
// click 事件编写
drawChart(1);

for (var i = 0; i < navList.length; i++) {
    //给每个li添加i一个myIndex属性，属性值为i。 因为只有JS代码加载完才能看到页面，当for循环结束后
    //i 已经变成6， 所以需要新增一个变量属性index来记录。
    navList[i].myIndex = i;
    navList[i].onclick = function() {
        // this 代表当前点击的元素li，下标为myIndex
        changeClass(this.myIndex);
        drawChart(this.myIndex+1);
    }
}

function changeClass(activeTab) {
    for (var i = 0; i < navList.length; i++) {
        //  先将className全部置为空
        navList[i].className = '';
        //detailList[i].className = '';
    }
    // DOM元素className赋值的方法，点击谁就给谁添加className= 'active'
    navList[activeTab].className = 'active';
    //detailList[activeTab].className = 'active';
}


function OnInput(event){
  context=event.target.value;
  console.log(context)
}