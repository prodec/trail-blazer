import L from 'leaflet';
import $ from 'jquery';
import React from 'react';
import GoogleLeaflet from '../lib/google';
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { EventConstants } from '../constants/constants';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null, set: { 'default-cursor': true, 'crosshair-cursor': false } };
    this.goToPosition = this.goToPosition.bind(this);
    this.onChangeCursor = this.onChangeCursor.bind(this);
  }

  componentDidMount() {
    this.initMap();
    mapStore.addChangeListener(this.goToPosition, EventConstants.CHANGE_GO_TO);
    mapStore.addChangeListener(this.onChangeCursor, EventConstants.CHANGE_CURSOR);
    mapStore.addChangeListener(this.addMarkerToMap, EventConstants.ADD_MARKER);
  }

  initMap() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });

    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.setState({ map });
    Actions.addMap(map);
  }

  // Leaflet already manipulate the map class names, so you can't change the map
  // class set or the map don't will work properly, this is why jquery is used.
  onChangeCursor() {
    $('.leaflet-container').css('cursor', mapStore.getState().cursor);
  }

  addMarkerToMap() {
    let data = this.getState();
    let marker = data.marker;
    let map = data.map;

    marker.addTo(map);
  }

  render() {
    return <div id="map"></div>;
  }

  goToPosition() {
    let marker = this.getGoToMarker();
    if (marker) {
      if (!this.hasLayer(marker)) { this.addToMap(marker); }
      this.updateMapCenter(marker.getLatLng());
    }
  }

  getGoToMarker() {
    return mapStore.getState().goToMarker;
  }

  hasLayer(layer) {
    this.state.map.hasLayer(layer);
  }

  addToMap(layer) {
    this.state.map.addLayer(layer);
  }

  updateMapCenter(latlng) {
    this.state.map.setView(latlng);
  }
}
