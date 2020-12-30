import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as UserReducer from '../../reducers/users.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'
import * as PortReducer from '../../reducers/ports.reducer.js'
import * as DestinationReducer from '../../reducers/destinations.reducer.js'

export default function ProformaForm({ proforma, save }) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})
    const [DestinationId, setDestinationId] = useState(proforma.DestinationId || '')
    const [OriginId, setOriginId] = useState(proforma.OriginId || '')
    const [BuyerId, setBuyerId] = useState(proforma.BuyerId || '')
    const [CategoryId, setCategoryId] = useState(proforma.CategoryId || '')
    const [ProviderId, setProviderId] = useState(proforma.ProviderId || '')
    const [transport, setTransport] = useState(proforma.transport || '')
    const [eta, setEta] = useState(proforma.eta || '')
    const [cd, setCd] = useState(proforma.cd || '')
    const [stretch, setStretch] = useState(proforma.stretch || '')
    const [incoterm, setIncoterm] = useState(proforma.incoterm || '')
    const [container, setContainer] = useState(proforma.container || '')
    const [money, setMoney] = useState(proforma.money || '')

    const [regionalUsers, setRegionalUsers] = useState([])
    const [CountryDestinationId, setCountryDestinationId] = useState(null)
    const [portDestination, setPortDestination] = useState([])
    const [providerRut, setProviderRut] = useState(null)
    const [providerSocial, setProviderSocial] = useState(null)

    const [CountryOrigins, setCountryOrigins] = useState([])
    const [CountryOriginId, setCountryOriginId] = useState(null)
    const [portOrigins, setPortOrigins] = useState([])


    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const allCountries = useSelector(CountryReducer.getCountries)
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const ports = useSelector(PortReducer.getPorts)
    const destinations = useSelector(DestinationReducer.getDestinations)
    const users = useSelector(UserReducer.getUsers)
    const providers = useSelector(ProviderReducer.getProviders)


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
        let OriginIds = destinations.filter(x => x.PortId === parseInt(DestinationId)).map(x => x.OriginId)
        let CountryIds = ports.filter(x => OriginIds.includes(x.id)).map(x => x.CountryId)
        setCountryOrigins(allCountries.filter(x => CountryIds.includes(x.id)))
    }, [DestinationId])

    useEffect(() => {
        if (ProviderId) {
            let [provider] = providers.filter(x => x.id === parseInt(ProviderId))
            setProviderRut(provider.ProviderCategories.filter(x => x.CountryId === parseInt(CountryDestinationId))[0].rut)
            setProviderSocial(provider.ProviderCategories.filter(x => x.CountryId === parseInt(CountryDestinationId))[0].businessName)
        }

    }, [ProviderId])

    useEffect(() => {
        setPortOrigins(ports.filter(x => x.CountryId === parseInt(CountryOriginId)))
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
                BuyerId,
                DestinationId,
                OriginId,
                CategoryId,
                ProviderId,
                transport,
                eta,
                cd,
                // stretch,
                incoterm,
                container,
                money
            }

            save(data)
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

                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>Transporte</label>
                        <select
                            className={`form-control form-control-sm`}
                            onChange={(e => setTransport(e.target.value))}
                            defaultValue={transport}
                        >
                            <option value="">Seleccione...</option>
                            <option value="Aereo">Aereo</option>
                            <option value="Maritimo">Maritimo</option>
                            <option value="Terrestre">Terrestre</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>ETA</label>
                        <div className='d-flex'>
                            <input type="date" id="start" name="trip-start"
                                onChange={(e => setEta(e.target.value))}
                                className={`form-control form-control-sm`}
                            ></input>
                        </div>

                    </div>
                    <div className="form-group col-xl-2 p-0">
                        <label>Incoterm</label>
                        <input
                            type="text"
                            onChange={(x) => setIncoterm(x.target.value)}
                            value={incoterm}
                            className={`form-control form-control-sm`}
                        />
                    </div>
                </Row>
                <Row className='justify-content-between'>

                    <div className="form-group col-xl-2 p-0">
                        <label>Puerto/Aeropuerto de Destino</label>
                        <select
                            className={`form-control form-control-sm`}
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
                                value={cd}
                                className={`form-control form-control-sm`}
                            ></input>
                        </div>

                    </div>

                    <div className="form-group col-xl-2 p-0">
                        <label>Tipo de Contenedor</label>
                        <select
                            onChange={(x) => setContainer(x.target.value)}
                            value={container}
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option value='40HC'>40HC</option>
                            <option value='20RH'>20RH</option>
                        </select>
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
                            className={`form-control form-control-sm`}
                            onChange={(x) => setMoney(x.target.value)}
                        >
                            <option value="">Seleccione...</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option value='CLP'>CLP</option>
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