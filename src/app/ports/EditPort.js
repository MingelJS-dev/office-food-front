import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PortForm from "./PortForm.js";
import DestinationForm from "./DestinationForm.js";
import { useParams } from 'react-router';

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as PortReducer from '../../reducers/ports.reducer.js'

import * as CountryActions from '../../actions/countries.actions.js'
import * as PortActions from '../../actions/ports.actions.js'
import * as DestinationActions from '../../actions/destinations.actions.js'

import Header from "../shared/SecondHeader.js"

export default function EditPort() {
    const dispatch = useDispatch();
    const countries = useSelector(CountryReducer.getCountries)
    const params = useParams()
    
    useEffect(() => {
        dispatch(PortActions.fetchAll());
        dispatch(DestinationActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
    }, [dispatch, params.PortId]);

    let currentPort = useSelector(state => PortReducer.getPortById(state, params.PortId))

    function editPort(data) {
        dispatch(PortActions.updateById(data))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Editar Puerto" items={[
                    { label: "Listado de puertos", to: "/ports" },
                    { label: "Editar puerto" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-between">
                <Col sm={3} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Editar Puerto</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                currentPort ?
                                    <PortForm
                                        port={currentPort}
                                        save={editPort}
                                        editPort={true}
                                    />
                                    : ''
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={8} className="p-0">
                    <Card className="mb-3 card-custom" style={{ height: '150%' }}>
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Gestión de destinos</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                currentPort ?
                                    <DestinationForm
                                        destinations={[]}
                                        port={currentPort}
                                    />
                                    : ''
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">

            </Row>
        </Container>
    )
}