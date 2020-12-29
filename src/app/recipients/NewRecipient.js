import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import  RecipientForm  from './RecipientForm.js'
import * as RecipientActions from '../../actions/recipients.actions.js'


export default function NewRecipientModal({ show, onHide }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // if(show) {
        //     dispatch(RolesActions.fetchRoles())
        // }
    }, [show])
  
    function createRecipient(data){
      dispatch(RecipientActions.createRecipient(data)).then(onHide())
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
                    Crear Destinatario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <RecipientForm 
                            recipient={{}}
                            save={createRecipient}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            {/* <Modal.Footer className='justify-content-between'>
                <Button onClick={onHide}></Button>
                <Button onClick={onHide}>Cancelar</Button>
            </Modal.Footer> */}
        </Modal>
    );
}


