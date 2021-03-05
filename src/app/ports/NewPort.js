import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PortForm from "./PortForm.js";
import NewDestinationForm from "./NewDestinationForm.js";

import * as CountryReducer from '../../reducers/countries.reducer.js'

import * as CountryActions from '../../actions/countries.actions.js'
import * as PortActions from '../../actions/ports.actions.js'
import * as DestinationActions from '../../actions/destinations.actions.js'
import { updateNotification } from '../../actions/notifications.actions.js'

import Header from "../shared/SecondHeader.js"

export default function NewProvider() {
    const dispatch = useDispatch();
    const [categoriesSave, setCategoriesSave] = useState([])
    const [currentPort, setCurrentPort] = useState([])
    const [destinations, setDestinations] = useState([])
    const countries = useSelector(CountryReducer.getCountries)
    let saveCategories = []

    useEffect(() => {
        dispatch(PortActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
        dispatch(DestinationActions.fetchAll());
    }, [dispatch]);

    function savePort(data) {
        // dispatch(PortActions.createPort(data))
        setCurrentPort(data)
        dispatch(updateNotification('Datos correctos', 'success'))
    }

    function saveDestination(data) {
        // dispatch(PortActions.createPort(data))
        const arrayData = [ ...destinations, data]
        setDestinations(arrayData)
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Nuevo Puerto" items={[
                    { label: "Listado de puertos", to: "/ports" },
                    { label: "Nuevo puerto" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-between">
                <Col sm={3} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Crear Puerto</span>
                        </Card.Header>
                        <Card.Body>
                            <PortForm
                                port={{}}
                                save={savePort}
                                editPort={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={8} className="p-0">
                    <Card className="mb-3 card-custom" style={{ height: '150%' }}>
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Agregar destinos</span>
                        </Card.Header>
                        <Card.Body>
                            <NewDestinationForm
                                destinations={[]}
                                port={currentPort}
                                saveDestination={saveDestination}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">

            </Row>
        </Container>
    )
}