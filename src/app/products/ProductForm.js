import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as BrandReducer from '../../reducers/brands.reducer.js'

export default function ProductForm({ product, save }) {
    const [name, setName] = useState(product.name || '')
    const [sku, setSku] = useState(product.sku || '')
    const [ean, setEan] = useState(product.ean || '')
    const [pvp, setPvp] = useState(product.pvp || '')
    const [unitPerBox, setUnitPerBox] = useState(product.unitPerBox || '')
    const [BrandId, setBrandId] = useState(product.BrandId || '')
    const [CategoryId, setCategoryId] = useState(product.CategoryId || '')
    const [CountryId, setCountryId] = useState(product.CountryId || '')
    const [errors, setErrors] = useState({})

    const [selectN5s, setN5s] = useState([])
    const [selectN4s, setN4s] = useState([])
    const [selectN3s, setN3s] = useState([])
    const [selectN2s, setN2s] = useState([])
    const [selectN1s, setN1s] = useState([])

    let [CategoryIdN5, setCategoryIdN5] = useState('');
    let [CategoryIdN4, setCategoryIdN4] = useState('');
    let [CategoryIdN3, setCategoryIdN3] = useState('');
    let [CategoryIdN2, setCategoryIdN2] = useState('');


    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const categories = useSelector(CategoryReducer.getCategories)
    const countries = useSelector(CountryReducer.getCountries)
    const brands = useSelector(BrandReducer.getBrands)

    const [selectType, setType] = useState('')
    const [selectBrands, setSelectbrands] = useState([])


    useEffect(() => {
        setSelectbrands(brands)
    }, [brands, brands && brands.length])

    useEffect(() => {
        setN1s(categories.filter(x => x.level === 5))
    }, [categories, categories && categories.length])

    useEffect(() => {
        setSelectbrands(brands.filter(x => x.type === selectType))
    }, [selectType])

    useEffect(() => {
        setN5s(categoriesN5.filter(x => x.CountryId === parseInt(CountryId)))
    }, [CountryId])

    useEffect(() => {
        setN4s(categories.filter(x => x.ParentId === parseInt(CategoryIdN5)))
    }, [CategoryIdN5])

    useEffect(() => {
        setN3s(categories.filter(x => x.ParentId === parseInt(CategoryIdN4)))
    }, [CategoryIdN4])

    useEffect(() => {
        setN2s(categories.filter(x => x.ParentId === parseInt(CategoryIdN3)))
    }, [CategoryIdN3])

    useEffect(() => {
        setN1s(categories.filter(x => x.ParentId === parseInt(CategoryIdN2)))
    }, [CategoryIdN2])

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Nombre es requerido.'])
        }

        if (!product.id && !sku) {
            validations.push(['sku', 'Sku es requerida.'])
        }

        if (!product.id && !ean) {
            validations.push(['ean', 'Ean es requerido.'])
        }

        if (!product.id && !pvp) {
            validations.push(['pvp', 'PVP es requerido.'])
        }

        if (!product.id && !unitPerBox) {
            validations.push(['unitPerBox', 'Unid x Caja es requerida.'])
        }

        if (!product.id && !BrandId) {
            validations.push(['BrandId', 'Marca contacto es requerida.'])
        }

        if (!product.id && !CategoryId) {
            validations.push(['CategoryId', 'Categoría es requerida.'])
        }

        if (!product.id && !CountryId) {
            validations.push(['CountryId', 'País es requerido.'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])

            const data = {
                name,
                sku,
                ean,
                BrandId,
                CountryId,
                CategoryId,
                unitPerBox,
                pvp
                // selectCategories,
            }

            if (product.id) {
                data.id = product.id
            }

            save(data)
        }
    }

    const selectCategoriesN5 = (data) => {

    }
    return (
        <Container fluid>
            <form onSubmit={validate} noValidate>
                <Row className='justify-content-center'>
                    <div className="form-group pr-2 p-0">
                        <label>País</label>
                        <select
                            className={`form-control form-control-sm ${errors.CountryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCountryId(e.target.value))}
                            value={CountryId}
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
                        <div className="invalid-feedback">{errors.CountryId}</div>
                    </div>
                    <div className="form-group pr-2 p-0">
                        <label>Categoría N5</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCategoryIdN5(e.target.value))}
                        // defaultValue={category}
                        >
                            <option value="">Seleccione...</option>
                            {
                                selectN5s.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>
                    <div className="form-group pr-2 p-0">
                        <label>Categoría N4</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCategoryIdN4(e.target.value))}
                        // defaultValue={category}
                        >
                            <option value="">Seleccione...</option>
                            {
                                selectN4s.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>
                    <div className="form-group pr-2 p-0">
                        <label>Categoría N3</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCategoryIdN3(e.target.value))}
                        // defaultValue={category}
                        >
                            <option value="">Seleccione...</option>
                            {
                                selectN3s.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>
                    <div className="form-group pr-2 p-0">
                        <label>Categoría N2</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCategoryIdN2(e.target.value))}
                        // defaultValue={category}
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
                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>
                    <div className="form-group pr-2 p-0">
                        <label>Categoría N1</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
                            onChange={(e => setCategoryId(e.target.value))}
                            value={CategoryId}
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
                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>

                </Row>
                <Row className='justify-content-center'>
                    <div className="form-group p-1">
                        <label>Artículo</label>

                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            onChange={(x) => setName(x.target.value)}
                            value={name}
                            autoComplete="false"
                        />

                        <div className="invalid-feedback">{errors.name}</div>
                    </div>
                    <div className="form-group p-1">
                        <label>EAN</label>

                        <input
                            type="text"
                            className={`form-control ${errors.ean ? 'is-invalid' : ''}`}
                            onChange={(x) => setEan(x.target.value)}
                            value={ean}
                            autoComplete="false"
                        />

                        <div className="invalid-feedback">{errors.sku}</div>
                    </div>
                    <div className="form-group p-1">
                        <label>SKU</label>

                        <input
                            type="text"
                            className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                            onChange={(x) => setSku(x.target.value)}
                            value={sku}
                            autoComplete="false"
                        />

                        <div className="invalid-feedback">{errors.sku}</div>
                    </div>

                </Row>
                <Row className='justify-content-center'>
                    <div className="form-group pl-5 p-1">
                        <label>Tipo Marca</label>
                        <select
                            className={`form-control  ${errors.BrandId ? 'is-invalid' : ''}`}
                            onChange={(e => setType(e.target.value))}
                        >
                            <option value="">Seleccione...</option>
                            <option value="PROPIA">PROPIA</option>
                            <option value="IMPORTADOS">IMPORTADOS</option>
                            <option value="TERCEROS">TERCEROS</option>
                            <option value="SIN MARCA">SIN MARCA</option>
                        </select>
                        <div className="invalid-feedback">{errors.BrandId}</div>
                    </div>
                    <div className="form-group p-1 pr-5">
                        <label>Marca</label>

                        <select
                            className={`form-control ${errors.BrandId ? 'is-invalid' : ''}`}
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

                        <div className="invalid-feedback">{errors.BrandId}</div>
                    </div>
                    <div className="form-group p-1">
                        <label>PVP ($ ML)</label>

                        <input
                            type="text"
                            className={`form-control ${errors.pvp ? 'is-invalid' : ''}`}
                            onChange={(x) => setPvp(x.target.value)}
                            value={pvp}
                            autoComplete="false"
                        />

                        <div className="invalid-feedback">{errors.pvp}</div>
                    </div>
                    <div className="form-group p-1">
                        <label>Unid x Caja</label>

                        <input
                            type="number"
                            className={`form-control ${errors.unitPerBox ? 'is-invalid' : ''}`}
                            onChange={(x) => setUnitPerBox(x.target.value)}
                            value={unitPerBox}
                            autoComplete="false"
                        />

                        <div className="invalid-feedback">{errors.unitPerBox}</div>
                    </div>
                </Row>
                <div className="form-group d-flex justify-content-center">
                    <button className={`btn btn-primary`}>
                        <span>Guardar</span>
                    </button>
                </div>

            </form>
        </Container>
    )
}