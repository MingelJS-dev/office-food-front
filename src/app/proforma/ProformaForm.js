import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as UserReducer from '../../reducers/users.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'
import * as PortReducer from '../../reducers/ports.reducer.js'
import * as DestinationReducer from '../../reducers/destinations.reducer.js'
import * as IncotermReducer from '../../reducers/incoterms.reducer.js'
import * as ContianerReducer from '../../reducers/containers.reducer.js'

export default function ProformaForm({ proforma, previous, save }) {

    const [name, setName] = useState(proforma.name || '')
    const [errors, setErrors] = useState({})
    const [DestinationId, setDestinationId] = useState(proforma.DestinationId || '')
    const [OriginId, setOriginId] = useState(proforma.OriginId || '')
    const [BuyerId, setBuyerId] = useState(proforma.BuyerId || '')
    const [CategoryId, setCategoryId] = useState(proforma.CategoryId || '')
    const [ProviderId, setProviderId] = useState(proforma.ProviderId || '')
    const [transport, setTransport] = useState(proforma.transport || (proforma.Destination && proforma.Destination.type) || '')
    const [eta, setEta] = useState(proforma.eta || '')
    const [cd, setCd] = useState(proforma.cd || '')
    const [stretch, setStretch] = useState(proforma.stretch || '')
    const [IncotermId, setIncotermId] = useState(proforma.IncotermId || '')
    const [ContainerId, setContainerId] = useState(proforma.ContainerId || '')
    const [money, setMoney] = useState(proforma.money || '')

    const [regionalUsers, setRegionalUsers] = useState([])
    const [CountryDestinationId, setCountryDestinationId] = useState(proforma.CountryDestinationId || (proforma.Destination && proforma.Destination.CountryId) || null)
    const [portDestination, setPortDestination] = useState([])
    const [providerRut, setProviderRut] = useState(null)
    const [providerSocial, setProviderSocial] = useState(null)

    const [CountryOrigins, setCountryOrigins] = useState([])
    const [CountryOriginId, setCountryOriginId] = useState(proforma.CountryOriginId || (proforma.Origin && proforma.Origin.CountryId) || null)
    const [portOrigins, setPortOrigins] = useState([])


    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const allCountries = useSelector(CountryReducer.getCountries)
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const ports = useSelector(PortReducer.getPorts)
    const destinations = useSelector(DestinationReducer.getDestinations)
    const users = useSelector(UserReducer.getUsers)
    const providers = useSelector(ProviderReducer.getProviders)
    const incoterms = useSelector(IncotermReducer.getIncoterms)
    const containers = useSelector(ContianerReducer.getContainers)


    const [selectN5s, setN5s] = useState([])
    const [selectProviders, setSelectProviders] = useState([])
    let currentProviders = []

    useEffect(() => {
        setRegionalUsers(users.filter(x => x.UserRoles[0].Role.name === 'regional-buyer'))
    }, [users, users.length])

    useEffect(() => {
        setN5s(categoriesN5.filter(x => x.CountryId === parseInt(CountryDestinationId)))
    }, [CountryDestinationId])

    useEffect(() => {
        setPortDestination(ports.filter(x => x.CountryId === parseInt(CountryDestinationId)))
    }, [CountryDestinationId])
 
    useEffect(() => {
        let OriginIds = destinations.filter(x => x.OriginId === parseInt(DestinationId)).map(x => x.PortId)
        let CountryIds = ports.filter(x => OriginIds.includes(x.id)).map(x => x.CountryId)
        setCountryOrigins(allCountries.filter(x => CountryIds.includes(x.id)))
    }, [DestinationId])

    useEffect(() => {
        if (ProviderId && providers.length > 0) {
            let [provider] = providers.filter(x => x.id === parseInt(ProviderId))
            setProviderRut(provider.ProviderCategories.filter(x => x.CountryId === parseInt(CountryDestinationId))[0].rut)
            setProviderSocial(provider.ProviderCategories.filter(x => x.CountryId === parseInt(CountryDestinationId))[0].businessName)
        }

    }, [ProviderId, providers, providers.length])

    useEffect(() => {
        let OriginIds = destinations.filter(x => x.OriginId === parseInt(DestinationId)).map(x => x.PortId)
        let portsByDestination = ports.filter(x => OriginIds.includes(x.id))
        setPortOrigins(portsByDestination)
    }, [CountryOriginId])

    useEffect(() => {

        providers.map(x => {
            const item = x.ProviderCategories.filter(pc => pc.CategoryId === parseInt(CategoryId))

            if (item && item.length) {
                currentProviders.push(x)
            }
        })

        setSelectProviders(currentProviders)
    }, [CategoryId])

    function validate() {
        // e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Proforma es requerida.'])
        }

        if (!BuyerId) {
            validations.push(['BuyerId', 'Comprador regional es requerido.'])
        }

        if (!DestinationId) {
            validations.push(['DestinationId', 'Destino es requerido.'])
        }

        if (!OriginId) {
            validations.push(['OriginId', 'Origen es requerido.'])
        }

        if (!CategoryId) {
            validations.push(['CategoryId', 'Categoría es requerida.'])
        }

        if (!ProviderId) {
            validations.push(['ProviderId', 'Proveedor es requerido.'])
        }

        if (!transport) {
            validations.push(['transport', 'Transporte es requerido.'])
        }

        if (!eta) {
            validations.push(['eta', 'ETA es requerida.'])
        }

        if (!cd) {
            validations.push(['cd', 'CD es requerida.'])
        }

        if (!IncotermId) {
            validations.push(['IncotermId', 'Incoterm es requerido.'])
        }

        if (!ContainerId) {
            validations.push(['ContainerId', 'Contenedor es requerido.'])
        }

        if (!money) {
            validations.push(['money', 'Moneda es requerida.'])
        }

        if (!CountryDestinationId) {
            validations.push(['CountryDestinationId', 'País de destino es requerido.'])
        }

        if (!CountryOriginId) {
            validations.push(['CountryOriginId', 'País de origen es requerido.'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                name,
                BuyerId,
                DestinationId,
                OriginId,
                CategoryId,
                ProviderId,
                transport,
                eta,
                cd,
                // stretch,
                IncotermId,
                ContainerId,
                money,
                CountryDestinationId,
                CountryOriginId
            }

            if (proforma.id) {
                data.id = proforma.id
            }

            save(data)
        }
    }

    const parseDate = (data) => {
        const value = new Date(data)
        let month = value.getMonth() + 1
        let date = value.getDate()

        if (month < 10) {
            month = `0${month}`
        }
        if (date < 10) {
            date = `0${date}`
        }

        return value.getFullYear() + "-" + month + "-" + date;
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
                        <select
                            className={`form-control form-control-sm ${errors.BuyerId ? 'is-invalid' : ''}`}
                            onChange={(e => setBuyerId(e.target.value))}
                            value={BuyerId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                regionalUsers.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.first_name + ' ' + item.last_name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.BuyerId}</div>
                    </div>


                </Row>
                <Row className='justify-content-between'>
                    <div className="form-group col-xl-2 p-0">
                        <label>País de Destino</label>
                        <select
                            className={`form-control form-control-sm ${errors.CountryDestinationId ? 'is-invalid' : ''}`}
                            onChange={(e => setCountryDestinationId(e.target.value))}
                            value={CountryDestinationId}
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
                        <div className="invalid-feedback">{errors.CountryDestinationId}</div>
                    </div>

                    <div className="form-group col-xl-2 p-0">
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
                        <div className="invalid-feedback">{errors.ProviderId}</div>
                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>Transporte</label>
                        <select
                            className={`form-control form-control-sm ${errors.transport ? 'is-invalid' : ''}`}
                            onChange={(e => setTransport(e.target.value))}
                            defaultValue={transport}
                        >
                            <option value="">Seleccione...</option>
                            <option value="Aereo">Aereo</option>
                            <option value="Maritimo">Maritimo</option>
                            <option value="Terrestre">Terrestre</option>
                        </select>

                        <div className="invalid-feedback">{errors.transport}</div>
                    </div>

                    <div className="form-group">
                        <label>ETA</label>
                        <div className='d-flex'>
                            <input type="date" id="start" name="trip-start"
                                onChange={(e => setEta(e.target.value))}
                                value={parseDate(eta)}
                                className={`form-control form-control-sm ${errors.eta ? 'is-invalid' : ''}`}
                            ></input>
                        </div>

                        <div className="invalid-feedback">{errors.eta}</div>
                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>Incoterm</label>

                        <select
                            className={`form-control form-control-sm ${errors.IncotermId ? 'is-invalid' : ''}`}
                            onChange={(e => setIncotermId(e.target.value))}
                            value={IncotermId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                incoterms.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.IncotermId}</div>
                    </div>
                </Row>
                <Row className='justify-content-between'>

                    <div className="form-group col-xl-2 p-0">
                        <label>Puerto/Aeropuerto de Destino</label>
                        <select
                            className={`form-control form-control-sm ${errors.DestinationId ? 'is-invalid' : ''}`}
                            onChange={(e => setDestinationId(e.target.value))}
                            value={DestinationId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                portDestination.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.DestinationId}</div>
                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Razón Social</label>
                        <input
                            type="text"
                            value={providerSocial}
                            className={`form-control form-control-sm p-0`}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>País de Origen</label>
                        <select
                            className={`form-control form-control-sm ${errors.CountryOriginId ? 'is-invalid' : ''}`}
                            onChange={(e => setCountryOriginId(e.target.value))}
                            value={CountryOriginId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                CountryOrigins.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.CountryOriginId}</div>
                    </div>

                    <div className="form-group">
                        <label>Fecha de CD</label>
                        <div className='d-flex'>
                            {/* <input
                                type="text"
                                className={`form-control form-control-sm`}
                            /> */}
                            <input type="date" id="start" name="trip-start"
                                onChange={(x) => setCd(x.target.value)}
                                value={parseDate(cd)}
                                className={`form-control form-control-sm  ${errors.cd ? 'is-invalid' : ''}`}
                            ></input>
                        </div>

                        <div className="invalid-feedback">{errors.cd}</div>
                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Tipo de Contenedor</label>
                        <select
                            className={`form-control form-control-sm ${errors.ContainerId ? 'is-invalid' : ''}`}
                            onChange={(e => setContainerId(e.target.value))}
                            value={ContainerId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                containers.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.ContainerId}</div>
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

                        <div className="invalid-feedback">{errors.CategoryId}</div>
                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Rut Proveedor</label>
                        <input
                            type="text"
                            className={`form-control form-control-sm`}
                            value={providerRut}
                            disabled={true}
                        />
                    </div>

                    <div className="form-group col-xl-2 p-0 pr-1">
                        <label>Puerto de Origen</label>
                        <select
                            className={`form-control form-control-sm ${errors.OriginId ? 'is-invalid' : ''}`}
                            onChange={(e => setOriginId(e.target.value))}
                            value={OriginId}
                        >
                            <option value="">Seleccione...</option>
                            {
                                portOrigins.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{item.name}</option>
                                ))
                            }
                        </select>

                        <div className="invalid-feedback">{errors.OriginId}</div>
                    </div>

                    {/* <div className="form-group col-xl-1">
                        <label>Tramo Proforma</label>
                        <input
                            type="text"
                            onChange={(x) => setStretch(x.target.value)}
                            value={stretch}
                            className={`form-control form-control-sm`}
                        />
                    </div> */}

                    <div className="form-group col-xl-2 p-0">
                        <label>Moneda</label>
                        <select
                            className={`form-control form-control-sm ${errors.money ? 'is-invalid' : ''}`}
                            onChange={(x) => setMoney(x.target.value)}
                            value={money}
                        >
                            <option value="">Seleccione...</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option value='CLP'>CLP</option>
                        </select>

                        <div className="invalid-feedback">{errors.money}</div>
                    </div>
                </Row>
            </form>

            {
                previous &&
                <Row className="form-group d-flex justify-content-center">
                    <Col>
                        <button onClick={() => previous()} className={`btn btn-block btn-second-blue`}>
                            <span>Atras</span>
                        </button>
                    </Col>
                    <Col>
                        <button onClick={() => validate()} className={`btn btn-block btn-second-blue`}>
                            <span>Siguiente</span>
                        </button>
                    </Col>
                </Row> ||
                <Col>
                    <button onClick={() => validate()} className={`btn btn-block btn-second-blue`}>
                        <span>Guardar</span>
                    </button>
                </Col>
            }
            
        </Container>
    )

}