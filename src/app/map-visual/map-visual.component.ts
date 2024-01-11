import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-map-visual',
  templateUrl: './map-visual.component.html',
  styleUrls: ['./map-visual.component.css']
})



export class MapVisualComponent implements OnInit {
  @ViewChild('mapContainer', {static: true}) mapContainer: ElementRef;
  map: mapboxgl.Map;

  constructor(private api: HttpClient) {
  }

  markersData: any = null;
  markers: mapboxgl.Marker[] = [];

  ngOnInit() {
    this.getData('2023-12-07').then(resp => {
      this.markersData = resp;
      console.log(this.markersData[0].latitude);
      const markers = []; // массив для хранения маркеров
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.markersData.length; i++) {
        const marker = this.markersData[i];
        const latitude = parseFloat(marker.latitude);
        const longitude = parseFloat(marker.longitude);

        const popup = new mapboxgl.Popup()
          .setHTML(`
        <div class='fire-info' >
          <div style='color: red;'><strong>Date:</strong> ${marker.acqDate}</div>
          <div><strong>Time:</strong> ${marker.acqTime}</div>
        </div>
      `);
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map);
        markers.push(marker);

      }
    });
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVhZHBlYXJsIiwiYSI6ImNscGlibTE5eDBhZTgycXQ3c2Voa3lubjIifQ.P2SFPkK1FaRDrzfwcDGNAA';
    // const map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //   center: [66.9237, 48.0196], // starting position [lng, lat]
    //   zoom: 4 // starting zoom
    // });


    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: [66.9237, 48.0196], // starting position [lng, lat]
      zoom: 4 // starting zoom
    });
    //
    // map.on('load', () => {
    //   // When the map loads, add the data from the USGS earthquake API as a source
    //   map.addSource('earthquakes', {
    //     type: 'geojson',
    //     // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //     data: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&minmagnitude=1&starttime=2023-12-01T16:31:47`,
    //     generateId: true // This ensures that all features have unique IDs
    //   });
    // });
    //
    // // Add earthquakes as a layer and style it
    // map.addLayer({
    //   id: 'earthquakes-viz',
    //   type: 'circle',
    //   source: 'earthquakes',
    //   paint: {
    //     // The feature-state dependent circle-radius expression will render
    //     // the radius size according to its magnitude when
    //     // a feature's hover state is set to true
    //     'circle-radius': [
    //       'case',
    //       ['boolean', ['feature-state', 'hover'], false],
    //       [
    //         'interpolate',
    //         ['linear'],
    //         ['get', 'mag'],
    //         1,
    //         8,
    //         1.5,
    //         10,
    //         2,
    //         12,
    //         2.5,
    //         14,
    //         3,
    //         16,
    //         3.5,
    //         18,
    //         4.5,
    //         20,
    //         6.5,
    //         22,
    //         8.5,
    //         24,
    //         10.5,
    //         26
    //       ],
    //       5
    //     ],
    //     'circle-stroke-color': '#000',
    //     'circle-stroke-width': 1,
    //     // The feature-state dependent circle-color expression will render
    //     // the color according to its magnitude when
    //     // a feature's hover state is set to true
    //     'circle-color': [
    //       'case',
    //       ['boolean', ['feature-state', 'hover'], false],
    //       [
    //         'interpolate',
    //         ['linear'],
    //         ['get', 'mag'],
    //         1,
    //         '#fff7ec',
    //         1.5,
    //         '#fee8c8',
    //         2,
    //         '#fdd49e',
    //         2.5,
    //         '#fdbb84',
    //         3,
    //         '#fc8d59',
    //         3.5,
    //         '#ef6548',
    //         4.5,
    //         '#d7301f',
    //         6.5,
    //         '#b30000',
    //         8.5,
    //         '#7f0000',
    //         10.5,
    //         '#000'
    //       ],
    //       '#000'
    //     ]
    //   }
    // });
    //
    // let quakeID = null;
    //
    // map.on('mousemove', 'earthquakes-viz', (event) => {
    //   map.getCanvas().style.cursor = 'pointer';
    //   // Set variables equal to the current feature's magnitude, location, and time
    //   const quakeMagnitude = event.features[0].properties.mag;
    //   const quakeLocation = event.features[0].properties.place;
    //   const quakeDate = new Date(event.features[0].properties.time);
    //
    //   if (event.features.length === 0) { return; }
    //   // Display the magnitude, location, and time in the sidebar
    //   document.getElementById('mag').textContent = quakeMagnitude;
    //   document.getElementById('loc').textContent = quakeLocation;
    //   document.getElementById('date').textContent = quakeDate.toISOString();
    //
    //   // When the mouse moves over the earthquakes-viz layer, update the
    //   // feature state for the feature under the mouse
    //   if (quakeID) {
    //     map.removeFeatureState({
    //       source: 'earthquakes',
    //       id: quakeID
    //     });
    //   }
    //
    //   quakeID = event.features[0].id;
    //
    //   map.setFeatureState(
    //     {
    //       source: 'earthquakes',
    //       id: quakeID
    //     },
    //     {
    //       hover: true
    //     }
    //   );
    // });
    //
    // // When the mouse leaves the earthquakes-viz layer, update the
    // // feature state of the previously hovered feature
    // map.on('mouseleave', 'earthquakes-viz', () => {
    //   if (quakeID) {
    //     map.setFeatureState(
    //       {
    //         source: 'earthquakes',
    //         id: quakeID
    //       },
    //       {
    //         hover: false
    //       }
    //     );
    //   }
    //   quakeID = null;
    //   // Remove the information from the previously hovered feature from the sidebar
    //   document.getElementById('mag').textContent = '';
    //   document.getElementById('loc').textContent = '';
    //   document.getElementById('date').textContent = '';
    //   // Reset the cursor style
    //   map.getCanvas().style.cursor = '';
    // });

    //   const marker = new mapboxgl.Marker()
    //     .setLngLat([66.9237, 48.0196]) // Marker coordinates [longitude, latitude]
    //     .addTo(this.map);
    // }
  }

  getData(data) {
    return this.api.get(`/api/data/RTData/date/${data}`).toPromise();
  }
}

