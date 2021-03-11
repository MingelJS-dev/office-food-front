import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import logoCenco from "../../assets/cencosud_logo.png"
import ProformaView from "../../assets/proforma_view.png"
import GeneralView from "../../assets/general_view.png"
import Figure from 'react-bootstrap/Figure';
import Spinner from '../shared/Spinner.js';
import Card from 'react-bootstrap/Card';
import history from '../../history.js'

import "./HomePage.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faShip, faChartArea, faUser, faUserCircle, faLifeRing } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {

    return (
        <div>
            <div className="banner">
                <div className="banner-info">
                    <Figure>
                        <Figure.Image width={100} height={100} alt="100x100" src={logoCenco} />
                    </Figure>
                    <h1>Bienvenido a <br />Back Office Web</h1>
                </div>
            </div>
            <Services />
        </div>
    )
}
function Services() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return (
        <Container fluid>
            <Row className="pt-3 d-flex justify-content-center services">
                <Col lg={12} className="text-center">
                    <h1>Servicios</h1>
                    <hr />
                </Col>
                <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(isLoggedIn ? '/proformas' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faShip} size="5x" /></Card.Title>
                            <Card.Title><h5>Proformas</h5></Card.Title>
                            <Card.Text>Creación y modificación.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(isLoggedIn ? '/products' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faCog} size="5x" /></Card.Title>
                            <Card.Title><h5>Artículos</h5></Card.Title>
                            <Card.Text>Gestión de artículos.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(isLoggedIn ? '/proformas' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faChartArea} size="5x" /></Card.Title>
                            <Card.Title><h5>KPI</h5></Card.Title>
                            <Card.Text>Visualización de datos.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(isLoggedIn ? '/providers' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faUserCircle} size="5x" /></Card.Title>
                            <Card.Title><h5>Proveedores</h5></Card.Title>
                            <Card.Text>Gestión de proveedores.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(isLoggedIn ? '/ports' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faLifeRing} size="5x" /></Card.Title>
                            <Card.Title><h5>Puertos</h5></Card.Title>
                            <Card.Text>Gestión de puertos.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card  onClick={() => history.push(isLoggedIn ? '/users' : '/login')} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faUser} size="5x" /></Card.Title>
                            <Card.Title><h5>Usuarios</h5></Card.Title>
                            <Card.Text>Gestión de usuarios.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row className="pt-3 d-flex justify-content-center services">
                  <Col lg={2} className="text-center">
                    <Card onClick={() => history.push(`/login`)} style={{ height: '250px' }} className="mb-3 card-custom card-home">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon className="icon" icon={faUser} size="5x" /></Card.Title>
                            <Card.Title>Proveedores</Card.Title>
                            <Card.Text>Gestión de proveedores.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card style={{ height: '250px' }} className="mb-3 card-custom">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faUser} size="5x" /></Card.Title>
                            <Card.Title>Comex</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="text-center">
                    <Card style={{ height: '250px' }} className="mb-3 card-custom">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faUser} size="5x" /></Card.Title>
                            <Card.Title>Extraibles</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            {/* <Row className="pt-3 d-flex justify-content-center services">
                <Col lg={12} className="text-center">
                    <h1>Servicios</h1>
                    <hr />
                </Col>
                <Col lg={6} className="text-center">
                    <Card border="primary" style={{ height: '500px' }} className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Gestión de proformas</span>
                        </Card.Header>
                        <Card.Img variant="top" className="" width={600} height={350} src={ProformaView} />
                        <Card.Body>
                            <Card.Text>
                                <h5>
                                    Creación y modificación desde excel y web.
                    </h5>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="text-center">
                    <Card border="primary" style={{ height: '500px' }} className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Gestión de Maestras</span>
                        </Card.Header>
                        <Card.Img variant="top" className="" width={500} height={350} src={GeneralView} />
                        <Card.Body>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="text-center">
                    <Card border="primary" style={{ height: '500px' }} className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Extraíbles</span>
                        </Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}

        </Container>
    )

}


