function loadBarPlot(){
    chrome.storage.sync.get(['occurrence'], function(res){
        Highcharts.chart('bp', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Di cosa parli'
            },
            xAxis: {
                categories: ['P', 'H', 'J', 'T', 'G']
            },
            yAxis: {
                /*title: {
                    text: 'Occorrenza'
                }*/
            },
            tooltip: {
                enabled: false
            },
            series: [{
                name: 'Occorrenza',
                data: res.occurrence
            }],
        });
    })
}

function loadOverall(){
    chrome.storage.sync.get(['avg'], function(res){
        let val = parseFloat(res.avg.toFixed(2))
        let color = chooseColor(val)
        
        Highcharts.chart('overall', {
            chart: {
                plotBackgroupColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie' 
            },
            title: {
                text: 'Pie'
            },
            tooltip:{
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: '+val
                    }
                },
                series: {
                    animation: false
                }
            },
            colors: [color],
            series: [{
                data: [{
                    name: "overall",
                    y: val
                }]
            }]
        });
    })
}

function chooseColor(sens){
    let color = ""
    if(sens >= 0 && sens <= 0.33) color="#66FF55"
    else if(sens >= 0.34 && sens <= 0.66) color = "#FFFF66"
    else if(sens >= 0.67 && sens <= 1) color = "#FF6666"
    return color
}