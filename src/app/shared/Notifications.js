import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import { deleteNotification } from '../../actions/notifications.actions';

import {
  getNotificationShow,
  getNotificationMessage,
  getNotificationVariant
} from '../../reducers/notifications.reducer';

const style = {
  position: 'fixed',
  zIndex: 10,
  right: '3%',
  top: '15%'
}

export default function Notification() {
  const show = useSelector(state => getNotificationShow(state));
  const variant = useSelector(state => getNotificationVariant(state));
  const message = useSelector(state => getNotificationMessage(state));

  const dispatch = useDispatch();

  return (
    <Alert
      dismissible
      variant={variant}
      show={show}
      style={style}
      className="shadow"
      onClose={() => dispatch(deleteNotification())}
    >{message}</Alert>
  );
};

// export function AlertFlu({ message }) {
//   return (
//     <script type='module'>
//       { alert(message) }
//     </script>
//   )
// }