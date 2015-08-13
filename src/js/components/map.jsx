import L from 'leaflet';
import $ from 'jquery';
import React from 'react';
import GoogleLeaflet from '../lib/google';
import '../lib/popupLeaflet';
import Actions from '../actions/actions';
import goToPositionStore from '../stores/goToPositionStore';
import modeStore from '../stores/modeStore';
import markerStore from '../stores/markerStore'
import addMarkerStore from '../stores/addMarkerStore';
import removeMarkerStore from '../stores/removeMarkerStore';
import { EventConstants, SettingConstants } from '../constants/constants';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null, set: { 'default-cursor': true, 'crosshair-cursor': false } };
  }

  componentDidMount() {
    this.initMap();
    goToPositionStore.addChangeListener(this.goToPosition);
    modeStore.addChangeListener(this.onChangeMode);
    addMarkerStore.addChangeListener(this.addMarkerToMap);
    removeMarkerStore.addChangeListener(this.removeMarkerFromMap);
  }

  render() {
    return <div id="map"></div>;
  }

  initMap() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';

    let center = new L.LatLng(51.51, -0.11);
    let map = new L.Map('map', { center, zoom: SettingConstants.ZOOM });

    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.addMapListeners(map);
    this.initMapCenter(map);
    this.setState({ map });
    Actions.addMap(map);
    Actions.mouseMoveOnMap(center);
  }

  addMapListeners(map) {
    map.on('moveend', () => { Actions.registerMapCenter(this.state.map.getCenter()); });
    map.on('mousemove', (e) => { Actions.mouseMoveOnMap(e.latlng); });
  }

  initMapCenter(map, center) {
    map.once('locationerror', () => { this.updateMapCenter(center); });
    map.locate({ setView: true, maxZoom: SettingConstants.ZOOM });
  }

  onChangeMode = () => {
    let data = modeStore.getState();
    let active = modeStore.getState().active;
    let cursor = data.modes.get(active).cursor;

    $('.leaflet-container').css('cursor', cursor);
  }

  addMarkerToMap = () => {
    let marker = addMarkerStore.getState().markerToAdd;

    this.addToMap(marker);
  }

  removeMarkerFromMap = () => {
    let marker = removeMarkerStore.getState().markerToRemove;
    let data = markerStore.getState();

    this.removeFromMap(marker);
  }

  render() {
    return <div id="map"></div>;
  }

  goToPosition = () => {
    let marker = this.getGoToMarker();

    if (marker) {
      if (!this.hasLayer(marker)) { this.addToMap(marker); }
      this.updateMapCenter(marker.getLatLng());
    }
  }

  getGoToMarker() {
    return goToPositionStore.getState().goToMarker;
  }

  hasLayer(layer) {
    this.state.map.hasLayer(layer);
  }

  addToMap(layer) {
    this.state.map.addLayer(layer);
  }

  removeFromMap(marker) {
    this.state.map.removeLayer(marker);
  }

  updateMapCenter(latLng) {
    this.state.map.setView(latLng);
  }
}
