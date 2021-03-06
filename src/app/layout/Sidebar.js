import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth.actions.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Figure from 'react-bootstrap/Figure';
import { slide as Menu } from 'react-burger-menu'

import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import './sidebar.css'
import { Accordion, Card, AccordionContext, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import logoCenco from "../../assets/cencosud_logo.png"

// Modal Section
import ModalTemplate from "../proforma/ModalTemplate.js"
import UserModal from '../users/NewUser.js'
import * as Permission from "../shared/Permission.js"
import { CurrentUserContext } from '../../App.js'

function ListSidebar() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowUser, setModalShowUser] = useState(false);
    const currentUser = useContext(CurrentUserContext)
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Proforma
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/proformas" className="bm-item-list">
                                        <span>Ver Proformas</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proformas/new" className="bm-item-list">
                                        <span>Ingresar Proforma</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Carga masiva</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Enviar Correo</span>
                                    </NavLink>
                                </li>
                            </ul>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="6">
                        Puertos
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/ports" className="bm-item-list">
                                        <span>Ver puertos</span>
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink to="/ports/new" className="bm-item-list">
                                        <span>Crear puerto</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Extraer maestra</span>
                                    </NavLink>
                                </li>
                            </ul>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                {
                    !Permission.isRegionalBuyer(currentUser.role) ?
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Jerarquía
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body className='p-1'>
                                    <ul>
                                        <li>
                                            <NavLink to="/categories" className="bm-item-list">
                                                <span>Ver jerarquía</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        : ''
                }
                {
                    !Permission.isRegionalBuyer(currentUser.role) ?
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                Proveedor
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body className='p-1'>
                                    <ul>
                                        <li>
                                            <NavLink to="/providers" className="bm-item-list">
                                                <span>Ver Proveedores</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/providers/new" className="bm-item-list">
                                                <span>Crear Proveedor</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <Button
                                                className="btn-without">
                                                <span>Descargar Maestra</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        : ''
                }
                {
                    !Permission.isRegionalBuyer(currentUser.role) ?

                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                Artículos
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body className='p-1'>
                                    <ul>
                                        <li>
                                            <NavLink to="/products" className="bm-item-list">
                                                <span>Ver artículos</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/proforma" className="bm-item-list">
                                                <span>Descargar Maestra</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        : ''
                }


                {
                    Permission.isAdmin(currentUser.role) ?
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="5">
                                Usuarios
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                                <Card.Body className='p-1'>
                                    <ul>
                                        <li>
                                            <NavLink to="/users" className="bm-item-list">
                                                <span>Ver Usuarios</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <Button
                                                onClick={() => setModalShowUser(true)}
                                                className="btn-without bm-item-list">
                                                <span>Crear Usuario</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card> : ''
                }
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="7">
                        Destinatarios
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="7">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/recipients" className="bm-item-list">
                                        <span>Ver destinatarios</span>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Extraer maestra</span>
                                    </NavLink>
                                </li> */}
                            </ul>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="8">
                        Contenedores & Incoterm
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="8">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/conterms" className="bm-item-list">
                                        <span>Mantenedor</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
            <ModalTemplate show={modalShow}
                onHide={() => setModalShow(false)} />
            <UserModal show={modalShowUser}
                onHide={() => setModalShowUser(false)} />
        </>
    );
}

function Header() {
    // const logoURL = useSelector(AuthReducer.getLogo)
    // const appName = useSelector(AuthReducer.getAppName)
    // const settings = useSelector(AuthReducer.getSettings)
    // const companyName = useSelector(AuthReducer.getCompanyName)

    // document.title = appName

    let logo

    // if (logoURL) {
    logo = <Figure.Image width={100} height={100} alt="100x100" src={logoCenco} />
    // } else {
    // logo = (
    //   <h5 className="text-white font-weight-bold">icon</h5>
    // )
    // }

    return (
        <div className="company-logo">
            <Link to="/">
                <Figure>
                    {logo}
                    {/* <Figure.Caption> */}
                        <h5 style={{ color: 'white', fontFamily:'Courier New' }} className="p-2"><a>Prealpha</a></h5>
                    {/* </Figure.Caption> */}
                </Figure>
            </Link>
        </div>
    )
}

export default function Sidebar({ isOpen, setOpen }) {
    const dispatch = useDispatch()
    const currentUser = useContext(CurrentUserContext)
    // useEffect(() => {
    //    console.log(currentUser)
    // }, [currentUser])

    function logout(e) {
        setOpen(false)
        e.preventDefault()
        dispatch(startLogout())
    }

    return (
        <Menu isOpen={isOpen} onClose={() => setOpen(false)}>
            <div className="sidebar-sticky">
                <div className="">
                    <Header />
                    <div className="user-info">
                        <Dropdown>
                            <Dropdown.Toggle block className="btn-logout" id="dropdown-basic">
                                {currentUser ? currentUser.first_name + ' ' + currentUser.last_name : ''}
                                <br />
                                <span>{currentUser ? currentUser.role : ''}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="btn-logout">
                                <Dropdown.Item onClick={logout}>
                                    <span> Cerrar sesión</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <nav>
                        <ul className="nav nav-pills flex-column pt-5">
                            <li className="nav-item pb-3">
                                <NavLink to="/home" className="nav-link btn-nav text-center">
                                    <FontAwesomeIcon icon={faHome} />
                                    <span className='p-2' >Home</span>
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/proforma" className="nav-link">
                                    <FontAwesomeIcon icon={faTachometerAlt} />
                                    <span>Proformas</span>
                                </NavLink>
                            </li> */}
                            <li >
                                <ListSidebar />
                            </li>
                            <li className="separator py-2"></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Menu>
    )
}
