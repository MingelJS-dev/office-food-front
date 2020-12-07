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


function ListSidebar() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowUser, setModalShowUser] = useState(false);

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
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Ingresar Proforma</span>
                                    </NavLink>
                                </li>
                                <li >
                                    <Button
                                        onClick={() => setModalShow(true)}
                                        className="btn-without bm-item-list">
                                        <span>Extraer template</span>
                                    </Button>

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
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Jerarquía
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <Button
                                        onClick={() => setModalShow(true)}
                                        className="btn-without bm-item-list">
                                        <span>Ver jerarquía</span>
                                    </Button>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        Proveedor
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Descargar Maestra</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Registrar Proveedor</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                        Artículos
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Descargar Maestra</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proforma" className="bm-item-list">
                                        <span>Registrar Artículo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                        Usuarios
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body className='p-1'>
                            <ul>
                                <li>
                                    <NavLink to="/users" className="bm-item-list">
                                        <span>Listar Usuarios</span>
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
                    <Figure.Caption>
                        <h6 className="pl-3">Maqueta</h6>
                    </Figure.Caption>
                </Figure>
            </Link>
        </div>
    )
}

export default function Sidebar({ isOpen, setOpen }) {
    const dispatch = useDispatch()
 
    // useEffect(() => {
    //     console.log(isOpen)
    // }, [isOpen])

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
                                {/* {currentUser ? currentUser.name : ''} */} Usuario Role
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
                                <NavLink to="/test" className="nav-link btn-nav text-center">
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
