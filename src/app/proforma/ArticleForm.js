import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as BrandReducer from '../../reducers/brands.reducer.js'
import * as ProductReducer from '../../reducers/products.reducer.js'

import Table from 'react-bootstrap/Table';
import { parse } from '@fortawesome/fontawesome-svg-core';

export default function ArticleForm({ product, currentProforma, save }) {
    const [name, setName] = useState(product.name || '')
    const [sku, setSku] = useState(product.sku || '')
    const [units, setUnits] = useState(product.units || '')
    const [total, setTotal] = useState(product.total || '')
    const [measurement, setMeasurement] = useState(product.measurement || '')
    const [unitAgreedCost, setUnitAgreedCost] = useState(product.unitAgreedCost || '')
    const [errors, setErrors] = useState({})

    const [currentProduct, setCurrentProduct] = useState([])

    const [selectN2s, setN2s] = useState([])
    const [selectN1s, setN1s] = useState([])
    const [selectBrands, setSelectBrands] = useState([])

    const [ids, setIds] = useState([])

    let [CategoryIdN2, setCategoryIdN2] = useState('');
    let [CategoryIdN1, setCategoryIdN1] = useState('');
    let [BrandId, setBrandId] = useState('');

    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const categories = useSelector(CategoryReducer.getCategories)
    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const brands = useSelector(BrandReducer.getBrands)
    const products = useSelector(ProductReducer.getProducts)


    const [selectArticles, setSelectArticles] = useState([])





    useEffect(() => {
        // categories.filter(x => currentProforma.CatetoryId)
        if (currentProforma && currentProforma.CategoryId) {
            let N4 = categories.filter(x => x.ParentId === currentProforma.CategoryId).map(x => x.id)
            let N3 = categories.filter(x => N4.includes(x.ParentId)).map(x => x.id)
            setN2s(categories.filter(x => N3.includes(x.ParentId)))
        }
    }, [categories, categories && categories.length, currentProforma])

    useEffect(() => {
        setN1s(categories.filter(x => x.ParentId === parseInt(CategoryIdN2)))
        setSelectBrands([])
        setSelectArticles([])
    }, [CategoryIdN2])

    useEffect(() => {
        let ids = products.filter(x => x.CategoryId === parseInt(CategoryIdN1)).map(x => x.BrandId)
        setSelectBrands(brands.filter(x => ids.includes(x.id)))
        setSelectArticles([])
    }, [CategoryIdN1])

    useEffect(() => {
        setSelectArticles(products.filter(x => x.CategoryId === parseInt(CategoryIdN1) &&
            x.BrandId === parseInt(BrandId)
        ))

    }, [BrandId])

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])

            const data = {

            }

            if (product.id) {
                data.id = product.id
            }

            save(data)
        }
    }

    const selectProduct = (id) => {
        let aux = [...ids, id]
       if(!ids.includes(id)) {
           setCurrentProduct(products.filter(x => x.id === parseInt(id)))
           setIds(aux)
        }

    }

    return (
        <Container fluid>
            <form onSubmit={validate} noValidate>
                <Row>
                    <Col className="d-flex">
                        <div className="form-group pr-2 p-0 col-xl-2">
                            <label>Commodity N2</label>
                            <select
                                className={`form-control form-control-sm`}
                                onChange={(e => setCategoryIdN2(e.target.value))}
                                defaultValue={CategoryIdN2}
                            >
                                <option value="">Seleccione...</option>
                                {
                                    selectN2s.map(item => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</option>
                                    ))
                                }
                            </select>
                            {/* <div className="invalid-feedback">{errors.CategoryId}</div> */}
                        </div>
                        <div className="form-group pr-2 p-0 col-xl-2">
                            <label>Variedad / Grupo</label>
                            <select
                                className={`form-control form-control-sm`}
                                onChange={(e => setCategoryIdN1(e.target.value))}
                                defaultValue={CategoryIdN1}
                            >
                                <option value="">Seleccione...</option>
                                {
                                    selectN1s.map(item => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</option>
                                    ))
                                }
                            </select>
                            {/* <div className="invalid-feedback">{errors.CategoryId}</div> */}
                        </div>
                        <div className="form-group p-0 pr-2 col-xl-2">
                            <label>Marca</label>

                            <select
                                className={`form-control form-control-sm`}
                                onChange={(e => setBrandId(e.target.value))}
                                value={BrandId}
                            >
                                <option value="">Seleccione...</option>
                                {
                                    selectBrands.map(item => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group pr-2 p-0 col-xl-2">
                            <label>Artículo</label>

                            <select
                                className={`form-control form-control-sm`}
                                onChange={(e => selectProduct(e.target.value))}
                            // value={BrandId}
                            >
                                <option value="">Seleccione...</option>
                                {
                                    selectArticles.map(item => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </Col>
                    <div className="form-group pt-4">
                        <button className={`btn btn-primary`}>
                            <span>Guardar</span>
                        </button>
                    </div>
                </Row>

                <Row className='justify-content-center pt-5'>
                    <ArticleTable currentProduct={currentProduct} />
                </Row>


            </form>
        </Container>
    )
}

function ArticleTable({ currentProduct }) {
    const dispatch = useDispatch();
    const [articles, setArticles] = useState([])
    const getTransition = (id) => {
        // return portDestination.filter(x => x.OriginId === port.id && x.PortId === id)[0].trantitionDays
    }

    useEffect(() => {
        let aux = [...currentProduct, ...articles]
        setArticles(aux)
    }, [currentProduct])
    const updateDestination = (value, id) => {
    }

    return (
        <Table
            striped
            bordered
            hover
            className={`mb-0 table-sm`}
        >
            <thead>
                <tr>
                    <th>Artículo</th>
                    <th>Cantidad</th>
                    <th>Unidad de medida</th>
                    <th>Costo Pactado Unitario</th>
                    <th>Costo Pactado Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    articles && articles.length > 0 && articles.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        autoComplete="false"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        autoComplete="false"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        autoComplete="false"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={`form-control}`}
                                        autoComplete="false"
                                    />
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )


}