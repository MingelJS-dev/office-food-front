import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as BrandReducer from '../../reducers/brands.reducer.js'
import * as ProductReducer from '../../reducers/products.reducer.js'

import * as ArticleActions from '../../actions/proforma_product.actions.js'

import Table from 'react-bootstrap/Table';
import { parse } from '@fortawesome/fontawesome-svg-core';

export default function ArticleForm({ product, currentProforma, previous, save, currentProducts }) {
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
    const [ProductIds, setProductIds] = useState(currentProducts && currentProducts.length > 0 && currentProducts.map(x => x.ProductId) || [])

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
            let N4 = categories.filter(x => x.ParentId === parseInt(currentProforma.CategoryId)).map(x => x.id)
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
            x.BrandId === parseInt(BrandId) && !ProductIds.includes(x.id)
        ))

    }, [BrandId])

    // useEffect(() => {
    //     setSelectArticles(products.filter(x => x.CategoryId === parseInt(CategoryIdN1) &&
    //         x.BrandId === parseInt(BrandId)
    //     ))

    // }, [currentProduct])

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])

            const data = []

            if (product.id) {
                data.id = product.id
            }

            save(data)
        }
    }

    const selectProduct = (id) => {
        let aux = [...ids, id]
        if (!ids.includes(id)) {
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

                </Row>

                <Row className='justify-content-center'>
                    <ArticleTable previous={previous}
                        currentProduct={currentProduct}
                        currentProforma={currentProforma}
                        save={save}
                        currentProducts={currentProducts}
                    />
                </Row>


            </form>
        </Container>
    )
}

function ArticleTable({ previous, currentProduct, currentProforma, save, currentProducts }) {
    const dispatch = useDispatch();
    const [articles, setArticles] = useState(currentProducts && currentProducts.length > 0 && currentProducts || [])
    const getTransition = (id) => {
        // return portDestination.filter(x => x.OriginId === port.id && x.PortId === id)[0].trantitionDays
    }

    useEffect(() => {
        let aux = [...currentProduct, ...articles]
        setArticles(aux)
    }, [currentProduct])

    // useEffect(() => {
    //     let aux = [...currentProduct, ...articles]
    //     setArticles(aux)
    // }, [article])

    const updateDataAux = (label, data, id) => {

        setArticles(articles.map(x => {
            if (x.id !== id) return x

            x[label] = data
            return { ...x }
        }))

    }

    const getTotal = (id) => {
        const [article] = articles.filter(x => x.id === parseInt(id) || x.ProductId === parseInt(id))
 
        if (article && article.units && article.unitAgreedCost && (article.id === parseInt(id))) {
            return parseInt(article.units) * parseInt(article.unitAgreedCost)
        }


        return 0;
    }

    const getSku = (id) => {
        const [article] = articles.filter(x => (x.id || x.ProductId) === parseInt(id))
        if (article && article.sku) {
            return article.sku
        }


        return '';
    }

    const updateArticle = () => {
        const arrayData = articles.map(x => {
            return {
                units: x.units,
                measurement: x.measurement,
                ProductId: x.id || x.ProductId,
                ProformaId: currentProforma.id || x.ProformaId,
                unitAgreedCost: x.unitAgreedCost,
                name: x.name,
                sku: x.sku
            }
        })
        // dispatch(ArticleActions.createArticle(arrayData))
        save(arrayData)
    }

    const saveArticle = () => {
        const arrayData = articles.map(x => {
            return {
                units: x.units,
                measurement: x.measurement,
                ProductId: x.id || x.ProductId,
                ProformaId: currentProforma.id || x.ProformaId,
                unitAgreedCost: x.unitAgreedCost,
                name: x.name,
                sku: x.sku
            }
        })
        dispatch(ArticleActions.createArticle(arrayData))
        // save(arrayData)
    }



    return (
        <Container fluid={true}>
            <Row className='pt-0 justify-content-end'>

                {
                    previous &&
                    <div className="form-group pr-3">
                        <button
                            onClick={() => previous()}
                            className={`btn mr-5 btn-second-blue`}>
                            <span>Atras</span>
                        </button>
                        <button
                            onClick={() => updateArticle()}
                            className={`btn btn-second-blue `}>
                            <span>Siguiente</span>
                        </button>
                    </div> ||
                    <div className="form-group pr-3">
                        <button
                            onClick={() => saveArticle()}
                            className={`btn btn-second-blue `}>
                            <span>Guardar</span>
                        </button>
                    </div>
                }

            </Row>
            <Table
                striped
                bordered
                hover
                className={`mb-0 table-sm`}
            >
                <thead>
                    <tr>
                        <th>Artículo</th>
                        <th>Sku</th>
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
                                        {getSku(item.id || item.ProductId)}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={`form-control}`}
                                            onChange={(x) => updateDataAux('units', x.target.value, item.id)}
                                            defaultValue={item.units}
                                            autoComplete="false"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            onChange={(x) => updateDataAux('measurement', x.target.value, item.id)}
                                            className={`form-control form-control-sm`}
                                            value={item.measurement}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="Unid">Unid</option>
                                            <option value="Cajas">Cajas</option>
                                            <option value="kg">kg</option>
                                            <option value="lb">lb</option>
                                        </select>
                                        {/* <input
                                        type="number"
                                        className={`form-control}`}
                                        autoComplete="false"
                                        onChange={(x) => updateDataAux('measurement', x.target.value, item.id)}
                                        defaultValue={item.measurement}
                                    /> */}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={`form-control}`}
                                            autoComplete="false"
                                            onChange={(x) => updateDataAux('unitAgreedCost', x.target.value, item.id)}
                                            defaultValue={item.unitAgreedCost}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={`form-control}`}
                                            autoComplete="false"
                                            value={getTotal(item.id || item.ProductId)}
                                            disabled={true}
                                        />
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>

    )


}