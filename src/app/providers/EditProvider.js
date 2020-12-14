import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProviderForm from "./ProviderForm.js";
import Spinner from '../shared/Spinner.js';

import ProviderCategoryForm from "./ProviderCategoryForm.js";

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as ProviderActions from '../../actions/provider.actions.js'

import Header from "../shared/SecondHeader.js"

export default function EditProvider() {
    const dispatch = useDispatch();
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [currentCategories, setCurrentCategories] = useState([])
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const countries = useSelector(CountryReducer.getCountries)
    // let currentCategories = []
    const currentCategoriesN5 = [...new Set(categoriesN5.map(x => x.name))]



    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(ProviderActions.fetchAll())
        dispatch(CountryActions.fetchCountries())
    }, [dispatch, params.ProviderId])


    useEffect(() => {
        // console.log(categories)
        //   dispatch(SensorActions.fetchTypes());
    }, [categories]);

    let currentProvider = useSelector(state => ProviderReducer.getById(state, params.ProviderId))

    useEffect(() => {
        if (currentProvider && categoriesN5.length > 0) {
            let ids = currentProvider.ProviderCategories.map(x => x.CategoryId)
           
            currentProvider.category = categoriesN5.filter(x => currentProvider.ProviderCategories[0].CategoryId === x.id)[0].name

            currentProvider.ProviderCategories.push(...categoriesN5.filter(x => x.name === currentProvider.category &&
                !ids.includes(x.id)
            ))

             setCurrentCategories(currentProvider.ProviderCategories)
        }

        //   dispatch(SensorActions.fetchTypes());
    }, [currentProvider, categoriesN5]);

if (!currentProvider && !countries && !categoriesN5) {
    return (
        <div></div>
        // <Spinner full={true} />
    )
}
// function dataCategories(item) {
//     if(!saveCategories[item.CountryId]) {
//         saveCategories[item.CountryId] = {}
//         saveCategories[item.CountryId][item.name] = item.value
//         saveCategories[item.CountryId]['CategoryId'] = item.CategoryId
//     } else {
//         saveCategories[item.CountryId][item.name] = item.value
//     }

// }
function createProvider(data) {

    //   dispatch(ProviderActions.createProvider({provider: data, Categories: saveCategories }))
}

return (
    <Container fluid={true} className="my-3">
        <Row>
            <Header title="Editar Proveedor" items={[
                { label: "Listado de proveedores", to: "/providers" },
                { label: "Editar proveedor" },
            ]} />
        </Row>

        <Row className="d-flex justify-content-between">
            <Col sm={6} className="p-0">
                <Card className="mb-3 card-custom">
                    <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                        <span>Editar Proveedor</span>
                    </Card.Header>
                    <Card.Body>
                        {
                            currentProvider ?
                                <ProviderForm
                                    provider={currentProvider}
                                    save={createProvider}
                                    setCategories={setCategories}
                                />
                                : <Spinner />
                        }

                    </Card.Body>
                </Card>
            </Col>
            <Col sm={5} className="p-0">
                {
                    currentCategories && countries.length > 0 && currentCategories.length > 0 ?
                        currentCategories.map(x =>
                            <Card key={x.id} className="mb-3 card-custom">
                                <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                                    <span>Ingresar datos - {countries.filter(country => country.id === x.CountryId)[0].name}</span>
                                </Card.Header>
                                <Card.Body>
                                    <ProviderCategoryForm
                                        providerCategory={x}
                                    // dataCategories={dataCategories}
                                    />
                                </Card.Body>
                            </Card>
                        ) : ''
                }

            </Col>
        </Row>
    </Container>
)
}