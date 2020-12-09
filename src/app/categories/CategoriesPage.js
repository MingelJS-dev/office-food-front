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
    const countries = useSelector(CountryReducer.getCountries)
    let categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    let categories = useSelector(CategoryReducer.getCategories)

    const [modalShow, setModalShow] = useState(false);
    let [CountryId, setCountryId] = useState('');

    let [CategoryId, setCategoryId] = useState('');
    let [CategoryIdN4, setCategoryIdN4] = useState('');
    let [CategoryIdN3, setCategoryIdN3] = useState('');
    let [CategoryIdN2, setCategoryIdN2] = useState('');
    let [CategoryIdN1, setCategoryIdN1] = useState('');

    const [selectCategoriesN5, setSelectCategoriesN5] = useState([])
    const [selectCategoriesN4, setSelectCategoriesN4] = useState([])
    const [selectCategoriesN3, setSelectCategoriesN3] = useState([])
    const [selectCategoriesN2, setSelectCategoriesN2] = useState([])
    const [selectCategoriesN1, setSelectCategoriesN1] = useState([])

    const [isSelectN4, setIsSelectN4] = useState(false)
    const [isSelectN3, setIsSelectN3] = useState(false)
    const [isSelectN2, setIsSelectN2] = useState(false)
    const [isSelectN1, setIsSelectN1] = useState(false)

    useEffect(() => {
        dispatch(CountryActions.fetchCountries())
        dispatch(CategoryActions.fetchAll())
    }, [dispatch, history])

    useEffect(() => {
     
        setSelectCategoriesN5(categoriesN5.filter(item => item.CountryId === parseInt(CountryId) && item.level === 1))
        if ( CategoryId ) {
            setSelectCategoriesN4(categories.filter(item => item.ParentId === parseInt(CategoryId)))
            setIsSelectN4(true)
        } else {
            setSelectCategoriesN4([])
            setIsSelectN4(false)
        }
    }, [ CountryId, CategoryId, categories, categories.length])

    
    useEffect(() => {
        setSelectCategoriesN3([])
        setSelectCategoriesN2([])
        setSelectCategoriesN1([])
        setIsSelectN3(false)
        setIsSelectN2(false)
        setIsSelectN1(false)
    }, [CategoryId])

    useEffect(() => {
        setSelectCategoriesN4([])
        setIsSelectN4(false)
    }, [CountryId])

      
    useEffect(() => {
        console.log(CategoryIdN4)
        if ( CategoryIdN4 ) {
            setSelectCategoriesN3(categories.filter(item => item.ParentId === parseInt(CategoryIdN4)))
            setIsSelectN3(true)
        } else {
            setSelectCategoriesN3([])
            setIsSelectN3(false)
        }
        setSelectCategoriesN2([])
        setIsSelectN2(false)
        setSelectCategoriesN1([])
        setIsSelectN1(false)
    }, [CategoryIdN4, setCategoryIdN4, categories, categories.length])

    useEffect(() => {
        if ( CategoryIdN4 ) {
            setSelectCategoriesN3(categories.filter(item => item.ParentId === parseInt(CategoryIdN4)))
            setIsSelectN3(true)
        } else {
            setSelectCategoriesN3([])
            setIsSelectN3(false)
        }
        setSelectCategoriesN2([])
        setIsSelectN2(false)
        setSelectCategoriesN1([])
        setIsSelectN1(false)
    }, [CategoryIdN4, categories, categories.length])

    useEffect(() => {
        if ( CategoryIdN3 ) {
            setSelectCategoriesN2(categories.filter(item => item.ParentId === parseInt(CategoryIdN3)))
            setIsSelectN2(true)
        } else {
            setSelectCategoriesN2([])
            setIsSelectN2(false)
        }
        setSelectCategoriesN1([])
        setIsSelectN1(false)
    }, [CategoryIdN3, categories, categories.length])

    useEffect(() => {
        if ( CategoryIdN2 ) {
            setSelectCategoriesN1(categories.filter(item => item.ParentId === parseInt(CategoryIdN2)))
            setIsSelectN1(true)
        } else {
            setSelectCategoriesN1([])
            setIsSelectN1(false)
        }
    }, [CategoryIdN2, categories, categories.length])

    // const clearFromCountry = () => {
    //     setSelectCategoriesN4([])
    // }



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
                level={1}
                CountryId={null}
                onHide={() => setModalShow(false)} />

            <Row style={{ height: '70%' }}>
                <Col>
                    <CategoryList
                        n={4}
                        isSelectN={isSelectN4}
                        ParentId={CategoryId}
                        CountryId={CountryId}
                        categories={selectCategoriesN4}
                        setCategoryIdN={setCategoryIdN4}
                        selectId={CategoryIdN4}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={3}
                        isSelectN={isSelectN3}
                        ParentId={CategoryIdN4}
                        CountryId={CountryId}
                        categories={selectCategoriesN3}
                        setCategoryIdN={setCategoryIdN3}
                        selectId={CategoryIdN3}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={2}
                        isSelectN={isSelectN2}
                        ParentId={CategoryIdN3}
                        CountryId={CountryId}
                        categories={selectCategoriesN2}
                        setCategoryIdN={setCategoryIdN2}
                        selectId={CategoryIdN2}
                    />
                </Col>
                <Col>
                    <CategoryList
                        n={1}
                        isSelectN={isSelectN1}
                        ParentId={CategoryIdN2}
                        CountryId={CountryId}
                        categories={selectCategoriesN1}
                        setCategoryIdN={setCategoryIdN1}
                        selectId={CategoryIdN1}
                        
                    />
                </Col>
            </Row>
        </Container >
    );
}

export default CategoriesPage;
