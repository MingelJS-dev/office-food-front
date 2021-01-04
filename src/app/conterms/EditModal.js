import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ContermForm from './ContermsForm.js'
import * as ContainerActions from '../../actions/containers.actions.js'
import * as IncotermActions from '../../actions/incoterms.actions.js'

import swal from 'sweetalert';


export default function EditModal({ show, onHide, type, conterm }) {
    const dispatch = useDispatch()


    function updateData(data) {
        switch (type) {
            case 'container':
                dispatch(ContainerActions.updateById(data)).then(onHide())
                break;

            case 'incoterm':
                dispatch(IncotermActions.updateById(data)).then(onHide())

            default:
                break;
        }

    }

    function destroyItem(id) {
        switch (type) {
            case 'container':
                swal({
                    title: "¿Está seguro que desea eliminar el contenedor?",
                    icon: "warning",
                    dangerMode: true,
                    buttons: ["Cancelar", "Eliminar"],
                })
                    .then(ok => {
                        if (ok) {
                            dispatch(new ContainerActions.destroyById(id)).then(onHide())
                        }
                    });
                break;

            case 'incoterm':
                swal({
                    title: "¿Está seguro que desea eliminar el incoterm?",
                    icon: "warning",
                    dangerMode: true,
                    buttons: ["Cancelar", "Eliminar"],
                })
                    .then(ok => {
                        if (ok) {
                            dispatch(new IncotermActions.destroyById(id)).then(onHide())
                        }
                    });

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
                    Editar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <ContermForm
                                conterm={conterm}
                                save={updateData} 
                                destroyItem={destroyItem}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


