import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ContermForm from './ContermsForm.js'
import * as ContainerActions from '../../actions/containers.actions.js'
import * as IncotermActions from '../../actions/incoterms.actions.js'

export default function NewModal({ show, onHide, type }) {
    const dispatch = useDispatch()
console.log('fdggfsdfg', type)

    function createData(data) {
        switch (type) {
            case 'container':
                dispatch(ContainerActions.createContainer(data)).then(onHide())
                break;

            case 'incoterm':
                dispatch(IncotermActions.createIncoterm(data)).then(onHide())

            default:
                break;
        }

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
                    Crear
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <ContermForm
                                conterm={{}}
                                save={createData} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


