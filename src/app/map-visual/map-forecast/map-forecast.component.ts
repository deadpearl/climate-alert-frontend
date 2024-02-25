import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {HttpClient} from '@angular/common/http';
import {ModalService} from '../../service/modal.service';


@Component({
  selector: 'app-map-forecast',
  templateUrl: './map-forecast.component.html',
  styleUrls: ['./map-forecast.component.css']
})



export class MapForecastComponent implements OnInit {
  @ViewChild('mapContainer', {static: true}) mapContainer: ElementRef;
  map: mapboxgl.Map;
  region: any = null;
  regionObject: any = null;
  dateFrom: any = null;
  dateTo: any = null;
  dangerLevelFrom: any = null;
  dangerLevelTo: any = null;

  constructor(private api: HttpClient, private modalService: ModalService) {
  }

  markersData: any = null;
  markers: mapboxgl.Marker[] = [];

  ngOnInit() {
    this.getCurrentDate();
    this.initializeMap();
    // this.getData('2024-01-07').then(resp => {
    //   this.markersData = resp;
    //   console.log(this.markersData[0].latitude);
    //   const markers = []; // массив для хранения маркеров
    //   // tslint:disable-next-line:prefer-for-of
    //   for (let i = 0; i < this.markersData.length; i++) {
    //     const marker = this.markersData[i];
    //     const latitude = parseFloat(marker.latitude);
    //     const longitude = parseFloat(marker.longitude);
    //
    //     const popup = new mapboxgl.Popup()
    //       .setHTML(`
    //     <div class='fire-info' >
    //       <div style='color: red;'><strong>Date:</strong> ${marker.acqDate}</div>
    //       <div><strong>Time:</strong> ${marker.acqTime}</div>
    //     </div>
    //   `);
    //     new mapboxgl.Marker()
    //       .setLngLat([longitude, latitude])
    //       .setPopup(popup)
    //       .addTo(this.map);
    //     markers.push(marker);
    //
    //   }
    // });
  }
  getCurrentDate(): void {
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0];
    this.dateFrom = isoDate;
  }
  getData(data) {
    return this.api.get(`/internal/api/data/RTData/date/${data}`).toPromise();
    // return this.api.get(`/internal/api/data/RTData/search?year=${year}&month=${month}`).toPromise();
  }

  changeRegion() {
    this.modalService.selectRegionModal('Region', 'Regions').then(result => {
      console.log('Modal closed with result:', result);
      this.region = result.name;
      this.regionObject = result;
    })
      .catch(error => {
        console.log('Modal dismissed with result:', error);
      });
  }
  formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  search() {
    this.initializeMap();
    const fireDataDTO = {
      latitude: this.regionObject === null ? null : this.regionObject.latitude,
      longitude: this.regionObject === null ? null : this.regionObject.longitude, // Fix typo in longitude
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      dangerLevelFrom: this.dangerLevelFrom,
      dangerLevelTo: this.dangerLevelTo
    };

    this.api.post(`/internal/api/data/ForecastData/getByFilter`, fireDataDTO).toPromise().then(resp => {
      this.markersData = resp;

      // Clear existing markers
      // this.map.remove();

      // Add new markers
      this.markersData.forEach(marker => {

        const latitude = parseFloat(marker.stationId.latitude);
        const longitude = parseFloat(marker.stationId.longitude);
        console.log(latitude);
        console.log(longitude);
        const popup = new mapboxgl.Popup()
          .setHTML(`
            <div class='fire-info' style='padding: 10px'>
              <div><strong>Date:</strong> ${this.formatDate(marker.time)}</div>
              <div><strong>DangerLevel:</strong> ${marker.dangerLevel}</div>
              <div><strong>Weather:</strong> ${marker.weatherId.temp} C</div>
            </div>
          `);

        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker'; // Apply custom CSS class
        markerElement.style.width = '12px'; // Set width
        markerElement.style.height = '12px'; // Set height
          markerElement.style.backgroundColor = '#F77E21'; // Set background color

        markerElement.style.borderRadius = '50%'; // Make it round (for circular shape)
        new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map);
      });
    }).catch(error => {
      console.error('Error fetching markers:', error);
    });
  }

  reset() {
    this.dateFrom = null;
    this.dateTo = null;
    this.regionObject = null;
    this.region = null;
    this.initializeMap();
  }

  initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVhZHBlYXJsIiwiYSI6ImNscGlibTE5eDBhZTgycXQ3c2Voa3lubjIifQ.P2SFPkK1FaRDrzfwcDGNAA';

    // Initialize the map
    this.map = new mapboxgl.Map({
      container: 'map', // Specify your container ID
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [66.9237, 48.0196], // Initial center of the map
      zoom: 2 // Initial zoom level
    });

    // this.map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
    //   center: [66.9237, 48.0196], // starting position [lng, lat]
    //   zoom: 10 // starting zoom
    // });
  }
}

