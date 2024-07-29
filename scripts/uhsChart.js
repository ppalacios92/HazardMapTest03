var chart;

function initUhsChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["PGA", "0.05", "0.075", "0.10", "0.15", "0.20", "0.25", "0.30", "0.40", "0.50", "0.60", "0.75", "1.00", "1.25", "1.50", "2.00", "3.00", "4.00", "5.00"],
            datasets: [{
                label: 'UHS - mean',
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
                        text: 'Period (s)',
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Spectral Acceleration (g)',
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
                }
            },
            plugins: {
                legend: {
                    position: 'bottom', // Esto coloca la leyenda debajo del gráfico
                    labels: {
                        usePointStyle: true, // Usar estilo de punto para la leyenda
                        pointStyle: 'line' // Mostrar una línea en la leyenda
                    }
                },
                title: {
                    display: true,
                    text: 'Uniform Hazard Spectra',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function showChart(feature) {
    var properties = feature.properties;
    var coordinates = feature.geometry.coordinates.map(coord => coord.toFixed(3));
    
    // Datos de los archivos quantile_uhs
    var quantile_uhs_0_5_2_features = json_quantile_uhs_0_5_2.features;
    var quantile_uhs_0_16_1_features = json_quantile_uhs_0_16_1.features;
    var quantile_uhs_0_84_0_features = json_quantile_uhs_0_84_0.features;

    var labelsMean = ["PGA_0_1", "SA_0_05_0_", "SA_0_075_0", "SA_0_1_0_1", "SA_0_15_0_", "SA_0_2_0_1", "SA_0_25_0_", "SA_0_3_0_1", "SA_0_4_0_1", "SA_0_5_0_1", "SA_0_6_0_1", "SA_0_75_0_", "SA_1_0_1", "SA_1_25_0_", "SA_1_5_0_1", "SA_2_0_1", "SA_3_0_1", "SA_4_0_1", "SA_5_0_1"];
    var labelsQuantile50 = ["PGAq50", "SA_0_05q50", "SA_0_075q50", "SA_0_1q50", "SA_0_15q50", "SA_0_2q50", "SA_0_25q50", "SA_0_3q50", "SA_0_4q50", "SA_0_5q50", "SA_0_6q50", "SA_0_75q50", "SA_1q50", "SA_1_25q50", "SA_1_5q50", "SA_2q50", "SA_3q50", "SA_4q50", "SA_5q50"];
    var labelsQuantile16 = ["PGAq16", "SA_0_05q16", "SA_0_075q16", "SA_0_1q16", "SA_0_15q16", "SA_0_2q16", "SA_0_25q16", "SA_0_3q16", "SA_0_4q16", "SA_0_5q16", "SA_0_6q16", "SA_0_75q16", "SA_1q16", "SA_1_25q16", "SA_1_5q16", "SA_2q16", "SA_3q16", "SA_4q16", "SA_5q16"];
    var labelsQuantile84 = ["PGAq84", "SA_0_05q84", "SA_0_075q84", "SA_0_1q84", "SA_0_15q84", "SA_0_2q84", "SA_0_25q84", "SA_0_3q84", "SA_0_4q84", "SA_0_5q84", "SA_0_6q84", "SA_0_75q84", "SA_1q84", "SA_1_25q84", "SA_1_5q84", "SA_2q84", "SA_3q84", "SA_4q84", "SA_5q84"];

    var valuesMean = labelsMean.map(label => properties[label]);
    var valuesQuantile50 = [];
    var valuesQuantile16 = [];
    var valuesQuantile84 = [];

    quantile_uhs_0_5_2_features.forEach(function(feature) {
        var featureCoords = feature.geometry.coordinates.map(coord => coord.toFixed(3));
        if (featureCoords[0] === coordinates[0] && featureCoords[1] === coordinates[1]) {
            var properties = feature.properties;
            labelsQuantile50.forEach(function(label) {
                valuesQuantile50.push(properties[label].toFixed(3));
            });
        }
    });

    quantile_uhs_0_16_1_features.forEach(function(feature) {
        var featureCoords = feature.geometry.coordinates.map(coord => coord.toFixed(3));
        if (featureCoords[0] === coordinates[0] && featureCoords[1] === coordinates[1]) {
            var properties = feature.properties;
            labelsQuantile16.forEach(function(label) {
                valuesQuantile16.push(properties[label].toFixed(3));
            });
        }
    });

    quantile_uhs_0_84_0_features.forEach(function(feature) {
        var featureCoords = feature.geometry.coordinates.map(coord => coord.toFixed(3));
        if (featureCoords[0] === coordinates[0] && featureCoords[1] === coordinates[1]) {
            var properties = feature.properties;
            labelsQuantile84.forEach(function(label) {
                valuesQuantile84.push(properties[label].toFixed(3));
            });
        }
    });

    var datasets = [
        {
            label: 'UHS - mean',
            data: valuesMean,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3.0
        },
        {
            label: 'q-0.50',
            data: valuesQuantile50,
            borderColor: 'rgba(75, 75, 75, 1)', // Gris
            borderWidth: 1.0,
            borderDash: [5, 5] // Línea punteada
        },
        {
            label: 'q-0.16',
            data: valuesQuantile16,
            borderColor: 'rgba(75, 75, 75, 1)', // Gris
            borderWidth: 1.0,
            borderDash: [5, 5] // Línea punteada
        },
        {
            label: 'q-0.84',
            data: valuesQuantile84,
            borderColor: 'rgba(75, 75, 75, 1)', // Gris
            borderWidth: 1.0,
            borderDash: [5, 5] // Línea punteada
        }
    ];

    var ctx = document.getElementById('myChart').getContext('2d');
    document.getElementById('coordinates').innerText = `Coordinates: [${coordinates[1]}, ${coordinates[0]}]`;
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["PGA", "0.05", "0.075", "0.10", "0.15", "0.20", "0.25", "0.30", "0.40", "0.50", "0.60", "0.75", "1.00", "1.25", "1.50", "2.00", "3.00", "4.00", "5.00"],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Period (s)',
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Spectral Acceleration (g)',
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
                    text: 'Uniform Hazard Spectra',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
    createDataTable(properties, coordinates);
    showAdditionalCharts(coordinates);
}
