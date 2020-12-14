import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'


export default function ProviderForm({ providerCategory, dataCategories }) {
    const [rut, setRut] = useState(providerCategory.rut || '')
    const [businessName, setBusinessName] = useState(providerCategory.businessName || '')
    // const [contact, setContact] = useState(provider.contact || '')
    const [errors, setErrors] = useState({})
 
    // const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    // const categories = [...new Set(categoriesN5.map(x => x.name))]
    // console.log(categories)
    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!rut) {
            validations.push(['name', 'Nombre es requerido.'])
        }

        if (!providerCategory.id && !businessName) {
            validations.push(['CategoryId', 'Categoría es requerida.'])
        }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            // let selectCategories = categoriesN5.filter(x => x.name === category)
            // const data = {
            //     name,
            //     selectCategories,
            //     contact,
            //     contactEmail,
            //     paymentInstrument,
            //     setPaymentDeadline
            // }

            // if (provider.id) {
            //     data.id = provider.id
            // }

            // save(data)
        }
    }

    const changeData = (data) => {
        let info = {}
        if(data.name === 'rut') {
            setRut(data.value)
        }

        if(data.name === 'businessName') {
            setBusinessName(data.value)
        }


        info['CountryId'] = providerCategory.CountryId
        info['CategoryId'] = providerCategory.id

        info = { ...info, ...data}
        dataCategories(info)
    }

    return (
        <Container fluid>
            <form onSubmit={validate} noValidate>
                <Row className='justify-content-center'>
                    <Col>
                        <div className="form-group pr-2">
                            <label>Rut</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.rut ? 'is-invalid' : ''}`}
                                onChange={(x) => changeData({name:'rut' , value: x.target.value}) }
                                value={rut}
                            />

                            <div className="invalid-feedback">{errors.rut}</div>
                        </div>

                    </Col>
                    <Col>
                        <div className="form-group pr-2">
                            <label>Razón Social</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.businessName ? 'is-invalid' : ''}`}
                                onChange={(x) => changeData({name:'businessName', value: x.target.value})}
                                value={businessName}
                            />

                            <div className="invalid-feedback">{errors.businessName}</div>
                        </div>
                    </Col>
                </Row>
                {/* <div className="form-group d-flex justify-content-center">
                    <button className={`btn btn-primary`}>
                        <span>Guardar</span>
                    </button>
                </div> */}

            </form>
        </Container>
    )
}