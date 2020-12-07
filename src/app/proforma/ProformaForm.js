import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProformaForm() {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})

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
                        <label>País de Destino</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            <option>Chile</option>
                            <option>Argentina</option>
                        </select>
                    </div>

                    <div className="form-group col-xl-2">
                        <label>Proveedor Regional</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
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
                    <div className="form-group col-xl-2 ">
                        <label>Categoría N5</label>
                        <select
                            className={`form-control form-control-sm`}
                        >
                            <option value="">Seleccione...</option>
                            {/* <option>Chile</option>
                            <option>Argentina</option> */}
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