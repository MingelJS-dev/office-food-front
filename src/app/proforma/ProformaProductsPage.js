import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'

import Spinner from '../shared/Spinner.js';

import * as ProformaActions from '../../actions/proformas.actions.js'
import * as ProformaReducer from '../../reducers/proformas.reducer.js'

import * as ArticleActions from '../../actions/proforma_product.actions.js'

import ArticleList from './ArticleList.js';

export default function ProformaProductsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(ProformaReducer.getIsLoading)
    const params = useParams()

    useEffect(() => {
        dispatch(ProformaActions.fetchAll());
        dispatch(ArticleActions.fetchAllByProformaId(params.ProformaId));
    }, [dispatch]);

    let currentProforma = useSelector(state => ProformaReducer.getProformaById(state, params.ProformaId))

    if (isLoading && currentProforma) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    return (
        <Container fluid>
            {
                currentProforma && <ArticleList proforma={currentProforma} />
            }
        </Container>
    )
}

