var wms_layers = [];


        var lyr_EsriStandard_0 = new ol.layer.Tile({
            'title': 'Esri Standard',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
            })
        });
var lyr_RASTER_hmap_mean_PGA_poe01_500y_1 = new ol.layer.Image({
                            opacity: 1,
                            title: "RASTER_hmap_mean_PGA_poe-0.1_50.0y",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/RASTER_hmap_mean_PGA_poe01_500y_1.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-9018018.093191, -558956.997904, -8370342.363027, 164806.718250]
                            })
                        });
var format_POINTS_hmap_mean_UHS_poe01_500y_2 = new ol.format.GeoJSON();
var features_POINTS_hmap_mean_UHS_poe01_500y_2 = format_POINTS_hmap_mean_UHS_poe01_500y_2.readFeatures(json_POINTS_hmap_mean_UHS_poe01_500y_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_POINTS_hmap_mean_UHS_poe01_500y_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_POINTS_hmap_mean_UHS_poe01_500y_2.addFeatures(features_POINTS_hmap_mean_UHS_poe01_500y_2);
var lyr_POINTS_hmap_mean_UHS_poe01_500y_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_POINTS_hmap_mean_UHS_poe01_500y_2, 
                style: style_POINTS_hmap_mean_UHS_poe01_500y_2,
                popuplayertitle: "POINTS_hmap_mean_UHS_poe-0.1_50.0y",
                interactive: true,
                title: 'POINTS_hmap_mean_UHS_poe-0.1_50.0y'
            });
var format_CurvasNivel_hmap_mean_PGA_poe01_500y_3 = new ol.format.GeoJSON();
var features_CurvasNivel_hmap_mean_PGA_poe01_500y_3 = format_CurvasNivel_hmap_mean_PGA_poe01_500y_3.readFeatures(json_CurvasNivel_hmap_mean_PGA_poe01_500y_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CurvasNivel_hmap_mean_PGA_poe01_500y_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CurvasNivel_hmap_mean_PGA_poe01_500y_3.addFeatures(features_CurvasNivel_hmap_mean_PGA_poe01_500y_3);
var lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CurvasNivel_hmap_mean_PGA_poe01_500y_3, 
                style: style_CurvasNivel_hmap_mean_PGA_poe01_500y_3,
                popuplayertitle: "CurvasNivel_hmap_mean_PGA_poe-0.1_50.0y",
                interactive: true,
                title: '<img src="styles/legend/CurvasNivel_hmap_mean_PGA_poe01_500y_3.png" /> CurvasNivel_hmap_mean_PGA_poe-0.1_50.0y'
            });
var format_ciudades_4 = new ol.format.GeoJSON();
var features_ciudades_4 = format_ciudades_4.readFeatures(json_ciudades_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ciudades_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ciudades_4.addFeatures(features_ciudades_4);
var lyr_ciudades_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ciudades_4, 
                style: style_ciudades_4,
                popuplayertitle: "ciudades",
                interactive: true,
                title: '<img src="styles/legend/ciudades_4.png" /> ciudades'
            });
var format_bndEcuadorBoundary_5 = new ol.format.GeoJSON();
var features_bndEcuadorBoundary_5 = format_bndEcuadorBoundary_5.readFeatures(json_bndEcuadorBoundary_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_bndEcuadorBoundary_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_bndEcuadorBoundary_5.addFeatures(features_bndEcuadorBoundary_5);
var lyr_bndEcuadorBoundary_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_bndEcuadorBoundary_5, 
                style: style_bndEcuadorBoundary_5,
                popuplayertitle: "bnd — EcuadorBoundary",
                interactive: true,
                title: '<img src="styles/legend/bndEcuadorBoundary_5.png" /> bnd — EcuadorBoundary'
            });
var group_Ecuador = new ol.layer.Group({
                                layers: [lyr_ciudades_4,lyr_bndEcuadorBoundary_5,],
                                fold: "open",
                                title: "Ecuador"});
var group_POE_01 = new ol.layer.Group({
                                layers: [lyr_RASTER_hmap_mean_PGA_poe01_500y_1,lyr_POINTS_hmap_mean_UHS_poe01_500y_2,lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3,],
                                fold: "open",
                                title: "POE_0.1"});
var group_Mapas = new ol.layer.Group({
                                layers: [lyr_EsriStandard_0,],
                                fold: "open",
                                title: "Mapas"});

lyr_EsriStandard_0.setVisible(true);lyr_RASTER_hmap_mean_PGA_poe01_500y_1.setVisible(true);lyr_POINTS_hmap_mean_UHS_poe01_500y_2.setVisible(true);lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3.setVisible(true);lyr_ciudades_4.setVisible(true);lyr_bndEcuadorBoundary_5.setVisible(true);
var layersList = [group_Mapas,group_POE_01,group_Ecuador];
lyr_POINTS_hmap_mean_UHS_poe01_500y_2.set('fieldAliases', {'lon': 'lon', 'lat': 'lat', 'PGA_0_1': 'PGA_0_1', 'SA_0_05_0_': 'SA_0_05_0_', 'SA_0_075_0': 'SA_0_075_0', 'SA_0_1_0_1': 'SA_0_1_0_1', 'SA_0_15_0_': 'SA_0_15_0_', 'SA_0_2_0_1': 'SA_0_2_0_1', 'SA_0_25_0_': 'SA_0_25_0_', 'SA_0_3_0_1': 'SA_0_3_0_1', 'SA_0_4_0_1': 'SA_0_4_0_1', 'SA_0_5_0_1': 'SA_0_5_0_1', 'SA_0_6_0_1': 'SA_0_6_0_1', 'SA_0_75_0_': 'SA_0_75_0_', 'SA_1_0_1': 'SA_1_0_1', 'SA_1_25_0_': 'SA_1_25_0_', 'SA_1_5_0_1': 'SA_1_5_0_1', 'SA_2_0_1': 'SA_2_0_1', 'SA_3_0_1': 'SA_3_0_1', 'SA_4_0_1': 'SA_4_0_1', 'SA_5_0_1': 'SA_5_0_1', });
lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3.set('fieldAliases', {'ID': 'ID', 'ELEV': 'ELEV', });
lyr_ciudades_4.set('fieldAliases', {'Id': 'Id', });
lyr_bndEcuadorBoundary_5.set('fieldAliases', {'FID': 'FID', });
lyr_POINTS_hmap_mean_UHS_poe01_500y_2.set('fieldImages', {'lon': 'TextEdit', 'lat': 'TextEdit', 'PGA_0_1': 'TextEdit', 'SA_0_05_0_': '', 'SA_0_075_0': '', 'SA_0_1_0_1': 'TextEdit', 'SA_0_15_0_': '', 'SA_0_2_0_1': 'TextEdit', 'SA_0_25_0_': '', 'SA_0_3_0_1': 'TextEdit', 'SA_0_4_0_1': 'TextEdit', 'SA_0_5_0_1': 'TextEdit', 'SA_0_6_0_1': 'TextEdit', 'SA_0_75_0_': '', 'SA_1_0_1': 'TextEdit', 'SA_1_25_0_': '', 'SA_1_5_0_1': 'TextEdit', 'SA_2_0_1': 'TextEdit', 'SA_3_0_1': 'TextEdit', 'SA_4_0_1': 'TextEdit', 'SA_5_0_1': 'TextEdit', });
lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3.set('fieldImages', {'ID': 'Range', 'ELEV': 'TextEdit', });
lyr_ciudades_4.set('fieldImages', {'Id': 'TextEdit', });
lyr_bndEcuadorBoundary_5.set('fieldImages', {'FID': 'TextEdit', });
lyr_POINTS_hmap_mean_UHS_poe01_500y_2.set('fieldLabels', {'lon': 'header label - visible with data', 'lat': 'header label - visible with data', 'PGA_0_1': 'header label - visible with data', 'SA_0_05_0_': 'no label', 'SA_0_075_0': 'no label', 'SA_0_1_0_1': 'no label', 'SA_0_15_0_': 'no label', 'SA_0_2_0_1': 'no label', 'SA_0_25_0_': 'no label', 'SA_0_3_0_1': 'no label', 'SA_0_4_0_1': 'no label', 'SA_0_5_0_1': 'no label', 'SA_0_6_0_1': 'no label', 'SA_0_75_0_': 'no label', 'SA_1_0_1': 'no label', 'SA_1_25_0_': 'no label', 'SA_1_5_0_1': 'no label', 'SA_2_0_1': 'no label', 'SA_3_0_1': 'no label', 'SA_4_0_1': 'no label', 'SA_5_0_1': 'no label', });
lyr_CurvasNivel_hmap_mean_PGA_poe01_500y_3.set('fieldLabels', {'ID': 'no label', 'ELEV': 'no label', });
lyr_ciudades_4.set('fieldLabels', {'Id': 'no label', });
lyr_bndEcuadorBoundary_5.set('fieldLabels', {'FID': 'no label', });
lyr_bndEcuadorBoundary_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});