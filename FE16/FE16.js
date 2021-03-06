/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 var $ = function(id){
   return document.getElementById(id);
 };
var aqiData = [];
var count = 0;


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

  var city = $('aqi-city-input').value.trim();
  var aqi = $('aqi-value-input').value.trim();
  if(/^[\u4e00-\u9fbf]+$/.test(city) && /^[0-9]+$/.test(aqi))
  {
    aqiData.push([city,aqi]);
    return 1;
  }

  else

    {
      alert("请输入正确的中文城市名以及aqi的值！");
      return 0;
    }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    var father = $('aqi-table');
    var son = document.createElement('tr');
    var grandSon1 = document.createElement('td');
    var grandSon2 = document.createElement('td');
    var grandSon3 = document.createElement('button');
    father.appendChild(son);
    son.appendChild(grandSon1);
    son.appendChild(grandSon2);
    son.appendChild(grandSon3);
    grandSon1.innerHTML = aqiData[count][0];
    grandSon2.innerHTML = aqiData[count][1];
    grandSon3.innerHTML = '删除';
    count++;


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  var flag = addAqiData();
  if(flag)
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  var tar = event.target;
  tar.parentNode.remove();

  // do sth.


}

function init() {
  $('add-btn').onclick = addBtnHandle;

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  $('aqi-table').onclick = delBtnHandle;

}

init();
