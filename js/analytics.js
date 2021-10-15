// ------------------------------
// Basic pie chart
// ------------------------------
// based on prepared DOM, initialize echarts instance
$(function(){
    var basicdoughnutChart = echarts.init(document.getElementById('basic-doughnut'));
    var option = {
        // Add title
            title: {
                text: 'Browser popularity',
                subtext: 'Open source information',
                x: 'center'
            },

            // Add legend
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Internet Explorer','Opera','Safari','Firefox','Chrome'],
                show: false
            },

            // Add custom colors
            color: ['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],

            // Display toolbox
            toolbox: {
                show: false,
                orient: 'vertical',
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: 'View data',
                        lang: ['View chart data', 'Close', 'Update']
                    },
                    magicType: {
                        show: true,
                        title: {
                            pie: 'Switch to pies',
                            funnel: 'Switch to funnel',
                        },
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                y: '20%',
                                width: '50%',
                                height: '70%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Same as image',
                        lang: ['Save']
                    }
                }
            },

            // Enable drag recalculate
            calculable: true,

            // Add series
            series: [
                {
                    name: 'Browsers',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '57.5%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: '{b}' + 'nn' + '{c} ({d}%)',
                                position: 'center',
                                textStyle: {
                                    fontSize: '17',
                                    fontWeight: '500'
                                }
                            }
                        }
                    },

                    data: [
                        {value: 335, name: 'Internet Explorer'},
                        {value: 310, name: 'Opera'},
                        {value: 234, name: 'Safari'},
                        {value: 135, name: 'Firefox'},
                        {value: 1548, name: 'Chrome'}
                    ]
                }
            ]
    };
    basicdoughnutChart.setOption(option);
})

// ------------------------------
// Basic pie chart
// ------------------------------
// based on prepared DOM, initialize echarts instance
$(function(){
    var basicdoughnutChart = echarts.init(document.getElementById('pie-chart'));
    var option = {
        // Add title
            title: {
                text: 'Browser popularity',
                subtext: 'Open source information',
                x: 'center'
            },

            // Add legend
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Internet Explorer','Opera','Safari','Firefox','Chrome'],
                show: false
            },

            // Add custom colors
            color: ['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],

            // Display toolbox
            toolbox: {
                show: false,
                orient: 'vertical',
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: 'View data',
                        lang: ['View chart data', 'Close', 'Update']
                    },
                    magicType: {
                        show: true,
                        title: {
                            pie: 'Switch to pies',
                            funnel: 'Switch to funnel',
                        },
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                y: '20%',
                                width: '50%',
                                height: '70%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Same as image',
                        lang: ['Save']
                    }
                }
            },

            // Enable drag recalculate
            calculable: true,

            // Add series
            series: [
                {
                    name: 'Browsers',
                    type: 'pie',
                    radius: ['0%', '70%'],
                    center: ['50%', '57.5%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: '{b}' + 'nn' + '{c} ({d}%)',
                                position: 'center',
                                textStyle: {
                                    fontSize: '17',
                                    fontWeight: '500'
                                }
                            }
                        }
                    },

                    data: [
                        {value: 335, name: 'Internet Explorer'},
                        {value: 310, name: 'Opera'},
                        {value: 234, name: 'Safari'},
                        {value: 135, name: 'Firefox'},
                        {value: 1548, name: 'Chrome'}
                    ]
                }
            ]
    };
    basicdoughnutChart.setOption(option);
})

//=================Row2 charts=================
$(function(){
    var basicdoughnutChart = echarts.init(document.getElementById('basic-pie2'));
    var option = {
        // Add title
            title: {
                text: 'Browser popularity',
                subtext: 'Open source information',
                x: 'center'
            },

            // Add legend
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Internet Explorer','Opera','Safari','Firefox','Chrome'],
                show: true
            },

            // Add custom colors
            color: ['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],

            // Display toolbox
            toolbox: {
                show: false,
                orient: 'vertical',
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: 'View data',
                        lang: ['View chart data', 'Close', 'Update']
                    },
                    magicType: {
                        show: true,
                        title: {
                            pie: 'Switch to pies',
                            funnel: 'Switch to funnel',
                        },
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                y: '20%',
                                width: '50%',
                                height: '70%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Same as image',
                        lang: ['Save']
                    }
                }
            },

            // Enable drag recalculate
            calculable: true,

            // Add series
            series: [
                {
                    name: 'Browsers',
                    type: 'pie',
                    radius: ['0%', '70%'],
                    center: ['50%', '57.5%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: '{b}' + 'nn' + '{c} ({d}%)',
                                position: 'center',
                                textStyle: {
                                    fontSize: '17',
                                    fontWeight: '500'
                                }
                            }
                        }
                    },

                    data: [
                        {value: 335, name: 'Internet Explorer'},
                        {value: 310, name: 'Opera'},
                        {value: 234, name: 'Safari'},
                        {value: 135, name: 'Firefox'},
                        {value: 1548, name: 'Chrome'}
                    ]
                }
            ]
    };
    basicdoughnutChart.setOption(option);
})

$(function(){
    var basicdoughnutChart = echarts.init(document.getElementById('basic-doughnut2'));
    var option = {
        // Add title
            title: {
                text: 'Browser popularity',
                subtext: 'Open source information',
                x: 'center'
            },

            // Add legend
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Internet Explorer','Opera','Safari','Firefox','Chrome'],
                show: true
            },

            // Add custom colors
            color: ['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],

            // Display toolbox
            toolbox: {
                show: false,
                orient: 'vertical',
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: 'View data',
                        lang: ['View chart data', 'Close', 'Update']
                    },
                    magicType: {
                        show: true,
                        title: {
                            pie: 'Switch to pies',
                            funnel: 'Switch to funnel',
                        },
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                y: '20%',
                                width: '50%',
                                height: '70%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Same as image',
                        lang: ['Save']
                    }
                }
            },

            // Enable drag recalculate
            calculable: true,

            // Add series
            series: [
                {
                    name: 'Browsers',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '57.5%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: '{b}' + 'nn' + '{c} ({d}%)',
                                position: 'center',
                                textStyle: {
                                    fontSize: '17',
                                    fontWeight: '500'
                                }
                            }
                        }
                    },

                    data: [
                        {value: 335, name: 'Internet Explorer'},
                        {value: 310, name: 'Opera'},
                        {value: 234, name: 'Safari'},
                        {value: 135, name: 'Firefox'},
                        {value: 1548, name: 'Chrome'}
                    ]
                }
            ]
    };
    basicdoughnutChart.setOption(option);
})
