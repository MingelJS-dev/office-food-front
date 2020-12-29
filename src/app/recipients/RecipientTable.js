import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as RecipientActions from '../../actions/recipients.actions.js'
import * as RecipientReducer from '../../reducers/recipients.reducer.js'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditRecipientModal from './EditRecipient.js'
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';

import Spinner from '../shared/Spinner.js';


export default function RecipientsTable({ tableSize, input }) {
    let recipients = useSelector(RecipientReducer.getRecipients)
    const isLoading = useSelector(RecipientReducer.getIsLoading)
    // const roles = useSelector(RolesReducer.getRoles)
    const dispatch = useDispatch()
    const [currentRecipient, setCurrentRecipient] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const [currentRecipients, setCurrentRecipients] = useState(recipients)

    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const countries = useSelector(CountryReducer.getFeaturedCountries)

    useEffect(() => {
        if (input) {
            let filtered = currentRecipients.filter(item =>
                item.email.toLowerCase().includes(input.toLowerCase())
            )
            setCurrentRecipients(filtered.filter(x => x !== undefined))
        } else {
            setCurrentRecipients(recipients.filter(x => x !== undefined))
        }
    }, [input, recipients, recipients.length])



    if (isLoading && recipients.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (recipients.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron destinatarios.</div>
    }

    function destroyRecipient(id) {
        swal({
            title: "¿Está seguro que desea eliminar el destinatario?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new RecipientActions.destroyById(id))
                }
            });
    }

    const showModal = (recipient) => {
        setCurrentRecipient(recipient)
        setModalShow(true)
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
                    <th>País</th>
                    <th>Categoría</th>
                    <th>Correo</th>
                    <th>Tipo</th>

                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    currentRecipients.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.Country.name}
                                </td>
                                <td>
                                    {item.Category.name}
                                </td>
                                <td>
                                    {item.email.toLowerCase()}
                                </td>
                                <td>
                                    {item.type}
                                </td>
                                <td className='d-flex justify-content-center'>
                                    <button
                                        onClick={() => showModal(item)}
                                        className='btn btn-create-user mr-2'>
                                        Editar
                                    </button>

                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyRecipient(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <EditRecipientModal show={modalShow}
                onHide={() => setModalShow(false)}
                recipient={currentRecipient} />
        </Table>
    )
}

