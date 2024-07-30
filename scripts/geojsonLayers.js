function addGeoJsonLayers(map) {
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

    var curvasLayer = L.geoJSON(json_CurvasNivel_hmap_mean_PGA_poe01_500y_3, {
        style: function (feature) {
            return {
                color: "#000000",
                weight: 3,
                opacity: 1,
                fillOpacity: 0
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.ELEV) {
                layer.bindTooltip("Z=" + feature.properties.ELEV, {
                    permanent: true,
                    direction: "right",
                    className: "elevation-label",
                    opacity: 1.0
                });
            }
        }
    }).addTo(map);

    var ciudadesLayer = L.geoJSON(json_ciudades_4, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 4,
                fillColor: "green",
                color: "green",
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
                    className: "city-label",

                });
            }
        }
    });

    var geojsonLayer = L.geoJSON(json_POINTS_hmap_mean_UHS_poe01_500y_2, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle(feature));
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function () {
                showChart(feature);
            });
        }
    });

    // Función para actualizar la visibilidad de los puntos en función del nivel de zoom
    function updatePointVisibility() {
        if (map.getZoom() >= 9.5) {
            if (!map.hasLayer(geojsonLayer)) {
                map.addLayer(geojsonLayer);
            }
        } else {
            if (map.hasLayer(geojsonLayer)) {
                map.removeLayer(geojsonLayer);
            }
        }
    }

    // Función para actualizar la visibilidad de los nombres de las ciudades en función del nivel de zoom
    function updateCityLabelsVisibility() {
        if (map.getZoom() >= 9) {
            if (!map.hasLayer(ciudadesLayer)) {
                map.addLayer(ciudadesLayer);
            }
        } else {
            if (map.hasLayer(ciudadesLayer)) {
                map.removeLayer(ciudadesLayer);
            }
        }
    }

    // Llamar a las funciones para establecer la visibilidad inicial
    updatePointVisibility();
    updateCityLabelsVisibility();

    // Actualizar la visibilidad cada vez que se cambie el zoom
    map.on('zoomend', function() {
        updatePointVisibility();
        updateCityLabelsVisibility();
    });
}

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

// Añadir estilos CSS para la clase de etiqueta de elevación sin fondo blanco
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .elevation-label .leaflet-tooltip {
        background: none;
        border: none;
        box-shadow: none;
        color: black; /* Ajustar el color del texto si es necesario */
    }
    .city-label .leaflet-tooltip {
        background: none;
        border: none;
        box-shadow: none;
        color: black; /* Ajustar el color del texto si es necesario */
    }
`;
document.getElementsByTagName('head')[0].appendChild(style);
