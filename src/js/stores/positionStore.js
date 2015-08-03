import L from 'leaflet';
import Store from './store';

class PositionStore extends Store {
  constructor() {
    super();
    this.data = { goToMarker: null };
  }

  updateGoToMarkerPosition(latLng) {
    let marker = this.data.goToMarker;

    if (marker) {
      marker.setLatLng(latLng);
    } else {
      this.initGoToMarker(latLng);
    }
  }

  initGoToMarker(latLng) {
    let options = { radius: 7,
                    weight: '1',
                    color: 'green',
                    opacity: 0.85,
                    fillColor: '#00ff00',
                    fillOpacity: 0.85 };

    let circle = L.circleMarker(latLng, options);
    this.data.goToMarker = circle;
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.GO_TO:
          this.updateGoToMarkerPosition(action.latLng);
          this.emitChange();
          break;
        default:
          break;
      }
    });
  }
}

let positionStore = new PositionStore();
export default positionStore;
