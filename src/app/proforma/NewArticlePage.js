import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as ProformaReducer from '../../reducers/proformas.reducer.js'

import * as ProformaActions from '../../actions/proformas.actions.js'
import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as BrandActions from '../../actions/brands.actions.js'
import * as ProductActions from '../../actions/product.actions.js'

import Spinner from '../shared/Spinner.js';
import Header from "../shared/SecondHeader.js"

import ArticleForm from './ArticleForm.js'

export default function NewArticlePage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(ProformaReducer.getIsLoading)
    const params = useParams()
    const [title, setTitle] = useState('')
    const [proformaLabel, setProformaLabel] = useState('')
    const countries = useSelector(CountryReducer.getCountries)
    let saveCategories = []

    useEffect(() => {
        dispatch(ProformaActions.fetchAll());
        dispatch(CategoryActions.fetchAll());
        dispatch(ProductActions.fetchAll());
        dispatch(BrandActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
    }, [dispatch]);


    let currentProforma = useSelector(state => ProformaReducer.getProformaById(state, params.ProformaId))

    
    useEffect(() => {
        if (currentProforma) {
             setTitle(`/proformas/${currentProforma.id}/articles`)
            setProformaLabel(`${currentProforma.name} - Artículos`)
        }
    },[currentProforma])

    if (isLoading && currentProforma) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }




    function createArticle(data) {
        //   dispatch(ProductActions.createProduct(data))
    }

   

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header   title="Ingresar Artículos" items={[
                    { label: proformaLabel, to: title },
                    { label: "Nuevo Artículo" },
                ]} />
            </Row>

            <Row className="">
                <Col sm={12} className="p-0">
                    <Card className="mb-3 card-custom"  style={{ height: '700px' }}>
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Ingresar Artículo</span>
                        </Card.Header>
                        <Card.Body>
                            <ArticleForm 
                                product={{}}
                                currentProforma={currentProforma}
                                save={createArticle}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}