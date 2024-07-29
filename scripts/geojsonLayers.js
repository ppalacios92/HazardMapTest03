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
                    className: "city-label"
                });
            }
        }
    }).addTo(map);

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
