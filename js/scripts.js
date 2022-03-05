
  mapboxgl.accessToken = 'pk.eyJ1IjoicmVuLWhlZ3lpIiwiYSI6ImNremhudTF1eTJjMW0yd2t1NTUzYjN4bmIifQ.IiIyBmQ93k7PgPh0rQrLEg'

  var mapCenter = [-73.842989, 40.824015]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: mapCenter, // starting position as [lng, lat]
    zoom: 14,
    // minZoom: 9,
    // maxZoom: 14
  });

$.getJSON('data/zerega-fleet-locations.json', function(locations) {
  console.log(locations)

  // now add markers for all fleet locations
  locations.forEach(function(location) {
    var popup = new mapboxgl.Popup({ offset: 40 })
      .setHTML(`
        <p> <strong> Address: </strong>${location.address} </p>
        <p> <strong> Site name: </strong>${location.name} </p>
        <p> <strong> Fleet Size: </strong> ${location.fleet_size} </p>
        <p> To electrify the <strong>${location.type}</strong> fleet parked at this location, there must be electrical infrastructure available to serve <strong>${location.estimated_demand_mva} MVA</strong> of additional demand.</p>
      `);

    // default is purple for "multiple" fleet type
    var color = 'purple'

    if (location.fleet_type === 'School Bus') {
      color = '#FFD800'
    }

    if (location.fleet_type === 'Public Refuse Truck') {
      color = '#19601B'
    }

    new mapboxgl.Marker({
      color: color
    })
      .setLngLat([location.gps_longitude, location.gps_latitude])
      .setPopup(popup)
      .addTo(map);
  })


})

//load substation data
// Data was created using geojson.io based on the author's personal knowledge

  map.on("load", function () {

    map.addSource('substation-shapes', {
      type: 'geojson',
      data: './data/substations.geojson'
    });

    map.addLayer({
      id: 'ss',
      type: 'fill',
      source: 'substation-shapes',
      paint: {
        'fill-color': '#38A1B8',
      }
    });

//create pop up for substations
    map.on('click', 'ss', function(e) {

      const coordinates = e.lngLat;
      const name = e.features[0].properties.name;
      const voltage = e.features[0].properties.voltage;
      const capacity = e.features[0].properties.capacity;

      const popupText=`
        <p> <strong>${name}</strong> substation supplies electricity at the <strong>${voltage} kV </strong> voltage level. The estimated remaining capacity at this substation is <strong>${capacity} MVA </strong>.</p>
      `;

      new mapboxgl.Popup({ offset: 10 })
        .setLngLat(coordinates)
        .setHTML(popupText)
        .addTo(map);

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'ss', function(e) {
        map.getCanvas().style.cursor = 'pointer';
      });

    // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'ss', function(e) {
        map.getCanvas().style.cursor = '';
      });

})

//fly to Parkchester substation

$('#fly-to-parkchester').on('click', function() {
    // when this is clicked, let's fly the map to Midtown Manhattan
    map.flyTo({
      center: [
        -73.86381983757019,
        40.84190654963416
      ],
      zoom: 14,
    })

  })


//legend

//define layer names for legend
const layers = [

'Sanitation Fleet',
'School Bus Fleet',
'Other Fleet',
'Substation'
];
const colors = [
'#19601B',
'#FFD800',
'purple',
'#38A1B8'
];

// create legend. Source: https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/#add-a-legend
const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});
