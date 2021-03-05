import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import ProformaForm from "./ProformaForm.js";
import { useParams } from 'react-router';

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as ProformaReducer from '../../reducers/proformas.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as UserActions from '../../actions/users.actions.js'
import * as ProviderActions from '../../actions/provider.actions.js'
import * as PortActions from '../../actions/ports.actions.js'
import * as DestinationActions from '../../actions/destinations.actions.js'
import * as IncotermActions from '../../actions/incoterms.actions.js'
import * as ContainerActions from '../../actions/containers.actions.js'
import * as BrandActions from '../../actions/brands.actions.js'
import * as ProductActions from '../../actions/product.actions.js'
import * as ProformaActions from '../../actions/proformas.actions.js'

import * as ProviderReducer from '../../reducers/providers.reducer.js'

import SpinnerFile from '../shared/SpinnerFile.js'

import Header from "../shared/SecondHeader.js"

export default function EditProforma() {
    const dispatch = useDispatch();
    const params = useParams()
    let isLoading = useSelector(ProviderReducer.getIsLoading)

    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
        dispatch(UserActions.fetchUsers());
        dispatch(ProviderActions.fetchAll());
        dispatch(PortActions.fetchAll());
        dispatch(DestinationActions.fetchAll());
        dispatch(IncotermActions.fetchAll());
        dispatch(ContainerActions.fetchAll());
        dispatch(BrandActions.fetchAll());
        dispatch(ProductActions.fetchAll());
        dispatch(ProformaActions.fetchAll());
    }, [dispatch, params.ProformaId]);

    let currentProforma = useSelector(state => ProformaReducer.getProformaById(state, params.ProformaId))

    
    if (!currentProforma) {
        return (
            <SpinnerFile isLoading={true} />
        )
    }
    function editProforma(data) {
        dispatch(ProformaActions.updateById(data))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Editar Proforma" items={[
                    { label: "Listado de proformas", to: "/proformas" },
                    { label: "Listado de Artículos" , to: `/proformas/${currentProforma.id}/articles`},
                    { label: "Editar Proforma" }
                ]} />
            </Row>

            <Row className="d-flex justify-content-between">
                <Col sm={12} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Editar Proforma</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                currentProforma &&
                                <ProformaForm
                                    proforma={currentProforma}
                                    previous={null}
                                    save={editProforma}
                                />
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