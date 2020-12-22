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

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar destino..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

export default function DestinationForm({ destinations, port }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({})
    const [currentPort, setCurrentPort] = useState([])
    const [Ids, setIds] = useState([])
    const [destination, setDestination] = useState(null)
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

    const selectCountry = (id) => {

        setCurrentPort(ports.filter(x => x.CountryId === parseInt(id) && x.type === port.type
            && x.id !== port.id && !Ids.includes(x.PortId)))
        // console.log(ports.filter(x => x.CountryId === parseInt(id) && x.type === port.type
        // && x.id !== port.id && !Ids.includes(x.id)))
    }

    const selectDestination = (id) => {
        let [data] = ports.filter(x => x.id === parseInt(id))

        setDestination({
            OriginId: port.id,
            PortId: data.id,
            trantitionDays: 0
        })
    }

    const createDestination = () => {
        dispatch(DestinationActions.createDestination(destination))
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
                <div className="pt-5 pl-5">
                    {
                        destination ?
                            <button className="btn btn-create-user btn-sm"
                                onClick={() => createDestination()}>
                                Agregar destino
                            </button> : ''
                    }
                </div>
            </Row>
            <Row>
                <Col>
                    <SearchBar
                        input={input}
                        setKeyword={updateSearch}
                    />
                </Col>
            </Row>
            <Row className="pt-2">
                <DestinationTable destinations={currentDestination} portDestination={dest} port={port} />
            </Row>
        </Container>
    )
}

function DestinationTable({ destinations, portDestination, port }) {
    const dispatch = useDispatch();
    const [tt, setTT] = useState('')
    const [currentDestinations, setCurrentDestinations] = useState([])

    useEffect(() => {
        setCurrentDestinations(destinations)
        console.log(currentDestinations)
    }, [destinations, destinations.length])
    const getTransition = (id) => {
        return portDestination.filter(x => x.OriginId === port.id && x.PortId === id)[0].trantitionDays
    }

    const destroyDestination = (id) => {
        let DestId = portDestination.filter(x => x.OriginId === port.id && x.PortId === id)[0].id
        swal({
            title: "¿Está seguro que desea eliminar el destino?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(DestinationActions.destroyById(DestId))
                }
            });
    }

    const updateDestination = (value, id) => {
        let DestId = portDestination.filter(x => x.OriginId === port.id && x.PortId === id)[0].id

        dispatch(DestinationActions.updateById({
            id: DestId,
            trantitionDays: value
        }))
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
                    <th>TT (Días)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    currentDestinations.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.Country.name}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        onChange={(x) => updateDestination(x.target.value, item.id)}
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