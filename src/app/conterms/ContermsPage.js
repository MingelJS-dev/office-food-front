import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Header, { HeaderActions } from "../shared/SecondHeader.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import * as IncotermActions from '../../actions/incoterms.actions.js'
import * as ContainerActions from '../../actions/containers.actions.js'

import ContainerTable from "./ContainerTable.js"
import IncotermTable from "./IncotermTable.js"
import NewModal from './NewModal.js'

const SearchBarContainer = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar contenedor..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

const SearchBarIncoterm = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar incoterm..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function ContermsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [inputIncoterm, setInputIncoterm] = useState('');
    const [inputContainer, setInputContainer] = useState('');
    const [type, setType] = useState(null);
    const [newModalConterm, setNewModalConterm] = useState(false);

    const updateSearchContainer = async (inputContainer) => {
        setInputContainer(inputContainer)
    }

    const updateSearchIncoterm = async (inputIncoterm) => {
        setInputIncoterm(inputIncoterm)
    }

    useEffect(() => {
        dispatch(IncotermActions.fetchAll())
        dispatch(ContainerActions.fetchAll())
    }, [dispatch, history])

    const showNewModal = (data) => {
        setType(data)
        setNewModalConterm(true)
    }
    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Incoterms & Contenedores"
                    items={[
                        { label: "Listado" }
                    ]}
                >
                    {/* <HeaderActions>
                        <button
                        onClick={() => setModalShowUser(true)}
                        className="btn btn-sm btn-create-user">Crear usuario</button>
                    </HeaderActions> */}
                </Header>
            </Row>

            <Row className="justify-content-between" >
                <NewModal show={newModalConterm}
                    onHide={() => setNewModalConterm(false)}
                    type={type} />
                <Col lg={6} className="pt-2 pr-0 pb-0 pl-0">
                    <Card style={{ height: '650px' }} className="mb-3 card-custom">
                        <Card.Header className="d-flex justify-content-between card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <SearchBarIncoterm
                                input={inputIncoterm}
                                setKeyword={updateSearchIncoterm}
                            />
                            <button className="btn btn-category"
                                onClick={() => showNewModal('incoterm')}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </Card.Header>
                        <Card.Body className="p-0 table-responsive">
                            <IncotermTable
                                input={inputIncoterm} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="pt-2 pr-0 pb-0 pl-3">
                    <Card style={{ height: '650px' }} className="mb-3 card-custom">
                        <Card.Header className="d-flex justify-content-between card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <SearchBarContainer
                                input={inputContainer}
                                setKeyword={updateSearchContainer}
                            />
                            <button className="btn btn-category"
                                onClick={() => showNewModal('container')}
                            >
                                <FontAwesomeIcon icon={faPlus}
                                />
                            </button>
                        </Card.Header>
                        <Card.Body className="p-0 table-responsive">
                            <ContainerTable
                                input={inputContainer} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default ContermsPage;
