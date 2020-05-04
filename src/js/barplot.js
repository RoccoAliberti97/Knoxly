document.addEventListener('DOMContentLoaded', function () {
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
            data: [1, 16, 4, 24, 5]
        }],
    });
});