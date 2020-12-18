import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'

import Spinner from '../shared/Spinner.js';

import * as ProformaActions from '../../actions/proformas.actions.js'
import * as ProformaReducer from '../../reducers/proformas.reducer.js'

import ProformaList from './ProformaList.js';

export default function MainPage() {
    const dispatch = useDispatch();
    const proformas = useSelector(ProformaReducer.getProformas)
    const isLoading = useSelector(ProformaReducer.getIsLoading)

    useEffect(() => {
        dispatch(ProformaActions.fetchAll());
    }, [dispatch]);

    if (isLoading && proformas.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    return (
        <Container fluid>
            {
                proformas && proformas.length > 0 ? 
                <ProformaList proformas={proformas} />
                    :
                    <Row className="justify-content-md-center" >
                        <Col lg="5" className='text-center'>
                            <Alert variant='dark'>
                                Back Office Food Regional
                        <hr />
                                <Link
                                    to="/proformas/new"
                                    className="btn btn-sm btn-create-user m-2"> Crear Proforma
                            </Link>
                            </Alert>
                        </Col>
                    </Row>

            }

        </Container>
    )
}

