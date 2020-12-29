import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import Spinner from '../shared/Spinner.js'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import { Row } from 'react-bootstrap';

export default function UserForm({ recipient, save }) {
    const [email, setEmail] = useState(recipient.email || '')
    const [CountryId, setCountryId] = useState(recipient.CountryId || '')
    const [CategoryId, setCategoryId] = useState(recipient.CategoryId || '')
    const [type, setType] = useState(recipient.type || '')
    const [selectN5s, setN5s] = useState([])
    const [errors, setErrors] = useState({})

    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)

    const isLoading = false

    useEffect(() => {
        setN5s(categoriesN5.filter(x => x.CountryId === parseInt(CountryId)))
    }, [CountryId])

    function validate(e) {
        e.preventDefault()

        const validations = []

        if (!type) {
            validations.push(['type', 'Tipo es requerido'])
        }

        if (!CategoryId) {
            validations.push(['last_name', 'Apellido es requerido'])
        }

        if (!recipient.id && !email) {
            validations.push(['email', 'Correo electrónico es requerido'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                email,
                CountryId,
                CategoryId,
                type
            }

            if (recipient.id) {
                data.id = recipient.id
            }

            save(data)
        }
    }

    if (isLoading) {
        return (<Spinner />)
    }

    return (
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
            <div className="form-group">
                <label>Correo electrónico</label>

                <input
                    type="text"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(x) => setEmail(x.target.value)}
                    value={email.toLowerCase()}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="form-group">
                <label>Tipo</label>

                <select
                    className={`form-control`}
                    onChange={(e => setType(e.target.value))}
                    defaultValue={type}
                >
                    <option value="">Seleccione...</option>
                    <option value="Principal">Principal</option>
                    <option value="Secundario (CC)">Secundario (CC)</option>

                </select>
            </div>

            <Row className='justify-content-center'>
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
            </Row>

        </form>
    )
}

