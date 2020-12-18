import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as PortActions from '../../actions/ports.actions.js'
import * as PortReducer from '../../reducers/ports.reducer.js'

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


export default function PortsTable({ tableSize, input }) {
    let ports = useSelector(PortReducer.getPorts)
    const isLoading = useSelector(PortReducer.getIsLoading)
    // const roles = useSelector(RolesReducer.getRoles)
    const dispatch = useDispatch()
    const [currentPorts, setCurrentPorts] = useState(ports)


    useEffect(() => {
        if (input) {
            let filtered = currentPorts.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase()) 
            )
            setCurrentPorts(filtered.filter(x => x !== undefined))
        } else {
            setCurrentPorts(ports.filter(x => x !== undefined))
        }
    }, [input, ports, ports.length])



    if (isLoading && ports.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (ports.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron puertos.</div>
    }

    function destroyPort(PortId) {
        swal({
            title: "¿Está seguro que desea eliminar el puerto?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new PortActions.destroyById(PortId))
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
                    <th>País</th>
                    <th>Puerto</th>
                    <th>Tipo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    currentPorts.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {/* <Link to={"/users/" + item.id + "/edit"}>{item.name}</Link> */}
                                    {item.Country.name}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.type}
                                </td>
                                <td className='d-flex justify-content-center'>
                                    {/* <StatusCheck item={item}></StatusCheck> */}
                                    
                                    <button
                                     onClick={() => history.push(`/ports/${item.id}/edit`)}
                                        className='btn btn-create-user mr-2'>
                                        Editar
                                    </button>

                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyPort(item.id)}>
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

