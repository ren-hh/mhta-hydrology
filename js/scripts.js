
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


//add markes layer
    map.loadImage(
      './images/mapbox-marker-icon-20px-gray.png',
      // <i class="fa-solid fa-location-pin"></i>,


      (error, image) => {
        if (error) throw error;

      // Add the image to the map style.
        map.addImage('marker_im', image);

        map.addSource('markers', {
          type: 'geojson',
          data: './data/markers.geojson'
        });

        map.addLayer({
          id: 'markers',
          type: 'symbol',
          source: 'markers',
          layout: {
            'visibility': 'visible',
            'icon-image': 'marker_im'
          },
          paint: {
            // 'icon-size': 0.25
            // 'circle-radius': 6
          }

        });
      }
    )

});

// create pop up when hovering over  sewer,  CSO, streams, markers
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

    map.on('mouseenter', 'markers', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.lngLat;
      var name = e.features[0].properties.name;

      var popupText=`
        <p> <strong> ${name} </strong></p>
      `;

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

    // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'markers', function(e) {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });




//when marker is clicked, have navbar text Change

map.on('click', 'markers', function(e) {
  const coordinates = e.lngLat;
  const name = e.features[0].properties.name;
  const desc = e.features[0].properties.description;
  const photo = e.features[0].properties.image;
  const link = e.features[0].properties.link;

  $(".sidebar-top").html(
 ` <div class="card text-whote bg-dark mb-3">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src= "${photo}" class="img-fluid"/>
        <a href="#!">
       <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${desc}</p>
      <p class="card-text"> ${link} </p>
    </div>
 </div>

 `
 //<a href="#!" class="reset btn btn-primary">Back to City View</a>

  )

  map.flyTo({
    center: coordinates,
    zoom: 15
  })

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

  if ($(this).hasClass('flyto-gowanus')) {
    newCenter = [-73.941626,40.840029]
  }

  map.flyTo({
    center: newCenter,
    zoom: 13
  })

  // var eventValue = function (event) {
  //    document.body.appendChild(document.createElement('div'))
  //    .textContent = event.type;
  // }
  // var pressed = document.querySelector(".flyto");
  // pressed.addEventListener("click", eventValue);

});



// listen for click on the 'Back to City View' button
$('.reset').on('click', function() {
  map.flyTo({
    center: mapCenter,
    zoom: 12
  });

console.log('hellloooo')

  $('.sidebar-top').html(  `

    <h3> NYC Water Stories </h3>
    <p>The map shows streams that criscrossed Manhattan in the year 1609 along with the shoreline at the time.  Though most creeks and streams are no longer visible on the surface, many continue to course through subway tunnels, basements, and deep under streets and buildings.</p>
    <p> Toggle the layers for the 100 year and 500 year flood maps developed by FEMA to see how much the original geography of the island impacts where flood hazards are expected today. </p>

    <h5>Jump to a Story</h5>
       <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
        <button type="button" class="btn btn-outline-primary flyto flyto-tibbetts">Tibbetts Brook</button>
        <button type="button" class="btn btn-outline-primary flyto flyto-gowanus">Gowanus Canal</button>
        <button type="button" class="btn btn-outline-primary flyto flyto-minetta">Minetta Creek</button>
        <button type="button" class="btn btn-outline-primary flyto flyto-eastside">East River Park</button>
        <button type="button" class="btn btn-outline-primary flyto flyto-newtown">Newtown Creek</button>
      </div>
  `
);


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
});

// $('.collapse').collapse()



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
