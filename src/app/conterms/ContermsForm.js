import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Spinner from '../shared/Spinner.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ContermForm({ conterm, save, destroyItem }) {
    const [name, setName] = useState(conterm.name || '')
    const [errors, setErrors] = useState({})

    const isLoading = false

    function validate() {
        // e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Nombre es requerido'])
        }



        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name
            }

            if (conterm.id) {
                data.id = conterm.id
            }

            save(data)
        }
    }

    if (isLoading) {
        return (<Spinner />)
    }


    return (
        <div>
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
            </form>
            <div className="form-group d-flex justify-content-between">
                <button onClick={() => validate()} className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                    <span>Guardar</span>
                    {
                        isLoading ?
                            <div className='spinner-border' role='status'></div>
                            : null
                    }

                </button>
                {
                    conterm && conterm.id &&
                    <button className="btn btn-danger"
                        onClick={() => destroyItem(conterm.id)}
                    >Eliminar</button>
                }

            </div>
        </div>
    )
}

