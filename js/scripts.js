
//personal access token for mapboxgl
mapboxgl.accessToken = 'pk.eyJ1IjoicmVuLWhlZ3lpIiwiYSI6ImNremhudTF1eTJjMW0yd2t1NTUzYjN4bmIifQ.IiIyBmQ93k7PgPh0rQrLEg'

//map parameters
var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]
var mapCenter = [-73.9567938, 40.8007976]

//create map
var map = new mapboxgl.Map({
container: 'mapContainer', // HTML container id
style: 'mapbox://styles/mapbox/light-v9', // style URL
center: mapCenter, // starting position as [lng, lat]
maxBounds: nycBounds,
zoom: 11,
// minZoom: 9,
// maxZoom: 14
});


//get markers geojson as a variable. must include all code in {} to be able to call  the variable later
var locations= $.getJSON('data/markers.geojson', function(locations) {

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
        'line-color': '#5F6162',
        'line-width': 2,
        'line-opacity': 1


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
        'line-color': '#5F6162',
        'line-width': 2

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


// add markers layer

    map.loadImage(
      './images/mapbox-marker-icon-20px-pink.png',
      // <i class="fa-solid fa-location-pin"></i>,

      (error, image) => {
        if (error) throw error;

      // Add the image to the map style.
        map.addImage('marker_im', image);

        map.addSource('markers', {
          type: 'geojson',
          data: locations
        });

        console.log(locations)

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
    );

  });


  // create pop up when hovering over  sewer,  greenway, CSO toggleableLayers

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


  //create a popup function for  hovering on markers
  //code inspiration: https://docs.mapbox.com/help/tutorials/building-a-store-locator/
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

  //create popup when hovering over button
  function createPopUpButton(currentFeature) {

      const popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();

      var name = currentFeature.properties.name;

      var popupText=`
        <p> <h5> ${name} </h5></p>
      `;

      popup = new mapboxgl.Popup({ offset: 10 });

      popup.setLngLat(currentFeature.geometry.coordinates)
            .setHTML(popupText)
            .addTo(map);
      };

  //flyTo and change Navbar text function when button is clicked
  function flyToDisplayStoryFromButton(currentFeature) {

    const coordinates = currentFeature.geometry.coordinates;
    const name = currentFeature.properties.name;
    const desc = currentFeature.properties.description;
    const photo1 = currentFeature.properties.image1;
    const photo2 = currentFeature.properties.image2;
    const link = currentFeature.properties.link;

    $('#default-sidebar-content').hide();
    $("#variable-sidebar-content").show();
    $(".sidebar-bottom").show();

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
        <h5 class="card-title"> <a href= ${link} target='_blank' rel='noopener noreferrer'> ${name}</a> </h5>

        <p class="card-text">${desc}</p>
            <p class="card-title"> <a href= ${link} target='_blank' rel='noopener noreferrer'> Learn more </a> </p>
      </div>
      `

    );



  map.flyTo({
    center: coordinates,
    zoom: 14.5
  });


};

  //flyTo and change Navbar text function when marker is clicked
  function flyToDisplayStoryFromMarker(currentFeature) {

    const coordinates = currentFeature.lngLat;
    const name = currentFeature.features[0].properties.name;
    const desc = currentFeature.features[0].properties.description;
    const photo1 = currentFeature.features[0].properties.image1;
    const photo2 = currentFeature.features[0].properties.image2;
    const link = currentFeature.features[0].properties.link;

    $('#default-sidebar-content').hide();
    $("#variable-sidebar-content").show();
    $(".sidebar-bottom").show();

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
        <h5 class="card-title"> <a href= ${link} target='_blank' rel='noopener noreferrer'> ${name}</a> </h5>

        <p class="card-text">${desc}</p>

        <p class="card-title"> <a href= ${link} target='_blank' rel='noopener noreferrer'> Learn more </a> </p>
      </div>
      `

    );



  map.flyTo({
    center: coordinates,
    zoom: 14.5
  });


};

  //call flyTo and change Navbar text function when marker is clicked
  map.on('click', 'markers', function(e) {

    flyToDisplayStoryFromMarker(e);

//turn on/off relevant layers
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
      return;
    };

  });

  // call display popup function when marker is hovered on
  map.on('mouseenter', 'markers', function(e) {

    map.getCanvas().style.cursor = 'pointer';

    createPopUp(e);

  });

  //call flyTo and change Navbar text function when button is clicked
  $('.flyto').on('click', function() {

    //give an id to each button that links it to a feature in the markers layer, and pull the associated feature
    if ($(this).hasClass('flyto-broad')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'broad'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-maiden')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'maiden'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-collect')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'collect'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-montayne')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'montayne'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-east')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'east'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-west')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'west'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-brook')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'brook'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-tiemann')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'tiemann'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-sunfish')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'sunfish'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-minetta')) {

        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'minetta'
          });

        flyToDisplayStoryFromButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-tibbetts')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'tibbetts'
          });

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

      flyToDisplayStoryFromButton(currentFeature);

      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 13
      });
    }

    else if ($(this).hasClass('flyto-newtown')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'newtown'
          });

      map.setLayoutProperty(
        'CSOs',
        'visibility',
        'visible'
      );

      flyToDisplayStoryFromButton(currentFeature);

      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 13
      });
    }


  });

  // display popup when hovering on a button
  $('.flyto').on('mouseenter', function() {

    if ($(this).hasClass('flyto-broad')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'broad'
          });

        createPopUpButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-maiden')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'maiden'
          });

        createPopUpButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-collect')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'collect'
          });

        createPopUpButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-montayne')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'montayne'
          });

        createPopUpButton(currentFeature);
    }


    else if ($(this).hasClass('flyto-minetta')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'minetta'
          });

        createPopUpButton(currentFeature);
    }

    else if ($(this).hasClass('flyto-tibbetts')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'tibbetts'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-newtown')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'newtown'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-east')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'east'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-west')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'west'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-brook')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'brook'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-tiemann')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'tiemann'
          });

      createPopUpButton(currentFeature);

    }

    else if ($(this).hasClass('flyto-sunfish')) {


        currentFeature = locations.features.find(
          function(feature) {
            return feature.properties.id === 'sunfish'
          });

      createPopUpButton(currentFeature);

    }

  });

  //remove popup when no longer hoveing on fly-to buttons
  $('.flyto').on('mouseleave', function() {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    });

// Cremove popup and change cursor back to hand when it leaves a layer
  map.on('mouseleave', 'sewer', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });

  map.on('mouseleave', 'CSOs', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });

  map.on('mouseleave', 'putnam_greenway', function(e) {
    map.getCanvas().style.cursor = '';
    /** remove popups */
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  });

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
      } else if (id==='500flood') {
        link.textContent='500 year floodplain';
        link.className = 'none';
      } else {
        return;
      }



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



// listen for click on the 'Back to City View' button and hide/show content as appropriate
$('.reset').on('click', function() {
  map.flyTo({
    center: mapCenter,
    zoom: 11
  });

  $('#default-sidebar-content').show();
  $("#variable-sidebar-content").hide();
  $(".sidebar-bottom").hide();

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



//when the documents loads, hide/show appropriate content
$(document).ready(function () {

  //set carousel properties
  $("#myCarousel").carousel({

     interval: 4000,
     pause: 'hover',
     ride: true
   });

//hide card/carousel upon loading
  $("#variable-sidebar-content").hide();
  $(".sidebar-bottom").hide();

});

});
