import { Dispatcher } from 'flux';
import assign from 'object-assign';

export default assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});
