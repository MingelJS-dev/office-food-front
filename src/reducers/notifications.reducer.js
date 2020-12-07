import * as NotificationActions from '../actions/notifications.actions.js';

const INITIAL_STATE = {
  entity: {show: false},
  id: ''
};

export default function notification(state = INITIAL_STATE, action) {
  switch(action.type){
  case NotificationActions.DELETE_ONE_SUCCESS:
    return {
      entity: {
        message: '',
        show: false,
        variant: ''
      },
      id: ''
    };

  case NotificationActions.UPDATE_ONE_SUCCESS:
    return {
      entity: action.notifications,
      id: `${action.notifications.message}-${action.notifications.variant}-${action.notifications.show}`
    };

  default:
    return state;
  }
};


export const getNotificationShow = (state) => {
  return state.notifications.entity.show;
};

export const getNotificationMessage = (state) => state.notifications.entity.message;
export const getNotificationVariant = (state) => state.notifications.entity.variant;
