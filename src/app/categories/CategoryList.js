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
import "./CategoryPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

function CategoryList({ n }) {
    const dispatch = useDispatch()
    const history = useHistory()
    // const [modalShow, setModalShow] = useState(false);
    // let [CountryId, setCountryId] = useState('');
    // let [CategoryId, setCategoryId] = useState('');
    // const countries = useSelector(CountryReducer.getCountries)
    // let categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    // const [selectCategoriesN5, setSelectCategoriesN5] = useState([])
    // useEffect(() => {
    //     dispatch(CountryActions.fetchCountries())
    //     dispatch(CategoryActions.fetchAll())
    //     setSelectCategoriesN5(categoriesN5.filter(item => item.CountryId === parseInt(CountryId)))
    // }, [dispatch, history, CountryId])

    return (
        <Card className="cardJC">
            <Card.Header className="card-header-category">
                <div className="d-flex justify-content-between">
                    <h5 className="pt-2" >Categoría N{ n }</h5>
                    <Col lg={4} className="d-flex justify-content-between">
                        <button className="btn btn-category" >
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                        <button className="btn btn-category" >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </Col>
                </div>
            </Card.Header>
            <Card.Body className="card-body-category card-text-category">
                <div className="card-container-category">
                    <ul className="list-group">
                        <li className="item-card-category">
                            <div className="group-name d-flex justify-content-between">
                                <span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CategoryList;
