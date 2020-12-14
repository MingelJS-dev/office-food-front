import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProviderForm from "./ProviderForm.js";
import ProviderCategoryForm from "./ProviderCategoryForm.js";

import * as CountryReducer from '../../reducers/countries.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as ProviderActions from '../../actions/provider.actions.js'

import Header from "../shared/SecondHeader.js"

export default function NewProvider() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [categoriesSave, setCategoriesSave] = useState([])
    const countries = useSelector(CountryReducer.getCountries)
    let saveCategories = []

    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        // console.log(categories)
        //   dispatch(SensorActions.fetchTypes());
    }, [categories]);

    function dataCategories(item) {
        if(!saveCategories[item.CountryId]) {
            saveCategories[item.CountryId] = {}
            saveCategories[item.CountryId]['CountryId'] = item.CountryId
            saveCategories[item.CountryId][item.name] = item.value
            saveCategories[item.CountryId]['CategoryId'] = item.CategoryId
        } else {
            saveCategories[item.CountryId][item.name] = item.value
        }
        
        //   dispatch(ProviderActions.createProvider(data))
    }
    function createProvider(data) {
          dispatch(ProviderActions.createProvider({provider: data, Categories: saveCategories }))
    }

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header title="Nuevo Proveedor" items={[
                    { label: "Listado de proveedores", to: "/providers" },
                    { label: "Nuevo proveedor" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-between">
                <Col sm={6} className="p-0">
                    <Card className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Crear Proveedor</span>
                        </Card.Header>
                        <Card.Body>
                            <ProviderForm
                                provider={{}}
                                save={createProvider}
                                setCategories={setCategories}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={5} className="p-0">
                    {
                        categories && categories.length > 0 &&
                        categories.map(x =>
                            <Card key={x.id} className="mb-3 card-custom">
                                <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                                    <span>Ingresar datos - {countries.filter(country => country.id === x.CountryId)[0].name}</span>
                                </Card.Header>
                                <Card.Body>
                                    <ProviderCategoryForm
                                        providerCategory={x}
                                        save={createProvider}
                                        dataCategories={dataCategories}
                                    />
                                </Card.Body>
                            </Card>
                        )
                    }

                </Col>
            </Row>
        </Container>
    )
}