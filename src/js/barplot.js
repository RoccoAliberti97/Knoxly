document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['occurrence'], function(res){
        Highcharts.chart('container', {
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
});