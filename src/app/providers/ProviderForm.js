import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import * as CategoryReducer from '../../reducers/categories.reducer.js'

export default function ProviderForm({ provider, save, setCategories }) {
    const [name, setName] = useState(provider.name || '')
    const [category, setCategory] = useState(provider.category || '')
    const [contact, setContact] = useState(provider.contact || '')
    const [contactEmail, setContactEmail] = useState(provider.contactEmail || '')
    const [paymentInstrument, setPaymentInstrument] = useState(provider.paymentInstrument || '')
    const [paymentDeadline, setPaymentDeadline] = useState(provider.paymentInstrument || '')
    const [errors, setErrors] = useState({})
  
    const categoriesN5 = useSelector(CategoryReducer.getCategoryN5s)
    const categories = [...new Set(categoriesN5.map(x => x.name))]
 
    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!name) {
            validations.push(['name', 'Nombre es requerido.'])
        }

        if (!provider.id && !category) {
            validations.push(['category', 'Categoría es requerida.'])
        }

        if (!provider.id && !contact) {
            validations.push(['contact', 'Contacto es requerido.'])
        }

        if (!provider.id && !contactEmail) {
            validations.push(['contactEmail', 'Mail contacto es requerido.'])
        }

        if (!provider.id && !paymentInstrument) {
            validations.push(['paymentInstrument', 'Intrumento de pago es requerido.'])
        }

        if (!provider.id && !paymentInstrument) {
            validations.push(['paymentDeadline', 'Plazo de pago es requerido.'])
        }


        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
           
            const data = {
                name,
                // selectCategories,
                contact,
                contactEmail,
                paymentInstrument,
                paymentDeadline
            }

            if (provider.id) {
                data.id = provider.id
            }
    
            save(data)
        }
    }

    const selectCategories = (name) => {
        setCategory(name)
        let selectCategoriesItem = categoriesN5.filter(x => x.name === name)
        setCategories(selectCategoriesItem)
    }

    return (
        <Container fluid>
            <form onSubmit={validate} noValidate>
                <Row className='justify-content-center'>
                    <Col>
                        <div className="form-group pr-2">
                            <label>Proveedor Regional</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                                onChange={(x) => setName(x.target.value)}
                                value={name}
                            />

                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="form-group pr-2 p-0">
                        <label>Categoría N5</label>
                            <select
                               className={`form-control form-control-sm ${errors.category ? 'is-invalid' : ''}`}
                                onChange={(e => selectCategories(e.target.value))}
                                defaultValue={category}
                            >
                                {
                                    provider && provider.category ? 
                                    <option value="">{provider.category}</option>
                                    :  <option value="">Seleccione...</option>
                                }
                               
                                {
                                    categories.map(item => (
                                        <option
                                            key={item}
                                            value={item}
                                        >{item}</option>
                                    ))
                                }
                            </select>
                            <div className="invalid-feedback">{errors.category}</div>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group pr-2">
                            <label>Contacto</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.contact ? 'is-invalid' : ''}`}
                                onChange={(x) => setContact(x.target.value)}
                                value={contact}
                            />

                            <div className="invalid-feedback">{errors.contact}</div>
                        </div>

                        <div className="form-group pr-2">
                            <label>Mail Contacto</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.contactEmail ? 'is-invalid' : ''}`}
                                onChange={(x) => setContactEmail(x.target.value)}
                                value={contactEmail}
                            />

                            <div className="invalid-feedback">{errors.contactEmail}</div>
                        </div>
                        <div className="form-group pr-2">
                            <label>Instrumento de pago</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.paymentInstrument ? 'is-invalid' : ''}`}
                                onChange={(x) => setPaymentInstrument(x.target.value)}
                                value={paymentInstrument}
                            />

                            <div className="invalid-feedback">{errors.paymentInstrument}</div>
                        </div>
                        <div className="form-group pr-2">
                            <label>Plazo pago</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.paymentDeadline ? 'is-invalid' : ''}`}
                                onChange={(x) => setPaymentDeadline(x.target.value)}
                                value={paymentDeadline}
                            />

                            <div className="invalid-feedback">{errors.paymentDeadline}</div>
                        </div>
                    </Col>
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