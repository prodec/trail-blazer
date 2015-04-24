import dispatcher from '../dispatcher/dispatcher';
import constants from '../constants/constants';

export default {
  addItem: function(item){
    dispatcher.handleViewAction({
      actionType: constants.ADD_ITEM,
      item: item
    })
  }
}
