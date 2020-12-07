export const UPDATE_ONE = '[Notifications] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_SUCCESS = '[Notifications] UPDATE_ONE_SUCCESS';
export function updateOneSucess(notifications){
  return { type: UPDATE_ONE_SUCCESS, notifications }
}


export const DELETE_ONE_SUCCESS = '[Notifications] DELETE_ONE_SUCCESS';
export function deleteOneSucess() {
  return { type: DELETE_ONE_SUCCESS };
}


export function deleteNotification() {
  return async function(dispatch, getState) {
    dispatch(deleteOneSucess());
  };
}

export function updateNotification(message, variant, show=true, autoClose=true) {
  return async function(dispatch, getState) {
    dispatch(updateOneSucess({ message, variant, show }));

    if(autoClose){
      setTimeout(() => dispatch(deleteNotification()), 3000)
    }
  };
}
