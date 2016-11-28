import 'leaflet';
import {Component, OnInit} from '@angular/core';
import {PositionService} from './positon/position.service';
import {Position} from './positon/position.model';
import {Observable} from "rxjs";
import {Marker} from './marker/marker.model';

@Component({
  selector: 'my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css'],
})
export class MyMapComponent implements OnInit {
  private map;
  private markers = new Array<Marker>();
  private errorMessage: string;
  private editUrl = "https://www.openstreetmap.org/edit?editor=id#map=18/";

  constructor(private positionService: PositionService) {
  }


  ngOnInit() {
    this.map = L.map('map').setView([46.885389, 8.288051], 9);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(this.map);
    this.getPositions();
    this.pollPositions();
  }

  pollPositions() {
    Observable.interval(60000)
      .subscribe(() => this.getPositions());
  }

  getPositions() {
    this.positionService.getPositions()
      .subscribe(
        positons => this.addPositions(positons),
        error => this.errorMessage = <any>error);
  }


  addPositions(positions) {
    if (positions.length > 0) {
      this.addMarkers(positions);
    }
  }


  addMarkers(positions) {
    for (var i in positions) {
      this.addMarkerIfNotExist(positions[i]);
    }
  }

  addMarkerIfNotExist(position) {
    if (!this.doesMarkerExists(position)) {
      let leafletMarker = L.marker([position.latitude, position.longitude]);
      this.markers.push(new Marker(leafletMarker, position));
      this.map.addLayer(leafletMarker);
    }
  }

  doesMarkerExists(position): boolean {
    return this.getMarkerBy(position) != null;
  }

  getMarkerBy(position) {
    for (var i in this.markers) {
      let marker = this.markers[i];
      if (marker.position.latitude == position.latitude && marker.position.longitude == position.longitude) {
        return marker;
      }
    }
    return null;
  }

  goToPosition(position) {
    this.map.setView([position.latitude, position.longitude], 18);
    this.setColor(position);
  }

  editInID(position) {
    let url = this.editUrl + position.latitude + "/" + position.longitude + "/";
    let win = window.open(url, '_blank');
    win.focus();
    this.setColor(position);
  }

  setColor(position) {
    for (var i in this.markers) {
      if (position == this.markers[i].position) {
        this.markers[i].color = "#ADD7EF";
      } else {
        this.markers[i].color = "white";
      }

    }
  }

  downloadAllPositions() {
    var json = '{"crosswalks": [';
    for (var i in this.markers) {
      json += '{"latitude": ' + this.markers[i].position.latitude + ', "longitude": ' + this.markers[i].position.longitude + '},';
    }
    json = json.slice(0, -1);
    json += ']}';
    var a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    return function () {
      let blob = new Blob([json], {type: "octet/stream"});
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'coordinates.json';
      a.click();
      window.URL.revokeObjectURL(url);
    }();

  }
}
