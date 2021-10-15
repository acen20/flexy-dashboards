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
  var eur = 0.0;
  assets
    .filter((asset) => asset["currency"] == "EUR")
    .forEach((asset) => {
      eur += Number(asset["equalInEUR"]);
    });
  console.log(eur);

  var usd = 0.0;
  assets
    .filter((asset) => asset["currency"] == "USD")
    .forEach((asset) => {
      usd += Number(asset["equalInEUR"]);
    });
  console.log(usd);

  var rub = 0.0;
  assets
    .filter((asset) => asset["currency"] == "RUB")
    .forEach((asset) => {
      rub += Number(asset["equalInEUR"]);
    });
  console.log(rub);

  var basicdoughnutChart = echarts.init(
    document.getElementById("basic-doughnut")
  );
  var option = {
    // Add title
    title: {
      text: "Currencies",
      subtext: "Open source information",
      x: "center",
    },

    // Add legend
    legend: {
      orient: "vertical",
      x: "left",
      data: ["EUR", "USD", "RUB"],
      show: false,
    },

    // Add custom colors
    color: palette.slice(29, palette.length),

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
        radius: ["40%", "70%"],
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
              show: false,
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
          { value: eur, name: "EUR" },
          { value: usd, name: "USD" },
          { value: rub, name: "RUB" },
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
    color: palette.slice(12, palette.length),

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
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let assets = portfolioValue["assets"];
  let industries = [];
  assets.forEach((asset) => {
    industries.push(asset["industryNameEN"]);
  });
  industries = industries.filter(onlyUnique);
  console.log(industries.length);
  var i = 0;
  industries.forEach((industry) => {
    var value = 0.0;
    assets
      .filter((asset) => asset["industryNameEN"] == industry)
      .forEach((asset) => {
        value += Number(asset["equalInEUR"]);
        industries[i] = {
          name: industry,
          value: value,
        };
      });
    i += 1;
  });
  console.log(industries);
  var basicdoughnutChart = echarts.init(document.getElementById("basic-pie2"));
  var option = {
    // Add title
    title: {
      text: "Industries",
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
    color: palette,

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
    theme: {
      monochrome: {
        enabled: true,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },

    // Enable drag recalculate
    calculable: true,

    // Add series
    series: [
      {
        name: "Browsers",
        type: "pie",
        radius: ["0%", "60%"],
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
              formatter: "{b}" + "" + "\n({d}%)",
              position: "center",
              textStyle: {
                fontWeight: "300",
              },
              width: 20,
              overflow: "truncate",
            },
          },
        },

        data: industries,
      },
    ],
  };
  basicdoughnutChart.setOption(option);
});

$(function () {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let assets = portfolioValue["assets"];
  let industries = [];
  assets.forEach((asset) => {
    industries.push(asset["sectorNameEN"]);
  });
  industries = industries.filter(onlyUnique);
  console.log(industries.length);
  var i = 0;
  industries.forEach((industry) => {
    var value = 0.0;
    assets
      .filter((asset) => asset["sectorNameEN"] == industry)
      .forEach((asset) => {
        value += Number(asset["equalInEUR"]);
        industries[i] = {
          name: industry,
          value: value,
        };
      });
    i += 1;
  });
  console.log(industries);
  var basicdoughnutChart = echarts.init(
    document.getElementById("basic-doughnut2")
  );
  var option = {
    // Add title
    title: {
      text: "Sectors",
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
    color: palette.reverse().slice(12, palette.length),

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
              formatter: "{b}" + "" + "\n({d}%)",
              position: "center",
              textStyle: {
                fontWeight: "500",
              },
            },
          },
        },

        data: industries,
      },
    ],
  };
  basicdoughnutChart.setOption(option);
});

//===========Row3 chart==============

$(function () {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let assets = portfolioValue["assets"];
  let industries = [];
  assets.forEach((asset) => {
    industries.push(asset["ticker"]);
  });
  industries = industries.filter(onlyUnique);
  console.log(industries.length);
  var i = 0;
  industries.forEach((industry) => {
    var value = 0.0;
    assets
      .filter((asset) => asset["ticker"] == industry)
      .forEach((asset) => {
        value += Number(asset["equalInEUR"]);
        industries[i] = {
          name: industry,
          value: value,
        };
      });
    i += 1;
  });
  console.log(industries);
  var chartDom = document.getElementById("pie-chart3");
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "Assets",
      subtext: "Subtext here",
      left: "center",
    },
    color: palette,
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
      data: industries,
    },
    series: [
      {
        name: "Asset",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: industries,
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

  option && myChart.setOption(option);
});
