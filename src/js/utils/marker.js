import L from 'leaflet';
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { ModeConstants } from '../constants/constants';

export default class Marker {
  constructor(latLng, icon) {
    this.icon = icon;
    let options = {
      icon,
      draggable: true
    }
    let marker = new L.Marker(latLng, options);
    return this.withHooks(marker);
  }

  static idOnMap(marker) {
    return L.stamp(marker);
  }

  withHooks(marker) {
    let iconMargin = 0; 
    let icon = this.icon;
    let mode;
    let map = mapStore.getState().map;

    marker.on('click', (e) => {
      e.target.getPopup()._isOpen = false;
      $(e.target.getPopup()._container).css('display', 'block');
    })

    marker.on('add', () => {
      $('.leaflet-popup').css('display', 'none')
    });

    marker.on('dragstart', (e) => {
      let icon = e.target._icon; 

      mode = mapStore.getState().mode;
      Actions.changeMode(ModeConstants.VIEW_MODE);

      if (!iconMargin) {
        iconMargin = parseInt(L.DomUtil.getStyle(icon, 'marginTop'));
      }
    
      icon.style.marginTop = `${iconMargin - 15}px`;
    });

    marker.on('dragend', (e) => {
      let map = mapStore.getState().map;
      e.target._icon.style.marginTop = `${iconMargin}px`;

      map.once('click', () => {
        Actions.changeMode(mode);
      })
    });

    return marker;
  }
}
