import Store from './store';

class MapStore extends Store {
  constructor() {
    super();
    this.data = { map: null };
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.ADD_MAP:
          this.data.map = action.map;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }

}

let mapStore = new MapStore();
export default mapStore;
