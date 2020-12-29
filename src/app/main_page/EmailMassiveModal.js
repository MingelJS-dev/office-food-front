import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'

import * as RecipientActions from '../../actions/recipients.actions.js'

export default function EmailMassiveModal({ show, onHide }) {
    const dispatch = useDispatch()

    const [CountryId, setCountryId] = useState('')
    const [CategoryId, setCategoryId] = useState('')
    const [CommodityId, setCommodityId] = useState('')
    const [ProviderId, setProviderId] = useState('')
    const [errors, setErrors] = useState({})

    const [selectN5s, setN5s] = useState([])
    const [selectProviders, setProviders] = useState([])
    const [selectN2s, setN2s] = useState([])


    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const categories = useSelector(CategoryReducer.getCategories)
    const providers = useSelector(ProviderReducer.getProviders)

    let currentProviders = []
    const isLoading = false
    
    useEffect(() => {
        setN5s(categoriesN5.filter(x => x.CountryId === parseInt(CountryId)))
    }, [CountryId])

    useEffect(() => {
        setProviders(currentProviders)
        providers.map(x => {
            const item = x.ProviderCategories.filter(pc => pc.CategoryId === parseInt(CategoryId))

            if (item && item.length) {
                currentProviders.push(x)
            }
        })

        setProviders(currentProviders)

        let N4 = categories.filter(x => x.ParentId === parseInt(CategoryId)).map(x => x.id)
        let N3 = categories.filter(x => N4.includes(x.ParentId)).map(x => x.id)
        setN2s(categories.filter(x => N3.includes(x.ParentId)))

    }, [CategoryId])


    function validate(e) {
        e.preventDefault()

        const validations = []

        if (!ProviderId) {
            validations.push(['type', 'Tipo es requerido'])
        }

        if (!CategoryId) {
            validations.push(['CategoryId', 'Categoría es requerido'])
        }

        if (!CountryId) {
            validations.push(['CountryId', 'País electrónico es requerido'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                CountryId,
                CategoryId,
                ProviderId
            }


            save(data)
        }
    }

    const save = (data) => {
        console.log('entra')
        dispatch(RecipientActions.sendEmails(data))
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-center' id="contained-modal-title-vcenter">
                    Template Carga Masiva Proformas
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <form onSubmit={validate} noValidate>
                                <div className="form-group pr-2 p-0">
                                    <label>País</label>
                                    <select
                                        className={`form-control ${errors.CountryId ? 'is-invalid' : ''}`}
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
                                    <label>Categoría</label>
                                    <select
                                        className={`form-control ${errors.CategoryId ? 'is-invalid' : ''}`}
                                        onChange={(e => setCategoryId(e.target.value))}
                                        value={CategoryId}
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
                                    <label>Commodity</label>
                                    <select
                                        className={`form-control ${errors.CommodityId ? 'is-invalid' : ''}`}
                                        onChange={(e => setCommodityId(e.target.value))}
                                        value={CommodityId}
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
                                    <div className="invalid-feedback">{errors.CommodityId}</div>
                                </div>
                                <div className="form-group pr-2 p-0">
                                    <label>Proveedor</label>
                                    <select
                                        className={`form-control ${errors.ProviderId ? 'is-invalid' : ''}`}
                                        onChange={(e => setProviderId(e.target.value))}
                                        value={ProviderId}
                                    >
                                        <option value="">Seleccione...</option>
                                        {
                                            selectProviders.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.ProviderId}</div>
                                </div>
                                <div className="form-group">
                                    <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                        <span>Guardar</span>
                                        {
                                            isLoading ?
                                                <div className='spinner-border' role='status'></div>
                                                : null
                                        }

                                    </button>
                                </div>
                            </form>
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            {/* <Modal.Footer className='justify-content-between'>
                <Button onClick={() => validate()}>Extraer Template</Button>
                <Button onClick={onHide}>Cancelar</Button>
            </Modal.Footer> */}
        </Modal>
    );
}


