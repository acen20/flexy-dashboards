var currency_symbol = document.querySelector(".currency-symbol");
var currency_selector = document.querySelector(".currency-selector");
var currencies_ = currency_selector.children;

for (var i = 0; i < currencies_.length; i++) {
  currencies_[i].addEventListener("click", (e) => {
    update_currency(e);
    var current = currency_symbol.innerHTML;
    currency_symbol.innerHTML = e.target.innerHTML;
    e.target.innerHTML = current;
  });
}

const update_currency = (e) => {
  let symbol = e.target.innerHTML;
  selected_cur = symbols.indexOf(symbol);
  current_currency["symbol"] = symbols[selected_cur];
  //update_costs();
  //change_asset_currency();
  //update_portfolio_total();
  //update_portfolio_total_chart();
};

//------------------------------
// Basic pie chart
// ------------------------------
// based on prepared DOM, initialize echarts instance
$(function () {
  var assets = portfolioValue["assets"];
  var etf = Number(
    assets.filter((asset) => asset["type"] == "STOCK:ETF").length
  );
  var bond = Number(
    assets.filter((asset) => asset["type"].includes("BOND:")).length
  );
  var stock = Number(
    assets.filter(
      (asset) => asset["type"].includes("STOCK") && asset["type"] != "STOCK:ETF"
    ).length
  );
  var other = stock + etf + bond - assets.length;

  var basicdoughnutChart = echarts.init(
    document.getElementById("basic-doughnut")
  );
  var option = {
    // Add title
    title: {
      text: "Asset Categories",
      subtext: "Open source information",
      x: "center",
    },

    // Add legend
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Internet Explorer", "Opera", "Safari", "Firefox", "Chrome"],
      show: false,
    },

    // Add custom colors
    color: ["#ffbc34", "#4fc3f7", "#212529", "#f62d51", "#2962FF"],

    // Display toolbox
    toolbox: {
      show: false,
      orient: "vertical",
      feature: {
        mark: {
          show: true,
          title: {
            mark: "Markline switch",
            markUndo: "Undo markline",
            markClear: "Clear markline",
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: "View data",
          lang: ["View chart data", "Close", "Update"],
        },
        magicType: {
          show: true,
          title: {
            pie: "Switch to pies",
            funnel: "Switch to funnel",
          },
          type: ["pie", "funnel"],
          option: {
            funnel: {
              x: "25%",
              y: "20%",
              width: "50%",
              height: "70%",
              funnelAlign: "left",
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: "Restore",
        },
        saveAsImage: {
          show: true,
          title: "Same as image",
          lang: ["Save"],
        },
      },
    },

    // Enable drag recalculate
    calculable: true,

    // Add series
    series: [
      {
        name: "Categories",
        type: "pie",
        radius: ["50%", "70%"],
        center: ["50%", "57.5%"],
        itemStyle: {
          normal: {
            label: {
              show: true,
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{b}" + "nn" + "{c} ({d}%)",
              position: "center",
              textStyle: {
                fontSize: "17",
                fontWeight: "500",
              },
            },
          },
        },

        data: [
          { value: 335, name: "Internet Explorer" },
          { value: 310, name: "Opera" },
          { value: 234, name: "Safari" },
          { value: 135, name: "Firefox" },
          { value: 1548, name: "Chrome" },
        ],
      },
    ],
  };
  basicdoughnutChart.setOption(option);

  // ------------------------------
  // Basic line chart
  // ------------------------------
  // based on prepared DOM, initialize echarts instance
  var myChart = echarts.init(document.getElementById("basic-line"));

  // specify chart configuration item and data
  var option = {
    // Setup grid
    grid: {
      left: "1%",
      right: "2%",
      bottom: "3%",
      containLabel: true,
    },

    // Add Tooltip
    tooltip: {
      trigger: "axis",
    },

    // Add Legend
    legend: {
      data: ["Max temp", "Min temp"],
    },

    // Add custom colors
    color: ["#1e88e5", "#f62d51"],

    // Enable drag recalculate
    calculable: true,

    // Horizontal Axiz
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        color: "#efefef",
      },
    ],

    // Vertical Axis
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value} °C",
        },
      },
    ],

    // Add Series
    series: [
      {
        name: "Max temp",
        type: "line",
        data: [5, 15, 11, 15, 12, 13, 10],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
        },
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: "rgba(0,0,0,0.1)",
            shadowBlur: 10,
            shadowOffsetY: 10,
          },
        },
      },
      {
        name: "Min temp",
        type: "line",
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: "Week low", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
        },
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: "rgba(0,0,0,0.1)",
            shadowBlur: 10,
            shadowOffsetY: 10,
          },
        },
      },
    ],
  };
  // use configuration item and data specified to show chart
  myChart.setOption(option);
});

// ------------------------------
// Basic pie chart
// ------------------------------
// based on prepared DOM, initialize echarts instance
$(function () {
  var assets = portfolioValue["assets"];
  var total = 0.0;
  assets
    .filter((asset) => asset["equalInEUR"])
    .forEach((asset) => {
      total += Number(asset["equalInEUR"]);
    });
  var etf = 0.0;
  assets
    .filter((asset) => asset["type"] == "STOCK:ETF")
    .forEach((asset) => {
      etf += Number(asset["equalInEUR"]);
    });
  console.log(etf);

  var bonds = 0.0;
  assets
    .filter((asset) => asset["type"].includes("BOND:"))
    .forEach((asset) => {
      bonds += Number(asset["equalInEUR"]);
    });
  console.log(bonds);

  var stocks = 0.0;
  assets
    .filter(
      (asset) => asset["type"].includes("STOCK") && asset["type"] != "STOCK:ETF"
    )
    .forEach((asset) => {
      stocks += Number(asset["equalInEUR"]);
    });

  console.log(stocks);
  {
    /*var etf = Number(
    assets.filter((asset) => asset["type"] == "STOCK:ETF").length
  );
  var bonds = Number(
    assets.filter((asset) => asset["type"].includes("BOND:")).length
  );
  var stocks = Number(
    assets.filter(
      (asset) => asset["type"].includes("STOCK") && asset["type"] != "STOCK:ETF"
    ).length
  );
  */
  }
  var other = stocks + etf + bonds - total;

  var basicdoughnutChart = echarts.init(document.getElementById("pie-chart"));
  var option = {
    // Add title
    title: {
      text: "Portfolio Structure",
      subtext: "Subtext here",
      x: "center",
    },

    // Add legend
    legend: {
      orient: "vertical",
      x: "left",
      data: ["ETF", "Bonds", "Stocks", "Other"],
      show: false,
    },

    // Add custom colors
    color: ["lightgray", "#4fc3f7", "blue", "#f62d51"],

    // Display toolbox
    toolbox: {
      show: false,
      orient: "vertical",
      feature: {
        mark: {
          show: true,
          title: {
            mark: "Markline switch",
            markUndo: "Undo markline",
            markClear: "Clear markline",
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: "View data",
          lang: ["View chart data", "Close", "Update"],
        },
        magicType: {
          show: true,
          title: {
            pie: "Switch to pies",
            funnel: "Switch to funnel",
          },
          type: ["pie", "funnel"],
          option: {
            funnel: {
              x: "25%",
              y: "20%",
              width: "50%",
              height: "70%",
              funnelAlign: "left",
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: "Restore",
        },
        saveAsImage: {
          show: true,
          title: "Same as image",
          lang: ["Save"],
        },
      },
    },

    // Enable drag recalculate
    calculable: true,

    // Add series
    series: [
      {
        name: "Categories",
        type: "pie",
        radius: ["0%", "70%"],
        center: ["50%", "57.5%"],
        itemStyle: {
          normal: {
            label: {
              show: true,
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{b}" + " " + "({d}%)",
              position: "center",
              textStyle: {
                fontSize: "14",
                fontWeight: "500",
              },
            },
          },
        },

        data: [
          { value: etf, name: "ETF" },
          { value: bonds, name: "Bonds" },
          { value: stocks, name: "Stocks" },
          { value: other, name: "Other" },
        ],
      },
    ],
  };
  basicdoughnutChart.setOption(option);
});

//=================Row2 charts=================
$(function () {
  var basicdoughnutChart = echarts.init(document.getElementById("basic-pie2"));
  var option = {
    // Add title
    title: {
      text: "Browser popularity",
      subtext: "Open source information",
      x: "center",
    },

    // Add legend
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Internet Explorer", "Opera", "Safari", "Firefox", "Chrome"],
      show: true,
    },

    // Add custom colors
    color: ["#ffbc34", "#4fc3f7", "#212529", "#f62d51", "#2962FF"],

    // Display toolbox
    toolbox: {
      show: false,
      orient: "vertical",
      feature: {
        mark: {
          show: true,
          title: {
            mark: "Markline switch",
            markUndo: "Undo markline",
            markClear: "Clear markline",
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: "View data",
          lang: ["View chart data", "Close", "Update"],
        },
        magicType: {
          show: true,
          title: {
            pie: "Switch to pies",
            funnel: "Switch to funnel",
          },
          type: ["pie", "funnel"],
          option: {
            funnel: {
              x: "25%",
              y: "20%",
              width: "50%",
              height: "70%",
              funnelAlign: "left",
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: "Restore",
        },
        saveAsImage: {
          show: true,
          title: "Same as image",
          lang: ["Save"],
        },
      },
    },

    // Enable drag recalculate
    calculable: true,

    // Add series
    series: [
      {
        name: "Browsers",
        type: "pie",
        radius: ["0%", "70%"],
        center: ["50%", "57.5%"],
        itemStyle: {
          normal: {
            label: {
              show: true,
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{b}" + "nn" + "{c} ({d}%)",
              position: "center",
              textStyle: {
                fontSize: "17",
                fontWeight: "500",
              },
            },
          },
        },

        data: [
          { value: 335, name: "Internet Explorer" },
          { value: 310, name: "Opera" },
          { value: 234, name: "Safari" },
          { value: 135, name: "Firefox" },
          { value: 1548, name: "Chrome" },
        ],
      },
    ],
  };
  basicdoughnutChart.setOption(option);
});

$(function () {
  var basicdoughnutChart = echarts.init(
    document.getElementById("basic-doughnut2")
  );
  var option = {
    // Add title
    title: {
      text: "Browser popularity",
      subtext: "Open source information",
      x: "center",
    },

    // Add legend
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Internet Explorer", "Opera", "Safari", "Firefox", "Chrome"],
      show: true,
    },

    // Add custom colors
    color: ["#ffbc34", "#4fc3f7", "#212529", "#f62d51", "#2962FF"],

    // Display toolbox
    toolbox: {
      show: false,
      orient: "vertical",
      feature: {
        mark: {
          show: true,
          title: {
            mark: "Markline switch",
            markUndo: "Undo markline",
            markClear: "Clear markline",
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: "View data",
          lang: ["View chart data", "Close", "Update"],
        },
        magicType: {
          show: true,
          title: {
            pie: "Switch to pies",
            funnel: "Switch to funnel",
          },
          type: ["pie", "funnel"],
          option: {
            funnel: {
              x: "25%",
              y: "20%",
              width: "50%",
              height: "70%",
              funnelAlign: "left",
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: "Restore",
        },
        saveAsImage: {
          show: true,
          title: "Same as image",
          lang: ["Save"],
        },
      },
    },

    // Enable drag recalculate
    calculable: true,

    // Add series
    series: [
      {
        name: "Browsers",
        type: "pie",
        radius: ["50%", "70%"],
        center: ["50%", "57.5%"],
        itemStyle: {
          normal: {
            label: {
              show: true,
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{b}" + "nn" + "{c} ({d}%)",
              position: "center",
              textStyle: {
                fontSize: "17",
                fontWeight: "500",
              },
            },
          },
        },

        data: [
          { value: 335, name: "Internet Explorer" },
          { value: 310, name: "Opera" },
          { value: 234, name: "Safari" },
          { value: 135, name: "Firefox" },
          { value: 1548, name: "Chrome" },
        ],
      },
    ],
  };
  basicdoughnutChart.setOption(option);
});

//===========Row3 chart==============

$(function () {
  var chartDom = document.getElementById("pie-chart3");
  var myChart = echarts.init(chartDom);
  var option;

  const data = genData(50);
  option = {
    title: {
      text: "同名数量统计",
      subtext: "纯属虚构",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      data: data.legendData,
    },
    series: [
      {
        name: "姓名",
        type: "pie",
        radius: "55%",
        center: ["40%", "50%"],
        data: data.seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  function genData(count) {
    // prettier-ignore
    const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    const legendData = [];
    const seriesData = [];
    for (var i = 0; i < count; i++) {
      var name =
        Math.random() > 0.65
          ? makeWord(4, 1) + "·" + makeWord(3, 0)
          : makeWord(2, 1);
      legendData.push(name);
      seriesData.push({
        name: name,
        value: Math.round(Math.random() * 100000),
      });
    }
    return {
      legendData: legendData,
      seriesData: seriesData,
    };
    function makeWord(max, min) {
      const nameLen = Math.ceil(Math.random() * max + min);
      const name = [];
      for (var i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
      }
      return name.join("");
    }
  }

  option && myChart.setOption(option);
});
