import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Header, { HeaderActions } from "../shared/SecondHeader.js"

import ProformaListItem from './ProformaListItem.js';
import EmailMassiveModal from './EmailMassiveModal.js';
// import * as ProformaActions from '../../reducers/proformas.actions.js'


const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar proforma..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function ProformaList({ proformas }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState('');
    const [modalShow, setModalShow] = useState(false);
    // const [searchItem, setSearchItem] = useState({});
    //   const paginationInfo = useSelector(UserReducer.getPagination)


    //   const Pagination = usePagination(paginationInfo, page => {
    //     if (currentFilters.page !== page) {
    //       setCurrentFilters({ ...currentFilters, page })
    //     }
    //   })

    const updateSearch = async (input) => {
        setInput(input)
    }

    useEffect(() => {

    }, [dispatch, history])


    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Proformas"
                    items={[
                        { label: "Listado de Proformas" }
                    ]}
                >
                    <HeaderActions>
                        <Row>

                            <Link
                                to="/proformas/new"
                                className="btn btn-sm btn-create-user m-2">Crear proforma</Link>
                            <button className="btn btn-sm btn-create-user m-2"
                                onClick={() => setModalShow(true)}>
                                Enviar Correo Masivo
                            </button>
                            <Dropdown>
                                <Dropdown.Toggle className="btn btn-sm btn-create-user m-2" id="dropdown-basic">
                                    Maestra Proformas
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Descargar</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Actualizar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Row>
                    </HeaderActions>
                </Header>
            </Row>
            <Row>
                <Col>
                    <SearchBar
                        input={input}
                        setKeyword={updateSearch}
                    />
                </Col>
            </Row>
            <EmailMassiveModal show={modalShow}
                onHide={() => setModalShow(false)} />
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">
                    <Card>
                        <Card.Body className="p-0 table-responsive">
                            <ProformaListItem proformas={proformas} input={input} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProformaList;
