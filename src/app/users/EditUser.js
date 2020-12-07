import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import  UserForm  from './UserForm.js'
import * as UserActions from '../../actions/users.actions.js'
import * as RolesActions from '../../actions/roles.actions.js'

export default function EditUserModal({ show, onHide, user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(show) {
            dispatch(RolesActions.fetchRoles())
        }
    }, [show])
  
    function updateUser(data){
      dispatch(UserActions.updateUserById(data)).then(onHide())
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
                    Editar Usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <UserForm 
                            user={user}
                            save={updateUser}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


