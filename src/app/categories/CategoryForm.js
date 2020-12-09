import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import * as CountryReducer from '../../reducers/countries.reducer.js'
import Spinner from '../shared/Spinner.js'
// import useFeatureChecker from '../shared/FeatureChecker.js'

export default function UserForm({ category, save, level }) {
    // const CheckFeatures = useFeatureChecker()
    const [name, setName] = useState(category.name || '')
    // const [first_name, setFirstName] = useState(user.first_name || '')
    //   const [repeatPassword, setRepeatPassword] = useState('')
    const [CountryId, setCountryId] = useState(category.CountryId || '');
    
    const [errors, setErrors] = useState({})
    const countries = useSelector(CountryReducer.getCountries)
    // const globalLoading = useSelector(UsersReducer.getIsLoading)
    // const localLoading = useSelector(state => UsersReducer.getIsLoadingById(state, user.id))


    const isLoading = false

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Nombre es requerido'])
        }

        if (!CountryId) {
            validations.push(['CountryId', 'País es requerido'])
        }



        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
                level,
                CountryId
            }

            if (category.id) {
                data.id = category.id
            }

            save(data)
        }
    }

    if (isLoading) {
        return (<Spinner />)
    }

    return (
        <form onSubmit={validate} noValidate>
            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={(x) => setName(x.target.value)}
                    value={name}
                    disabled={isLoading}
                />

                <div className="invalid-feedback">{errors.name}</div>
            </div>
            <div className="form-group">
                <label>País</label>

                <select
                       className={`form-control ${errors.CountryId ? 'is-invalid' : ''}`}
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

                <div className="invalid-feedback">{errors.CountryId}</div>
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
    )
}

