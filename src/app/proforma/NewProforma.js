import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProformaForm from "./ProformaForm.js";

import * as CountryReducer from '../../reducers/countries.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as UserActions from '../../actions/users.actions.js'
import * as ProviderActions from '../../actions/provider.actions.js'
import * as PortActions from '../../actions/ports.actions.js'
import * as DestinationActions from '../../actions/destinations.actions.js'
import * as IncotermActions from '../../actions/incoterms.actions.js'
import * as ContainerActions from '../../actions/containers.actions.js'
import * as ProformaActions from '../../actions/proformas.actions.js'

import Header from "../shared/SecondHeader.js"

export default function NewProduct() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
        dispatch(UserActions.fetchUsers());
        dispatch(ProviderActions.fetchAll());
        dispatch(PortActions.fetchAll());
        dispatch(DestinationActions.fetchAll());
        dispatch(IncotermActions.fetchAll());
        dispatch(ContainerActions.fetchAll());
    }, [dispatch]);

    function createProforma(data) {
        // console.log(data)
        dispatch(ProformaActions.createProforma(data))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Nueva Proformas" items={[
                    { label: "Listado de proformas", to: "/proformas" },
                    { label: "Nueva Proforma" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-center">
                <Col sm={12} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Formulario Ingreso proforma</span>
                        </Card.Header>
                        <Card.Body>
                            <ProformaForm
                                proforma={{}}
                                save={createProforma}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}