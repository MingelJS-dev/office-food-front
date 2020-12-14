import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProductrForm from "./ProductForm.js";

import * as CountryReducer from '../../reducers/countries.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as ProductActions from '../../actions/product.actions.js'
import * as BrandActions from '../../actions/brands.actions.js'

import Header from "../shared/SecondHeader.js"

export default function NewProduct() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [categoriesSave, setCategoriesSave] = useState([])
    const countries = useSelector(CountryReducer.getCountries)
    let saveCategories = []

    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
        dispatch(BrandActions.fetchAll());
    }, [dispatch]);

    function createProduct(data) {
          dispatch(ProductActions.createProduct(data))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Nuevo Artículo" items={[
                    { label: "Listado de Artículos", to: "/products" },
                    { label: "Nuevo Artículo" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-center">
                <Col sm={7} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Crear Artículo</span>
                        </Card.Header>
                        <Card.Body>
                            <ProductrForm
                                product={{}}
                                save={createProduct}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}