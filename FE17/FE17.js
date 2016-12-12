/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
var $ = function(id){
  return document.getElementById(id);
};
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
  while($('bars').hasChildNodes())
  {
    $('bars').removeChild($('bars').firstChild);
  }
  switch(pageState.nowSelectCity)
  {
    case "北京":
      cityNum = 0;
      break;
    case "上海":
      cityNum = 1;
      break;
    case "广州":
      cityNum = 2;
      break;
    case "深圳":
      cityNum = 3;
      break;
    case "成都":
      cityNum = 4;
      break;
    case "西安":
      cityNum = 5;
      break;
    case "福州":
      cityNum = 6;
      break;
    case "厦门":
      cityNum = 7;
      break;
    case "沈阳":
      cityNum = 8;
      break;
  }
  if(pageState.nowGraTime === 'day')
  {
    for(i = 1; i < 92; i++)
    {
      var aqi = allCityAqi[cityNum][i];
      var bar = document.createElement('div');
      $('bars').appendChild(bar);
      bar.className = 'aqi-bar';
      bar.style.width = '6px';
      bar.style.left = 8 * i + 'px';
      bar.style.height = aqi + 'px';

      if(aqi <= 50)
      {
        bar.style.backgroundColor = 'rgb(107,194,53)';
      }
      else if(aqi <= 100)
      {
        bar.style.backgroundColor = 'rgb(174,221,129)';
      }
      else if(aqi <= 200)
      {
        bar.style.backgroundColor = 'rgb(131,175,155)';
      }
      else if(aqi <= 300)
      {
        bar.style.backgroundColor = '#EABCAC';
      }
      else if(aqi <= 400)
      {
        bar.style.backgroundColor = '#E2B091';
      }
      else{
        bar.style.backgroundColor = '#874E4C';
      }
    }
    }
    else if(pageState.nowGraTime === 'week')
    {
      var count = 1;
      for(i = 1; i < 92 ; i += 7)
      {
        var sumAqi = 0;
        var weeklyAqi = [];

        for(j = i; j <= i + 6; j++)
        {
          sumAqi += allCityAqi[cityNum][j];
        }
        weeklyAqi[count] = sumAqi / 7;
        var barW = document.createElement('div');
        $('bars').appendChild(barW);
        barW.className = 'aqi-bar';
        barW.style.width = '35px';
        barW.style.left = 55 * (count -1) + 27.5 + 'px';
        barW.style.height = weeklyAqi[count] + 'px';

        if(weeklyAqi[count]  <= 50)
        {
          barW.style.backgroundColor = 'rgb(107,194,53)';
        }
        else if(weeklyAqi[count]  <= 100)
        {
          barW.style.backgroundColor = 'rgb(174,221,129)';
        }
        else if(weeklyAqi[count]  <= 200)
        {
          barW.style.backgroundColor = 'rgb(131,175,155)';
        }
        else if(weeklyAqi[count]  <= 300)
        {
          barW.style.backgroundColor = '#EABCAC';
        }
        else if(weeklyAqi[count]  <= 400)
        {
          barW.style.backgroundColor = '#E2B091';
        }
        else{
          barW.style.backgroundColor = '#874E4C';
        }
        count++;

      }
    }
    else
    {
      var aqiMonth1 = 0;
      var aqiMonth2 = 0;
      var aqiMonth3 = 0;
      for(i = 1; i <= 31 ; i++)
        aqiMonth1 += allCityAqi[cityNum][i];
      for(j = 32; j <= 60; j++)
        aqiMonth2 += allCityAqi[cityNum][i];
      for(k = 61; k <= 91; k++)
        aqiMonth3 += allCityAqi[cityNum][k];
      var aveAqiMonth1 = aqiMonth1 / 31;
      var aveAqiMonth2 = aqiMonth2 / 29;
      var aveAqiMonth3 = aqiMonth3 / 31;

      var bar1 = document.createElement('div');
      $('bars').appendChild(bar1);
      bar1.className = 'aqi-bar';
      bar1.style.width = '70px';
      bar1.style.left = '175px';
      bar1.style.height = aveAqiMonth1 + 'px';
      if(aveAqiMonth1 <= 50)
      {
        bar1.style.backgroundColor = 'rgb(107,194,53)';
      }
      else if(aveAqiMonth1 <= 100)
      {
        bar1.style.backgroundColor = 'rgb(174,221,129)';
      }
      else if(aveAqiMonth1 <= 200)
      {
        bar1.style.backgroundColor = 'rgb(131,175,155)';
      }
      else if(aveAqiMonth1 <= 300)
      {
        bar1.style.backgroundColor = '#EABCAC';
      }
      else if(aveAqiMonth1 <= 400)
      {
        bar1.style.backgroundColor = '#E2B091';
      }
      else{
        bar1.style.backgroundColor = '#874E4C';
      }

      var bar2 = document.createElement('div');
      $('bars').appendChild(bar2);
      bar2.className = 'aqi-bar';
      bar2.style.width = '70px';
      bar2.style.left = '295px';
      bar2.style.height = aveAqiMonth2 + 'px';
      if(aveAqiMonth2 <= 50)
      {
        bar2.style.backgroundColor = 'rgb(107,194,53)';
      }
      else if(aveAqiMonth2 <= 100)
      {
        bar2.style.backgroundColor = 'rgb(174,221,129)';
      }
      else if(aveAqiMonth2 <= 200)
      {
        bar2.style.backgroundColor = 'rgb(131,175,155)';
      }
      else if(aveAqiMonth2 <= 300)
      {
        bar2.style.backgroundColor = '#EABCAC';
      }
      else if(aveAqiMonth2 <= 400)
      {
        bar2.style.backgroundColor = '#E2B091';
      }
      else{
        bar2.style.backgroundColor = '#874E4C';
      }

      var bar3 = document.createElement('div');
      $('bars').appendChild(bar3);
      bar3.className = 'aqi-bar';
      bar3.style.width = '70px';
      bar3.style.left = '415px';
      bar3.style.height = aveAqiMonth3 + 'px';
      if(aveAqiMonth3 <= 50)
      {
        bar3.style.backgroundColor = 'rgb(107,194,53)';
      }
      else if(aveAqiMonth3 <= 100)
      {
        bar3.style.backgroundColor = 'rgb(174,221,129)';
      }
      else if(aveAqiMonth3 <= 200)
      {
        bar3.style.backgroundColor = 'rgb(131,175,155)';
      }
      else if(aveAqiMonth3 <= 300)
      {
        bar3.style.backgroundColor = '#EABCAC';
      }
      else if(aveAqiMonth3 <= 400)
      {
        bar3.style.backgroundColor = '#E2B091';
      }
      else{
        bar3.style.backgroundColor = '#874E4C';
      }





    }
  }


  function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
  if(event.target.value !== pageState.nowGraTime)
  {
    pageState.nowGraTime = event.target.value;

  }
  // 设置对应数据
renderChart();
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化
  console.log(event.target.value);
  if(event.target.value !== pageState.nowSelectCity)
  {
    pageState.nowSelectCity = event.target.value;
  }
  // 设置对应数据
  renderChart();
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  $('form-gra-time').addEventListener("click",graTimeChange,false);

}

/**
 * 初始化城市Select下拉选择框中的选项
 */

function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citynames = Object.getOwnPropertyNames(aqiSourceData);
  for(i = 0; i < citynames.length; i++)
    {
      var curCity = document.createElement('option');
      $('city-select').appendChild(curCity);
      curCity.innerHTML = citynames[i];
      curCity.value = citynames[i];
    }
    pageState.nowSelectCity = citynames[0];
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
 $('city-select').addEventListener("change",citySelectChange,false);
/*   addEventHandler($('changeColor'), 'mouseover', function(event){
    var ele = event.target;
    ele.className += "selected";
  });
  addEventHandler($('changeColor'), 'mouseout', function(event){
    var ele = event.target;
    ele.className = ele.className.replace(/selected/, "");
  });
*/
  }

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var citynames = Object.getOwnPropertyNames(aqiSourceData);
  allCityAqi = [];
  for(i = 0; i < citynames.length; i++)
  {

    var singleCityAqi = [];
    for(j = 0; j < 92; j++)
    {
      if(j <= 31 && j >= 0)
      {
        if(j <= 9)
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-0' + j]);
        }
        else
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-' + j]);
        }
      }
      else if(j <= 60)
      {
        var m = j - 31;
        if(m <= 9)
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-0' + m]);
        }
        else
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-' + m]);
        }
      }
      else
      {
        var n = j - 60;
        if(n <= 9)
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-0' + n]);
        }
        else
        {
          singleCityAqi.push(aqiSourceData[citynames[i]]['2016-01-' + n]);
        }

      }
    }
    allCityAqi.push(singleCityAqi);
  }
  console.log(allCityAqi);
  renderChart();


}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
