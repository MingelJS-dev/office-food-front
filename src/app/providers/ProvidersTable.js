import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as ProviderActions from '../../actions/provider.actions.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';

import Spinner from '../shared/Spinner.js';


export default function ProvidersTable({ tableSize, input }) {
    let providers = useSelector(ProviderReducer.getProviders)
    const isLoading = useSelector(ProviderReducer.getIsLoading)
    // const roles = useSelector(RolesReducer.getRoles)
    const dispatch = useDispatch()
    const [currentProviders, setCurrentProviders] = useState(providers)


    useEffect(() => {
        console.log(input)
        if (input) {
            let filtered = currentProviders.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase()) 
            )
            setCurrentProviders(filtered.filter(x => x !== undefined))
        } else {
            setCurrentProviders(providers.filter(x => x !== undefined))
        }
    }, [input, providers, providers.length])



    if (isLoading && providers.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (providers.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron proveedores</div>
    }

    function destroyProvider(ProviderId) {
        swal({
            title: "¿Está seguro que desea eliminar el proveedor?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new ProviderActions.destroyById(ProviderId))
                }
            });
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
                    <th>Contacto</th>
                    <th>Correo Contacto</th>
                    <th>Instrumento de pago</th>
                    <th>Plazo pago</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentProviders.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {/* <Link to={"/users/" + item.id + "/edit"}>{item.name}</Link> */}
                                    {item.name}
                                </td>
                                <td>
                                    {item.contact}
                                </td>
                                <td>
                                    {item.contactEmail.toLowerCase()}
                                </td>
                                <td>
                                    {item.paymentInstrument}
                                </td>
                                <td>
                                    {item.paymentDeadline}
                                </td>
                                <td className='d-flex justify-content-center'>
                                    {/* <StatusCheck item={item}></StatusCheck> */}
                                    
                                    <button
                                     onClick={() => history.push(`/providers/${item.id}/edit`)}
                                        className='btn btn-create-user mr-2'>
                                        Editar
                                    </button>

                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyProvider(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

