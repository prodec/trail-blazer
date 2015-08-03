import L from 'leaflet';
import $ from 'jquery';
import React from 'react';
import GoogleLeaflet from '../lib/google';
import '../lib/popupLeaflet';
import Actions from '../actions/actions';
import positionStore from '../stores/positionStore';
import modeStore from '../stores/modeStore';
import addMarkerStore from '../stores/addMarkerStore';
import removeMarkerStore from '../stores/removeMarkerStore';
import { EventConstants } from '../constants/constants';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null, set: { 'default-cursor': true, 'crosshair-cursor': false } };
  }

  componentDidMount() {
    this.initMap();
    positionStore.addChangeListener(this.goToPosition);
    modeStore.addChangeListener(this.onChangeCursor);
    addMarkerStore.addChangeListener(this.addMarkerToMap);
    removeMarkerStore.addChangeListener(this.removeMarkerFromMap);
  }

  initMap() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });

    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.setState({ map });
    Actions.addMap(map);
  }

  onChangeCursor = () => {
    let data = modeStore.getState();
    let active = modeStore.getState().active;
    let cursor  = data.modes.get(active).cursor;

    $('.leaflet-container').css('cursor', cursor);
  }

  addMarkerToMap = () => {
    let marker = addMarkerStore.getState().markerToAdd;
    this.addToMap(marker);
  }

  removeMarkerFromMap = () => {
    let marker = removeMarkerStore.getState().markerToRemove;
    this.removeFromMap(marker);
  }

  render() {
    return <div id="map"></div>;
  }

  goToPosition = () => {
    let marker = this.getGoToMarker();

    if (marker) {
      if (!this.hasLayer(marker)) { this.addToMap(marker) }
      this.updateMapCenter(marker.getLatLng());
    }
  }

  getGoToMarker() {
    return positionStore.getState().goToMarker;
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
