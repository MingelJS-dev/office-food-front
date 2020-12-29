import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import  RecipientForm  from './RecipientForm.js'
import * as RecipientActions from '../../actions/recipients.actions.js'

export default function EditRecipientModal({ show, onHide, recipient }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // if(show) {
        //     dispatch(RolesActions.fetchRoles())
        // }
    }, [show])
  
    function updateRecipient(data){
      dispatch(RecipientActions.updateById(data)).then(onHide())
    }

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
                    Editar Destinatario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <RecipientForm 
                            recipient={recipient}
                            save={updateRecipient}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


