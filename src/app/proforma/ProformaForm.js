import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as UserReducer from '../../reducers/users.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'

export default function ProformaForm({ proforma, save }) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})
    const [CountryId, setCountryId] = useState(proforma.CountryId || '')
    const [CategoryId, setCategoryId] = useState(proforma.CategoryId || '')
    const [ProviderId, setProviderId] = useState(proforma.ProviderId || '')
    const countries = useSelector(CountryReducer.getCountries)
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const users = useSelector(UserReducer.getUsers)
    const providers = useSelector(ProviderReducer.getProviders)

    const [selectN5s, setN5s] = useState([])
    const [selectProviders, setSelectProviders] = useState([])
    let currentProviders = []
    useEffect(() => {
        setN5s(categoriesN5.filter(x => x.CountryId === parseInt(CountryId)))
    }, [CountryId])

    useEffect(() => {
      
       providers.map(x => {
          const item = x.ProviderCategories.filter(pc => pc.CategoryId === parseInt(CategoryId))

          if(item && item.length) {
              currentProviders.push(x)
          }
       })
  
        setSelectProviders(currentProviders)
    }, [CategoryId])

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Proforma es requerida.'])
        }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
            }

            // save(data)
        }
    }

    return (
        <Container fluid>
            <form onSubmit={validate} noValidate>
                <Row className='justify-content-center'>
                    <div className="form-group pr-2">
                        <label>Proforma</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                            onChange={(x) => setName(x.target.value)}
                            value={name}
                        />

                        <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label>Comprador Regional</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm`}
                        />
                    </div>
                </Row>

                <Row className='justify-content-between'>
                    <div className="form-group col-xl-2 p-0">
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

                    <div className="form-group col-xl-2">
                        <label>Proveedor Regional</label>

                            <select
                                className={`form-control form-control-sm ${errors.ProviderId ? 'is-invalid' : ''}`}
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
                     
                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>Transporte</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm`}
                        />
                    </div>

                    <div className="form-group">
                        <label>ETA</label>
                        <div className='d-flex'>
                            <input
                                type="text"
                                className={`form-control form-control-sm`}
                            />
                            <input type="date" id="start" name="trip-start"

                                className={`form-control form-control-sm`}
                            ></input>
                        </div>

                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Incoterm</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm`}
                        />
                    </div>

                </Row>

                <Row className='justify-content-between'>
                    <div className="form-group col-xl-2 p-0">
                        <label>Categoría N5</label>
                        <select
                            className={`form-control form-control-sm ${errors.CategoryId ? 'is-invalid' : ''}`}
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
                    </div>

                    <div className="form-group col-xl-2">
                        <label>País de Origen</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option>Chile</option>
                            <option>Argentina</option>
                        </select>
                    </div>
                    <div className="form-group col-xl-2 p-0 pr-3">
                        <label>Razón Social</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm p-0`}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de CD</label>
                        <div className='d-flex'>
                            <input
                                type="text"
                                className={`form-control form-control-sm`}
                            />
                            <input type="date" id="start" name="trip-start"

                                className={`form-control form-control-sm`}
                            ></input>
                        </div>

                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Tipo de Contenedor</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option>40HC</option>
                            <option>20RH</option>
                        </select>
                    </div>
                </Row>

                <Row className='justify-content-center'>
                    <div className="form-group col-xl-2 p-0">
                        <label>Puerto/Aeropuerto de Destino</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option>Chile</option>
                            <option>Argentina</option>
                        </select>
                    </div>
                    <div className="form-group col-xl-2">
                        <label>Rut Proveedor</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm`}
                        />
                    </div>
                    <div className="form-group col-xl-2">
                        <label>Puerto de Origen</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option>Chile</option>
                            <option>Argentina</option>
                        </select>
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