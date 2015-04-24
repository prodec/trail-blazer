import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import assign from 'object-assign';

export default assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit('change');
  }
});

dispatcher.register(function(payload){
  console.log(payload);
  return true;
});
