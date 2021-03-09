import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

import * as PortReducer from '../../reducers/ports.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as DestinationReducer from '../../reducers/destinations.reducer.js'

import * as DestinationActions from '../../actions/destinations.actions.js'

import Table from 'react-bootstrap/Table';

export default function NewDestinationForm({ destinations, port, saveDestination}) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({})
    const [currentPort, setCurrentPort] = useState([])
    const [Ids, setIds] = useState([])
    const [destination, setDestination] = useState([])
    const [DestinationsIds, setDestinationIds] = useState([])
    const [CountryId, setCountryId] = useState([])
    const [currentDestination, setCD] = useState([])
    const [input, setInput] = useState('');
    const countries = useSelector(CountryReducer.getCountries)
    const ports = useSelector(PortReducer.getPorts)
    const dest = useSelector(DestinationReducer.getDestinations)

    const updateSearch = async (input) => {
        setInput(input)
    }

    useEffect(() => {
        let ids = dest.filter(item => item.OriginId === port.id).map(x => x.PortId)
        setIds(ids)
        setCD(ports.filter(x => ids.includes(x.id)))
    }, [dest, dest.length]);

    useEffect(() => {
        setCurrentPort(ports.filter(x => x.CountryId === parseInt(CountryId)
            && x.id !== port.id && !DestinationsIds.includes(x.id)))
    }, [DestinationsIds, DestinationsIds.length]);

    const selectCountry = (id) => {
        setCurrentPort(ports.filter(x => x.CountryId === parseInt(id)
            && x.id !== port.id && !Ids.includes(x.PortId)))
        setCountryId(id)
    }

    const selectDestination = (id) => {
        let [data] = ports.filter(x => x.id === parseInt(id))
        let PortIds = [...DestinationsIds, parseInt(id)]

        const arrayData = [...destination,
        {
            ...data,
            // OriginId: port.id,
            PortId: data.id,
            trantitionDays: 0
        }
        ]

        setDestinationIds(PortIds)
        setDestination(arrayData)
    }

    const updateDestination = (id) => {
        let  PortIds = DestinationsIds.filter(item => item !== id)
         let data = destination.filter(x => x.id !== parseInt(id))
        setDestinationIds(PortIds)
        setDestination(data)
    }

    const createDestination = () => {
        // dispatch(DestinationActions.createDestination(destination))
    }


    return (
        <Container fluid>
            <Row className="d-flex">
                <div className="form-group pr-5 pt-3">
                    <label>País</label>
                    <select
                        className={`form-control`}
                        onChange={(e => selectCountry(e.target.value))}
                    >
                        <option value="">Seleccione...</option>
                        {
                            countries.map(item => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group pt-3">
                    <label>Puerto</label>
                    <select
                        onChange={(e => selectDestination(e.target.value))}
                        className={`form-control`}
                    >
                        <option value="">Seleccione...</option>
                        {
                            currentPort.map(item => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >{item.name}</option>
                            ))
                        }
                    </select>
                </div>
            </Row>
            <Row className="pt-2">
                <DestinationTable destinations={destination} portDestination={dest} port={port} updateDestination={updateDestination} saveDestination={saveDestination} />
            </Row>
        </Container>
    )
}

function DestinationTable({ destinations, portDestination, port, updateDestination, saveDestination}) {
    const [currentDestinations, setCurrentDestinations] = useState([])

    useEffect(() => {
        setCurrentDestinations(destinations)

    }, [destinations, destinations.length])

    const getTransition = (id) => {
        return destinations.filter(x => x.OriginId === port.id && x.PortId === id)[0].trantitionDays
    }

    const destroyDestination = (id) => {
        let data = currentDestinations.filter(item => item.id !== parseInt(id))
       
        setCurrentDestinations(data)
        updateDestination(id)
    }

    const updateTransitionDays = (value, id) => {
        destinations.filter(x => x.OriginId === port.id && x.PortId === id)[0].trantitionDays = value
        saveDestination(destinations)
    }

    return (
        <Table
            striped
            bordered
            hover
            className={`mb-0 table-sm`}
        >
            <thead>
                <tr>
                    <th>País</th>
                    <th>Puerto Destino</th>
                    <th>Tipo</th>
                    <th>TT (Días)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    currentDestinations.length > 0 && currentDestinations.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.Country.name}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.type}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        onChange={(x) => updateTransitionDays(x.target.value, item.id)}
                                        defaultValue={getTransition(item.id)}
                                        autoComplete="false"
                                    />
                                </td>
                                <td className='d-flex justify-content-center'>
                                    {/* <button className='btn btn-primary mr-2'
                                        onClick={() => updateDestination(item.id)}
                                    >
                                        Guardar
                                    </button> */}
                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyDestination(item.id)}
                                    >
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