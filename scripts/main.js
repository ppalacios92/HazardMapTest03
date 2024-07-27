document.addEventListener('DOMContentLoaded', function () {
    // Crear el mapa y centrarse en las coordenadas dadas
    var map = L.map('map').setView([-1.10, -77.00], 7.5); // Asegúrate de usar las coordenadas en EPSG:4326
    var chart; // Variable para almacenar la instancia del gráfico

    // Asegurar que la proyección del mapa sea EPSG:4326

    // Asegurar que la proyección del mapa sea EPSG:4326
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
        continuousWorld: false,
        noWrap: true
    }).addTo(map);
    


    // Añadir la imagen raster como una capa al mapa
    var imageUrl = 'layers/RASTER_hmap_mean_PGA_poe01_500y_1.png';
    var imageBounds = [[1.48, -81.01], [-5.03, -75.19]]; // Ajustar estas coordenadas según tu archivo .aux.xml
    var imageLayer = L.imageOverlay(imageUrl, imageBounds, { opacity: 0.8}).addTo(map);

    

    // Función para mostrar el gráfico de una característica específica
    function showChart(feature) {
        var properties = feature.properties;
        var coordinates = feature.geometry.coordinates;
        var labels = ["PGA_0_1", "SA_0_05_0_", "SA_0_075_0", "SA_0_1_0_1", "SA_0_15_0_", "SA_0_2_0_1", "SA_0_25_0_", "SA_0_3_0_1", "SA_0_4_0_1", "SA_0_5_0_1", "SA_0_6_0_1", "SA_0_75_0_", "SA_1_0_1", "SA_1_25_0_", "SA_1_5_0_1", "SA_2_0_1", "SA_3_0_1", "SA_4_0_1", "SA_5_0_1"];
        
        var values = labels.map(label => properties[label]);

        var ctx = document.getElementById('myChart').getContext('2d');
        document.getElementById('coordinates').innerText = `Coordinates: [${coordinates[1].toFixed(3)}, ${coordinates[0].toFixed(3)}]`;

        // Destruir la instancia anterior del gráfico si existe
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["PGA", "0.05", "0.075", "0.10", "0.15", "0.20", "0.25", "0.30", "0.40", "0.50", "0.60", "0.75", "1.00", "1.25", "1.50", "2.00", "3.00", "4.00", "5.00"],
                datasets: [{
                    label: 'UHS - Ing. Patricio Palacios MSc.',
                    data: values,
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
                        position: 'bottom' // Esto coloca la leyenda debajo del gráfico
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

        // Mostrar y llenar la tabla
        createDataTable(properties, coordinates);
    }

    // Función para crear la tabla de datos
    function createDataTable(data, coordinates) {
        // Encuentra el contenedor de la tabla
        const container = document.getElementById('data-table-container');
    
        // Limpia el contenedor
        container.innerHTML = '';
    
        // Crea la tabla
        const table = document.createElement('table');
        table.className = 'data-table';
    
        // Agrega el encabezado de la tabla
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Solo las claves específicas
        const keys = ['Longitude', 'Latitude', 'PGA_0_1'];
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Agrega los datos a la tabla
        const tbody = document.createElement('tbody');
        const dataRow = document.createElement('tr');
        
        // Agrega las coordenadas primero
        const lonTd = document.createElement('td');
        lonTd.textContent = coordinates[0].toFixed(5);
        dataRow.appendChild(lonTd);
        
        const latTd = document.createElement('td');
        latTd.textContent = coordinates[1].toFixed(5);
        dataRow.appendChild(latTd);
        
        // Agrega el valor de PGA_0_1
        const pgaTd = document.createElement('td');
        pgaTd.textContent = data['PGA_0_1'];
        dataRow.appendChild(pgaTd);

        tbody.appendChild(dataRow);
        table.appendChild(tbody);
    
        // Agrega la tabla al contenedor
        container.appendChild(table);
    }

    // Crear el estilo para los puntos
    function pointStyle(feature) {
        return {
            radius: 3,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 0.6,
            fillOpacity: 0.1
        };
    }

    // Añadir la capa GeoJSON de bndEcuadorBoundary_5.js al mapa
    var boundaryLayer = L.geoJSON(json_bndEcuadorBoundary_5, {
        style: function (feature) {
            return {
                color: "#000000",
                weight: 4,
                opacity: 1,
                fillOpacity: 0
            };
        }
    }).addTo(map);

    // Añadir la capa GeoJSON de CurvasNivel_hmap_mean_PGA_poe01_500y_3.js al mapa
    var curvasLayer = L.geoJSON(json_CurvasNivel_hmap_mean_PGA_poe01_500y_3, {
        style: function (feature) {
            return {
                color: "#000000",
                weight: 3,
                opacity: 1,
                fillOpacity: 0
            };
        }
    }).addTo(map);



    // Añadir la capa GeoJSON de ciudades_4.js al mapa con el estilo personalizado
    var ciudadesLayer = L.geoJSON(json_ciudades_4, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 4, // Ajustar el tamaño del punto
                fillColor: "green", // Color del punto
                color: "green", // Color del borde del punto
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.Id) {
                layer.bindTooltip(feature.properties.Id, {
                    permanent: true,
                    direction: "right",
                    className: "city-label" // Clase CSS para la etiqueta
                });
            }
        }
    }).addTo(map);

















    




    // Agregar la capa GeoJSON al mapa y adjuntar evento de clic a las características
    var geojsonLayer = L.geoJSON(json_POINTS_hmap_mean_UHS_poe01_500y_2, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle(feature));
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function () {
                showChart(feature);
            });
        }
    }).addTo(map);

    // Sincronizar los eventos de zoom y movimiento
    map.on('zoomend', function() {
        // Aquí puedes agregar lógica adicional si necesitas hacer algo al final del zoom
    });

    map.on('moveend', function() {
        // Aquí puedes agregar lógica adicional si necesitas hacer algo al final del movimiento
    });

    // Inicializar un gráfico vacío
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'UHS - Ing. Patricio Palacios MSc.',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
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
                    position: 'bottom' // Esto coloca la leyenda debajo del gráfico
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
});
