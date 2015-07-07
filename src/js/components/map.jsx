import React from 'react';
import GoogleLeaflet from '../lib/google';
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { EventConstants } from '../constants/constants';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null };
    this.goToPosition = this.goToPosition.bind(this);
  }

  componentDidMount() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });
    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.setState({ map });
    Actions.addMap(map);
    mapStore.addChangeListener(this.goToPosition, EventConstants.CHANGE_GOTO);
  }

  shouldComponentUpdate() {
    return false;
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
