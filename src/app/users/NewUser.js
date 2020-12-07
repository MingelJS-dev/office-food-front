import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import  UserForm  from './UserForm.js'
import * as UserActions from '../../actions/users.actions.js'
import * as RolesActions from '../../actions/roles.actions.js'

export default function UserModal({ show, onHide }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(show) {
            dispatch(RolesActions.fetchRoles())
        }
    }, [show])
  
    function createUser(data){
      dispatch(UserActions.createUser(data)).then(onHide())
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
                    Crear Usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <UserForm 
                            user={{}}
                            save={createUser}/>
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


