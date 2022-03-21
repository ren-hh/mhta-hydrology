
  mapboxgl.accessToken = 'pk.eyJ1IjoicmVuLWhlZ3lpIiwiYSI6ImNremhudTF1eTJjMW0yd2t1NTUzYjN4bmIifQ.IiIyBmQ93k7PgPh0rQrLEg'

  var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]
  var mapCenter = [-73.9567938, 40.8007976]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/light-v9', // style URL
    center: mapCenter, // starting position as [lng, lat]
    maxBounds: nycBounds,
    zoom: 11,
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

    map.addSource('newtown_creek', {
      type: 'geojson',
      data: './data/newtown_creek.geojson'
    });

    map.addLayer({
      id: 'newtown_creek',
      type: 'line',
      source: 'newtown_creek',
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

    map.addSource('putnam_greenway', {
      type: 'geojson',
      data: './data/putnam_greenway.geojson'
    });

    map.addLayer({
      id: 'putnam_greenway',
      type: 'line',
      source: 'putnam_greenway',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'line-color': '#578A20',
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


//add markers layer
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
            'icon-image': 'marker_im',
            'icon-allow-overlap': true
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
      <h6> Broadway sewer main </h6>
      <br>
      <p> Current path of Tibbetts Brook</p>
    `;

    popup = new mapboxgl.Popup({ offset: 10 });

    popup.setLngLat(coordinates)
          .setHTML(popupText)
          .addTo(map);

  });

  map.on('mouseenter', 'putnam_greenway', function(e) {
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.lngLat;
    var popupText=`
     <h6> Proposed greenway </h6>
     <br>
     <p> Proposed daylit path of Tibbetts Brook </p>
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

    if (id==="NY0026131-056"){

       var popupText=`
       <h6> CSO Outfall #56 </h6>
       <br>
       <p> One of the city's largest sources of sewage discharge during storm events. </p>

       `
    } else {

    var popupText=`
      <p> This is CSO ${id}.</p>
    `;
  }

    popup = new mapboxgl.Popup({ offset: 10 });

    popup.setLngLat(coordinates)
          .setHTML(popupText)
          .addTo(map);

  });

  // map.on('mouseenter', 'bx-streams', function(e) {
  //
  //   map.getCanvas().style.cursor = 'pointer';
  //
  //   const coordinates = e.lngLat;
  //   const id = e.features[0].properties.stream_name;
  //
  //
  //   if (id==="tibbetts"){
  //     var popupText=`
  //       <p> <strong> Tibbetts Brook </strong> (historical path)</p>
  //     `;
  //
  //   }  else{
  //     var popupText=`NA`;
  //   }
  //
  //   popup = new mapboxgl.Popup({ offset: 10 });
  //
  //   popup.setLngLat(coordinates)
  //         .setHTML(popupText)
  //         .addTo(map);
  // });

//create a popup function
  function createPopUp(currentFeature) {

    const popUps = document.getElementsByClassName('mapboxgl-popup');
/** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    var name = currentFeature.features[0].properties.name;

    var popupText=`
      <p> <h5> ${name} </h5></p>
    `;

    popup = new mapboxgl.Popup({ offset: 10 });

    popup.setLngLat(currentFeature.lngLat)
          .setHTML(popupText)
          .addTo(map);
    };

//flyTo and cahnge Navbar text function
  function flyToDisplayStory(currentFeature) {

    const coordinates = currentFeature.lngLat;
    const name = currentFeature.features[0].properties.name;
    const desc = currentFeature.features[0].properties.description;
    const photo1 = currentFeature.features[0].properties.image1;
    const photo2 = currentFeature.features[0].properties.image2;
    const link = currentFeature.features[0].properties.link;

    $('#default-sidebar-content').hide();
    $("#variable-sidebar-content").show();

    $("#item1").html(

      `
        <img src= "${photo1}" class="d-block w-100" alt="...">

      `
    );

    $("#item2").html(

      `
        <img src= "${photo2}" class="d-block w-100" alt="...">

      `
    );

    $('.card-body').html(

      `
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${desc}</p>
        <p class="card-text"> ${link} </p>
      </div>
      `
    );



  map.flyTo({
    center: coordinates,
    zoom: 15
  });


};

//when marker is clicked, have navbar text Change and zoom to the location

  map.on('click', 'markers', function(e) {

    flyToDisplayStory(e);

    if(e.features[0].properties.id==='tibbetts'){

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

      map.setLayoutProperty(
        'putnam_greenway',
        'visibility',
        'visible'
      );

      map.flyTo({
        center: e.lngLat,
        zoom: 13
      });

    } else if (e.features[0].properties.id==='newtown') {
      map.setLayoutProperty(
        'CSOs',
        'visibility',
        'visible'
      );

      map.flyTo({
        center: e.lngLat,
        zoom: 13
      });

    } else{
      return;
    };

  });

  // when marker is hovered on, display popup

  map.on('mouseenter', 'markers', function(e) {

    map.getCanvas().style.cursor = 'pointer';

    createPopUp(e);


  });

  // listen for clicks on the flyto buttons
  $('.flyto').on('click', function() {

    if ($(this).hasClass('flyto-minetta')) {

        feature = 'markers'.getElementById('minetta');

        console.log(feature);

      flyToDisplayStory(feature);

      // newCenter = [-73.9101635,40.8822333]




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

  });

// Change it back to a pointer when it leaves.
  map.on('mouseleave', 'sewer', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });


// Change it back to a pointer when it leaves.
  map.on('mouseleave', 'CSOs', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'putnam_greenway', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });


// Change it back to a pointer when it leaves.
  // map.on('mouseleave', 'bx-streams', function(e) {
  //   map.getCanvas().style.cursor = '';
  //   /** remove popups */
  // const popUps = document.getElementsByClassName('mapboxgl-popup');
  // if (popUps[0]) popUps[0].remove();
  // });

// Change it back to a pointer when it leaves.
  map.on('mouseleave', 'markers', function(e) {
    map.getCanvas().style.cursor = '';

      /** remove popups */
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
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



// listen for click on the 'Back to City View' button
$('.reset').on('click', function() {
  map.flyTo({
    center: mapCenter,
    zoom: 11
  });

  $('#default-sidebar-content').show();
  $("#variable-sidebar-content").hide();

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

  map.setLayoutProperty(
    'putnam_greenway',
    'visibility',
    'none'
  );
});



//when the documents loads

$(document).ready(function () {

//set carousel properties
  $("#myCarousel").carousel({

     interval: 4000,
     pause: 'hover',
     ride: true
   });

//hide card/carousel upon loading
  $("#variable-sidebar-content").hide();
});

// var myCarousel = document.querySelector('#myCarousel')
// var carousel = new bootstrap.Carousel(myCarousel, {
//   interval: 2000,
//   wrap: false,
//   pause: true
//
// });




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
