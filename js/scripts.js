
  mapboxgl.accessToken = 'pk.eyJ1IjoicmVuLWhlZ3lpIiwiYSI6ImNremhudTF1eTJjMW0yd2t1NTUzYjN4bmIifQ.IiIyBmQ93k7PgPh0rQrLEg'

  var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]
  var mapCenter = [-73.991496372,   40.74636738]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/light-v9', // style URL
    center: mapCenter, // starting position as [lng, lat]
    maxBounds: nycBounds,
    zoom: 12,
    // minZoom: 9,
    // maxZoom: 14
  });

// $.getJSON('data/zerega-fleet-locations.json', function(locations) {
//   console.log(locations)
//
//   // now add markers for all fleet locations
//   locations.forEach(function(location) {
//     var popup = new mapboxgl.Popup({ offset: 40 })
//       .setHTML(`
//         <p> <strong> Address: </strong>${location.address} </p>
//         <p> <strong> Site name: </strong>${location.name} </p>
//         <p> <strong> Fleet Size: </strong> ${location.fleet_size} </p>
//         <p> To electrify the <strong>${location.type}</strong> fleet parked at this location, there must be electrical infrastructure available to serve <strong>${location.estimated_demand_mva} MVA</strong> of additional demand.</p>
//       `);
//
//     // default is purple for "multiple" fleet type
//     var color = 'purple'
//
//     if (location.fleet_type === 'School Bus') {
//       color = '#FFD800'
//     }
//
//     if (location.fleet_type === 'Public Refuse Truck') {
//       color = '#19601B'
//     }
//
//     new mapboxgl.Marker({
//       color: color
//     })
//       .setLngLat([location.gps_longitude, location.gps_latitude])
//       .setPopup(popup)
//       .addTo(map);
//   })
//
//
// })

// load data and add layers
  map.on("load", function () {

    map.addSource('500yr-floodplain', {
      type: 'geojson',
      data: './data/500yr-floodplain.geojson'
    });

    map.addLayer({
      id: '500flood',
      type: 'fill',
      source: '500yr-floodplain',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'fill-color': '#3fb5c3',
        'fill-opacity': 0.3
      }
    });

    map.addSource('100yr-floodplain', {
      type: 'geojson',
      data: './data/100yr-floodplain.geojson'
    });

    map.addLayer({
      id: '100flood',
      type: 'fill',
      source: '100yr-floodplain',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'fill-color': '#bfe8f4',
        'fill-opacity': 0.5
      }
    });

    map.addSource('m-streams', {
      type: 'geojson',
      data: './data/mnhta_streams.geojson'
    });

    map.addLayer({
      id: 'streams',
      type: 'line',
      source: 'm-streams',
      layout: {
        // Make the layer visible by default.
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#2733e8',
        'line-width': 2
      }
    });

    map.addSource('1609-shore', {
      type: 'geojson',
      data: './data/mnhta_shoreline.geojson'
    });

    map.addLayer({
      id: 'm-shore',
      type: 'line',
      source: '1609-shore',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#252a00',
        'line-width': 3

      }
    });


    map.addSource('west_bronx_shore', {
      type: 'geojson',
      data: './data/west_bronx_shore.geojson'
    });

    map.addLayer({
      id: 'bx-shore',
      type: 'line',
      source: 'west_bronx_shore',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#252a00',
        'line-width': 3

      }
    });

    map.addSource('west_bronx_streams', {
      type: 'geojson',
      data: './data/west_bronx_streams.geojson'
    });

    map.addLayer({
      id: 'bx-streams',
      type: 'line',
      source: 'west_bronx_streams',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#2733e8',
        'line-width': 2

      }
    });

    map.addSource('broadway_sewer', {
      type: 'geojson',
      data: './data/broadway_sewer.geojson'
    });

    map.addLayer({
      id: 'sewer',
      type: 'line',
      source: 'broadway_sewer',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'line-color': '#af8a1b',
        'line-width': 4

      }
    });

    map.addSource('CSOs', {
      type: 'geojson',
      data: './data/CSOs.geojson'
    });

    map.addLayer({
      id: 'CSOs',
      type: 'circle',
      source: 'CSOs',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'circle-color': '#ba190c',
        'circle-radius': 6

      }
    });

// create pop up for sewer and CSO
    map.on('mouseenter', 'sewer', function(e) {
      map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.lngLat;
      var popupText=`
        <p> <strong> Broadway sewer main </strong> (current path of Tibbetts Brook)</p>
      `;

      popup = new mapboxgl.Popup({ offset: 10 });

      popup.setLngLat(coordinates)
            .setHTML(popupText)
            .addTo(map);

    });

    map.on('mouseenter', 'CSOs', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.lngLat;
      var id = e.features[0].properties.cso_identification_number;

      var popupText=`
        <p> This is CSO ${id}.</p>
      `;

      popup = new mapboxgl.Popup({ offset: 10 });

      popup.setLngLat(coordinates)
            .setHTML(popupText)
            .addTo(map);

    });

    map.on('mouseenter', 'bx-streams', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.lngLat;
      const id = e.features[0].properties.stream_name;


      if (id==="tibbetts"){
        var popupText=`
          <p> <strong> Tibbetts Brook </strong> (historical path)</p>
        `;

      }  else{
        var popupText=`NA`;
      }

      popup = new mapboxgl.Popup({ offset: 10 });

      popup.setLngLat(coordinates)
            .setHTML(popupText)
            .addTo(map);
    });


    // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'sewer', function(e) {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });


    // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'CSOs', function(e) {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });


    // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'bx-streams', function(e) {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });



});

//toggle flood layers, source: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
 map.on("idle", function () {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('100flood') || !map.getLayer('500flood') ) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['100flood', '500flood'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
      // Skip layers that already have a button set up.
      if (document.getElementById(id)) {
        continue;
      }

      // Create a link.
      const link = document.createElement('a');
      link.id = id;
      link.href = '#';
      // link.textContent = id;

      if(id==='100flood'){
        link.textContent='100 year floodplain';
        link.className='active';
      } else {
        link.textContent='500 year floodplain';
        link.className = 'none';
      }
      // else{
      //   link.textContent='Pre-development shoreline (1609)';
      // }



      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
        const clickedLayer = this.id;
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty(
          clickedLayer,
          'visibility'
        );

        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(
              clickedLayer,
              'visibility',
              'visible'
            );
          }
        };

        const layers = document.getElementById('menu');
        layers.appendChild(link);
      }
});


// listen for clicks on the neighborhood flyto buttons
$('.flyto').on('click', function() {
  if ($(this).hasClass('flyto-tibbetts')) {
    newCenter = [-73.9101635,40.8822333]

    map.setLayoutProperty(
      'CSOs',
      'visibility',
      'visible'
    );

    map.setLayoutProperty(
      'sewer',
      'visibility',
      'visible'
    );
  }

  if ($(this).hasClass('flyto-minetta')) {
    newCenter = [-74.009485,40.707873]
  }

  if ($(this).hasClass('flyto-washington-heights')) {
    newCenter = [-73.941626,40.840029]
  }

  map.flyTo({
    center: newCenter,
    zoom: 13
  })
})

// listen for click on the 'Back to City View' button
$('.reset').on('click', function() {
  map.flyTo({
    center: mapCenter,
    zoom: 12
  });

  map.setLayoutProperty(
    'CSOs',
    'visibility',
    'none'
  );

  map.setLayoutProperty(
    'sewer',
    'visibility',
    'none'
  );
})

$('.collapse').collapse()

// // fly to Harlem
// $('#fly-to-harlem').on('click', function() {
//     // when this is clicked, let's fly the map to Midtown Manhattan
//     map.flyTo({
//       center: [
//         -73.94753262781356,
//         40.79221764547749,
//       ],
//       zoom: 13,
//     })
//
//   })


//legend

//define layer names for legend
// const layers = [
//
// 'Sanitation Fleet',
// 'School Bus Fleet',
// 'Other Fleet',
// 'Substation'
// ];
// const colors = [
// '#19601B',
// '#FFD800',
// 'purple',
// '#38A1B8'
// ];
//
// // create legend. Source: https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/#add-a-legend
// const legend = document.getElementById('legend');
//
// layers.forEach((layer, i) => {
//   const color = colors[i];
//   const item = document.createElement('div');
//   const key = document.createElement('span');
//   key.className = 'legend-key';
//   key.style.backgroundColor = color;
//
//   const value = document.createElement('span');
//   value.innerHTML = `${layer}`;
//   item.appendChild(key);
//   item.appendChild(value);
//   legend.appendChild(item);
// });
