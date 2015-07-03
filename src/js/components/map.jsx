import React from 'react';
import GoogleLeaflet from '../lib/google';
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { EventConstants } from '../constants/constants';
import classNames from 'classnames';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null, set: { 'default-cursor': true, 'crosshair-cursor': false } };
    this.goToPosition = this.goToPosition.bind(this);
    this._onChangeCursor = this._onChangeCursor.bind(this);
  }

  componentDidMount() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });

    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.setState({ map });
    Actions.addMap(map);
    mapStore.addChangeListener(this.goToPosition, EventConstants.CHANGE_GO_TO);
    mapStore.addChangeListener(this._onChangeCursor, constants.CHANGE_CURSOR);
  }

  /* Leaflet already manipulate the map class names, so you can't change the map
     class set, this is why jquery is used. */
  _onChangeCursor(e) {
    $('.leaflet-container').css('cursor', mapStore.getState().cursor);
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

  updateMapCenter(latlon) {
    this.state.map.setView(latlon);
  }
}
