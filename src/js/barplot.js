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
        const val = parseFloat(res.avg.toFixed(2))   
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
            colors: [chooseColor(val)],
            series: [{
                data: [{
                    name: "overall",
                    y: val
                }]
            }]
        });
    })
}
function loadDataColumn() {
    chrome.storage.sync.get(['nomi','cognomi','telefoni','luoghi','medici','politici','religiosi','email','ssn','targa','patente','passaporto','indirizzoip','indirizzocasa','datadinascita','iban','tradeunion','orientamentosessuale','razza','cap'], function(res) {
        Highcharts.chart('dc', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Dati Personali'
        },
        xAxis: {
            categories: ['Nomi', 'Cognome', 'Telefoni', 'Luoghi', 'Medici', 'Politici', 'Religiosi', 'Email', 'Social Number','Targa','Patente','Passaporto','Indirizzo IP','Indirizzo di casa','Data di nascita','Iban','Trade union','Orientamento sessuale','Razza','CAP'],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '6px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Totale dati personali'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            enabled:false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: ' Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            data:[
                [res.nomi],
                [res.cognomi],
                [res.telefoni],
                [res.luoghi],
                [res.medici],
                [res.politici],
                [res.religiosi],
                [res.email],
                [res.ssn],
                [res.targa],
                [res.patente],
                [res.passaporto],
                [res.indirizzoip],
                [res.indirizzocasa],
                [res.datadinascita],
                [res.iban],
                [res.tradeunion],
                [res.orientamentosessuale],
                [res.razza],
                [res.cap]
            ]
        }]
    });
})}

function chooseColor(sens){
    let color = ""
    if (sens>=0.36 && sens <= 0.68) color = "#f1c40f"
    else if (sens>=0.69 && sens <= 1) color = "#e67e22"
    /*if(sens >= 0 && sens <= 0.25) color="#2ecc71"
    else if(sens >= 0.26 && sens <= 0.50) color = "#f1c40f"
    else if(sens >= 0.51 && sens <= 0.75) color = "#e67e22"
    else if(sens >= 0.76 && sens <= 1) color = "e74c3c"*/
    return color
}