import React from 'react';
import GoogleLeaflet from '../lib/google';
<<<<<<< HEAD
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { EventConstants } from '../constants/constants';
=======
import actions from '../actions/actions';
>>>>>>> 240bee6... Adiciona estrutura de stores para mapa e cursores.

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = { map: null };
    this.goToPosition = this.goToPosition.bind(this);
  }

  componentDidMount() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
<<<<<<< HEAD
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });
    map.addLayer(new GoogleLeaflet('SATELLITE'));
    this.setState({ map });
    Actions.addMap(map);
    mapStore.addChangeListener(this.goToPosition, EventConstants.CHANGE_GO_TO);
  }

  shouldComponentUpdate() {
    return false;
=======
    let map = new L.Map('map', { center: new L.LatLng(50.5, 30.5), zoom: 13 })
    map.addLayer(new GoogleLeaflet('SATELLITE'));
    L.marker([50.5, 30.5], { zIndexOffset: 99 }).addTo(map);
    actions.addMap(map);
>>>>>>> 240bee6... Adiciona estrutura de stores para mapa e cursores.
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
