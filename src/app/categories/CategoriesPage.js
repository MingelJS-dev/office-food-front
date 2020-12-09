import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


// import { usePagination } from '../shared/Pagination.js'
// import useSearch from '../shared/Search.js'
import Header, { HeaderActions } from "../shared/SecondHeader.js"

import * as CountryActions from '../../actions/countries.actions.js'
import * as CategoryActions from '../../actions/categories.actions.js'

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import NewCategoryModal from './NewCategory.js'
import CategoryList from "./CategoryList.js"

function CategoriesPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    let [CountryId, setCountryId] = useState('');
    let [CategoryId, setCategoryId] = useState('');
    const countries = useSelector(CountryReducer.getCountries)
    let categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const [selectCategoriesN5, setSelectCategoriesN5] = useState([])
    useEffect(() => {
        dispatch(CountryActions.fetchCountries())
        dispatch(CategoryActions.fetchAll())
        setSelectCategoriesN5(categoriesN5.filter(item => item.CountryId === parseInt(CountryId)))
    }, [dispatch, history, CountryId])

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Categorías"
                >
                    <HeaderActions>
                        <button
                            onClick={() => setModalShow(true)}
                            className="btn btn-sm btn-create-user">Crear categoría (N5)</button>
                        <button
                            className="btn btn-sm btn-create-user m-1">Descargar Maestra</button>
                        <button
                            className="btn btn-sm btn-create-user">Actualizar Maestra</button>
                    </HeaderActions>
                </Header>
            </Row>
            <Row>
                <Col lg="3">
                    <div className="form-group">
                        <label>País</label>

                        <select
                            className={`form-control`}
                            onChange={(e => setCountryId(e.target.value))}
                            defaultValue={CountryId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                countries.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </Col>
                <Col lg="3">
                    <div className="form-group">
                        <label>Categoría N5</label>

                        <select
                            className={`form-control`}
                            onChange={(e => setCategoryId(e.target.value))}
                            defaultValue={CategoryId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                selectCategoriesN5.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </Col>
            </Row>
            <NewCategoryModal show={modalShow}
                level={{ level: 1 }}
                onHide={() => setModalShow(false)} />

            <Row style={{ height: '70%' }}>
                <Col>
                    <CategoryList
                        n={4}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={3}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={2}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={1}
                    />
                </Col>
            </Row>
        </Container >
    );
}

export default CategoriesPage;
