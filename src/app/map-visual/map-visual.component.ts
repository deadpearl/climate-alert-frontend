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
    this.getData('2024-01-07').then(resp => {
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
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: [66.9237, 48.0196], // starting position [lng, lat]
      zoom: 4 // starting zoom
    });
  }

  getData(data) {
    return this.api.get(`/internal/api/data/RTData/date/${data}`).toPromise();
    // return this.api.get(`/internal/api/data/RTData/search?year=${year}&month=${month}`).toPromise();
  }
}

