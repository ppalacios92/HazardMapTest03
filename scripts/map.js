document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([-1.10, -77.00], 7.5); // Centrar el mapa en Ecuador
    var imageUrl = 'layers/RASTER_hmap_mean_PGA_poe01_500y_1.png';
    var imageBounds = [[1.48, -81.01], [-5.03, -75.19]]; // Ajustar estas coordenadas según tu archivo .aux.xml
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
        continuousWorld: false,
        noWrap: true
    }).addTo(map);
    L.imageOverlay(imageUrl, imageBounds, { opacity: 0.8 }).addTo(map);

    // Añadir las capas GeoJSON
    addGeoJsonLayers(map);

    // Inicializar gráficos vacíos
    initUhsChart();
    initHazardCurvesChart();

    // Sincronizar eventos del mapa
    map.on('zoomend', function () {
        // Lógica adicional al finalizar el zoom
    });
    map.on('moveend', function () {
        // Lógica adicional al finalizar el movimiento
    });
});
