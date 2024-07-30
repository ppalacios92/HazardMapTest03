var chart2;

function initHazardCurvesChart() {
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["0.00", "0.50", "1.00", "1.50", "2.00", "2.50", "3.00", "3.50", "4.00"],
            datasets: [{
                label: 'Hazard Curves',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sa (g)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        font: {
                            size: 10,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    type: 'logarithmic', // Escala logarítmica
                    min: 0.001, // Valor mínimo del eje Y
                    title: {
                        display: true,
                        text: 'PoE in 50y',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return Number(value.toString());
                        },
                        font: {
                            size: 10,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                },
                title: {
                    display: true,
                    text: 'Hazard Curves',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function showAdditionalCharts(coordinates) {
    var hazardData = {
        'PGA': json_hazard_curvemeanPGA_0.features,
        'T_0_1': json_hazard_curvemeanSA01_1.features,
        'T_0_2': json_hazard_curvemeanSA02_2.features,
        'T_0_5': json_hazard_curvemeanSA05_3.features,
        'T_1': json_hazard_curvemeanSA10_4.features        
    };

    var additionalLabels = {
        'PGA': ["0.001","0.0015473","0.0023942","0.0037046","0.0057323","0.0088697","0.0137244","0.0212361","0.0328592","0.0508439","0.0786722","0.1217316","0.1883585","0.2914522","0.4509719","0.697801","1.0797263","1.6706896","2.5851032","4"],
        'T_0_1': ["0.01","0.0137073","0.0187889","0.0257544","0.0353022","0.0483897","0.066329","0.0909188","0.1246247","0.1708263","0.234156","0.3209636","0.439953","0.6030549","0.8266228","1.133073","1.5531322","2.128918","2.9181625","4"],
        'T_0_2': ["0.01","0.0137073","0.0187889","0.0257544","0.0353022","0.0483897","0.066329","0.0909188","0.1246247","0.1708263","0.234156","0.3209636","0.439953","0.6030549","0.8266228","1.133073","1.5531322","2.128918","2.9181625","4"],
        'T_0_5': ["0.01","0.0135013","0.0182284","0.0246107","0.0332276","0.0448615","0.0605688","0.0817756","0.1104075","0.1490642","0.2012556","0.2717208","0.3668577","0.4953047","0.6687245","0.9028634","1.2189807","1.6457795","2.2220123","3"],
        'T_1': ["0.01","0.0132162","0.0174668","0.0230845","0.030509","0.0403213","0.0532894","0.0704284","0.0930796","0.123016","0.1625805","0.2148697","0.2839763","0.375309","0.4960161","0.6555452","0.8663821","1.1450285","1.5132935","2"]
    };

    var customLabels = {
        'PGA': 'PGA',
        'T_0_1': '0.1s',
        'T_0_2': '0.2s',
        'T_0_5': '0.5s',
        'T_1': '1.0s'
    };

    var datasets = [];

    for (var key in hazardData) {
        var data = hazardData[key];
        var values = [];

        data.forEach(function (feature) {
            var featureCoords = feature.geometry.coordinates.map(coord => coord.toFixed(3));
            if (featureCoords[0] === coordinates[0] && featureCoords[1] === coordinates[1]) {
                var properties = feature.properties;
                additionalLabels[key].forEach(function (label, index) {
                    values.push({ x: parseFloat(label), y: parseFloat(properties[label]).toFixed(3) }); // Redondear los valores a 3 decimales
                });
            }
        });

        datasets.push({
            label: customLabels[key],
            data: values,
            borderColor: key === 'PGA' ? 'rgba(255, 0, 0, 1)' : getRandomColor(),
            borderWidth: key === 'PGA' ? 4.0 : 2.0,
            fill: false,
            showLine: true
        });
    }

    var ctx2 = document.getElementById('myChart2').getContext('2d');

    if (chart2) {
        chart2.destroy();
    }

    chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [], // Las etiquetas de x se definen en los datos
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sa (g)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        stepSize: 0.5, // Intervalos de 0.5
                        callback: function(value) {
                            return Number(value.toFixed(2));
                        },
                        font: {
                            size: 10,
                            weight: 'normal'
                        }
                    },
                    max: 2 // Limitar el eje X a un máximo de 2
                },
                y: {
                    type: 'logarithmic', // Escala logarítmica
                    min: 0.001, // Valor mínimo del eje Y
                    title: {
                        display: true,
                        text: 'PoE in 50y',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return Number(value.toString());
                        },
                        font: {
                            size: 10,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                },
                title: {
                    display: true,
                    text: 'Hazard Curves',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
