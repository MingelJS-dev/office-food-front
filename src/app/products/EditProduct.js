import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProductForm from "./ProductForm.js";
import Spinner from '../shared/Spinner.js';

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as BrandReducer from '../../reducers/providers.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'

import * as ProductReducer from '../../reducers/products.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as BrandActions from '../../actions/brands.actions.js'
import * as ProductActions from '../../actions/product.actions.js'

import Header from "../shared/SecondHeader.js"

export default function EditProduct() {
    const dispatch = useDispatch();
    const params = useParams()
    // const [categories, setCategories] = useState([])
    // const [currentCategories, setCurrentCategories] = useState([])
    // const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    // const countries = useSelector(CountryReducer.getCountries)
    // let currentCategories = []



    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(BrandActions.fetchAll())
        dispatch(ProductActions.fetchAll())
        dispatch(CountryActions.fetchCountries())
    }, [dispatch, params.ProviderId])


    // useEffect(() => {
      
    // }, [categories]);

    let currentProduct = useSelector(state => ProductReducer.getById(state, params.ProductId))


if (!currentProduct) {
    return (
        <div></div>
        // <Spinner full={true} />
    )
}

function updateProduct(data) {
      dispatch(ProductActions.updateById(data))
}

return (
    <Container fluid={true} className="my-3">
        <Row>
            <Header title="Editar Artículo" items={[
                { label: "Listado de artículos", to: "/products" },
                { label: "Editar artículo" },
            ]} />
        </Row>

        <Row className="d-flex justify-content-center">
            <Col sm={7} className="p-0">
                <Card className="mb-3 card-custom">
                    <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                        <span>Editar Product</span>
                    </Card.Header>
                    <Card.Body>
                        {
                            currentProduct ?
                                <ProductForm
                                    product={currentProduct}
                                    save={updateProduct}
                                />
                                : <Spinner />
                        }

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
)
}