import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

export default function ModalTemplate({ show, onHide }) {
    // const [show, setShow] = useState(isShow ? true : false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // useEffect(() => {
    //     console.log(isShow)
    //     if(isShow) {
    //         handleShow()
    //     }
    // }, [isShow])
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  closeButton>
                <Modal.Title  className='text-center' id="contained-modal-title-vcenter">
                    Template Carga Masiva Proformas
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <form>
                                <div className="form-group">
                                    <label>País</label>
                                    <select
                                        className={`form-control`}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option>Chile</option>
                                        <option>Argentina</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select
                                        className={`form-control`}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option>Abarrotes</option>
                                        <option>Botillería</option>
                                    </select>
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
                <Button onClick={onHide}>Extraer Template</Button>
                <Button onClick={onHide}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}


