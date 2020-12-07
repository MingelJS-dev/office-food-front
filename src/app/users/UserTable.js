import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as UserActions from '../../actions/users.actions.js'
import * as UserReducer from '../../reducers/users.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditUserModal from './EditUser.js'
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';

import Spinner from '../shared/Spinner.js';

// function StatusCheck({ item }) {
//   const dispatch = useDispatch()
//   const isLoading = useSelector(state => UserReducer.getIsLoadingById(state, item.id))

//   function toggle() {
//     const status = !item.deleted_at ? 'disable' : 'enable'
//     dispatch(UserActions.updateUserStatus(item.id, status))
//   }

//   let label = item.deleted_at ? 'Deshabilitado' : 'Habilitado'

//   if (isLoading) {
//     label = 'Actualizando...'
//   }

//   return (
//     <Form.Check
//       type="switch"
//       className="user-status-check"
//       disabled={isLoading}
//       id={`sw-${item.id}`}
//       label={label}
//       checked={!item.deleted_at}
//       onChange={() => toggle()}
//     />
//   )
// }

export default function UsersTable({ tableSize, input }) {
    let users = useSelector(UserReducer.getUsers)
    const isLoading = useSelector(UserReducer.getIsLoading)
    // const roles = useSelector(RolesReducer.getRoles)
    const dispatch = useDispatch()
    const [currentUsers, setCurrentUsers] = useState(users)
    const [modalShowUser, setModalShowUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        if (input) {
            let filtered = currentUsers.filter(item =>
                item.first_name.toLowerCase().includes(input.toLowerCase()) ||
                item.last_name.toLowerCase().includes(input.toLowerCase())
            )
            setCurrentUsers(filtered.filter(x => x !== undefined))
        } else {
            setCurrentUsers(users.filter(x => x !== undefined))
        }
    }, [input, users, users.length])



    if (isLoading && users.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (users.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron usuarios</div>
    }

    function destroyUser(UserId) {
        swal({
            title: "¿Está seguro que desea eliminar el usuario?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new UserActions.destroyUserById(UserId))
                }
            });
    }

    const showModal = (user) => {
        setCurrentUser(user)
        setModalShowUser(true)
    }

    return (
        <Table
            striped
            bordered
            hover
            className={`mb-0 ${tableSize ? 'table-sm' : ''}`}
        >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    currentUsers.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {/* <Link to={"/users/" + item.id + "/edit"}>{item.name}</Link> */}
                                    {item.first_name + ' ' + item.last_name}
                                </td>
                                <td>
                                    {item.email.toLowerCase()}
                                </td>
                                <td>
                                    {item.UserRoles[0].Role.name}
                                </td>
                                <td className='d-flex justify-content-center'>
                                    {/* <StatusCheck item={item}></StatusCheck> */}
                                    <button
                                        onClick={() => showModal(item)}
                                        className='btn btn-create-user mr-2'>
                                        Editar
                                    </button>

                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyUser(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <EditUserModal show={modalShowUser}
                onHide={() => setModalShowUser(false)}
                user={currentUser} />
        </Table>
    )
}

