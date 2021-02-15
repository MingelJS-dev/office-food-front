import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'

import * as FileActions from '../../actions/files.actions.js'

export default function ModalTemplate({ show, onHide }) {
    const dispatch = useDispatch()

    const [CountryId, setCountryId] = useState('')
    const [CategoryId, setCategoryId] = useState('')
    const [errors, setErrors] = useState({})
    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const categories = useSelector(CategoryReducer.getCategoryN5s)
    // const [show, setShow] = useState(isShow ? true : false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // useEffect(() => {
    //     console.log(isShow)
    //     if(isShow) {
    //         handleShow()
    //     }
    // }, [isShow])

    function validate() {
        const validations = []
       
        if (!CountryId) {
            validations.push(['CountryId', 'País es requerido'])
        }

        if (!CategoryId) {
            validations.push(['CategoryId', 'Categoría es requerido'])
        }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                CountryId,
                CategoryId
            }

            exportMassiveTemplate(data)
        }
    }

    function exportMassiveTemplate(data) {
        dispatch(FileActions.exportMassiveTemplate(data))
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
                        <Col lg={6}>
                            <form>
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
                                    <label>Categoría</label>

                                    <select
                                        className={`form-control ${errors.CategoryId ? 'is-invalid' : ''}`}
                                        onChange={(e => setCategoryId(e.target.value))}
                                        value={CategoryId}
                                    >
                                        <option value="">Seleccione...</option>
                                        {
                                            categories.map(item => (
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
                                    <label>Tipo Compra</label>
                                    <select
                                        className={`form-control`}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option>Importado</option>
                                        <option>Local</option>
                                    </select>
                                </div>
                            </form>
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button onClick={() => validate()}>Extraer Template</Button>
                <Button onClick={onHide}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}


