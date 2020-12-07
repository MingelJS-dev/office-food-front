import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import ProformaForm from './ProformaForm'


function ProformaPage() {
    console.log('llega')
    return (
        <Container fluid={true}>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header className='text-center'><h4>Formulario Ingreso proforma</h4></Card.Header>
                        <Card.Body>
                            <ProformaForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProformaPage;