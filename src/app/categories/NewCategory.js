import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import  CategoryForm  from './CategoryForm.js'
import * as CategoryActions from '../../actions/categories.actions.js'


export default function NewCategoryModal({ show, onHide, level }) {
    const dispatch = useDispatch()

  
    function createCategory(data){
      dispatch(CategoryActions.createCategory(data)).then(onHide())
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
                    Crear Categoría
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid >
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <CategoryForm 
                            category={{}}
                            level={1}
                            save={createCategory}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


