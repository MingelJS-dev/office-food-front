import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// import * as UsersReducer from '../../reducers/users.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import Spinner from '../shared/Spinner.js'
// import useFeatureChecker from '../shared/FeatureChecker.js'

export default function PortForm({ port, save, editPort }) {
    const [name, setName] = useState(port.name || '')
    const [CountryId, setCountryId] = useState(port.CountryId || '')
    const [type, setType] = useState(port.type || '')
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

        if (!port.id && !type) {
            validations.push(['type', 'Tipo es requerido'])
        }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
                CountryId,
                type
            }

            if (port.id) {
                data.id = port.id
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
                <label>Puerto</label>

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

            <div className="form-group">
                <label>Tipo</label>

                <select
                    className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                    onChange={(e => setType(e.target.value))}
                    defaultValue={type}
                >
                    <option value="">Seleccione...</option>
                    <option value="Aereo">Aereo</option>
                    <option value="Maritimo">Maritimo</option>
                    <option value="Terrestre">Terrestre</option>
                </select>

                <div className="invalid-feedback">{errors.type}</div>
            </div>

            <div className="form-group">
                <button className={`btn btn-block btn-second-blue ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                    {
                        !editPort && <span>Guardar todo</span> || <span>Guardar</span>
                    }
                    
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

