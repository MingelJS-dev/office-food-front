import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Alert } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import history from '../../history.js'

import Header, { HeaderActions } from "../shared/SecondHeader.js"

import * as ArticleReducer from '../../reducers/proforma_products.reducer.js'
// import * as ProformaActions from '../../reducers/proformas.actions.js'


const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar artículo..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function ArticleList({ proforma }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState('');
    let articles = useSelector(ArticleReducer.getArticles)
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

    let title = `${proforma.name} - Artículos`

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title={title}
                    items={[
                        { label: "Listado de Artículos" }
                    ]}
                >
                    <HeaderActions>
                        <Row>

                            <button
                                onClick={() => history.push(`/proformas/${proforma.id}/articles/new`)}
                                className="btn btn-sm btn-create-user m-2">Agregar Artículo</button>
                            <Dropdown>
                                <Dropdown.Toggle className="btn btn-sm btn-create-user m-2" id="dropdown-basic">
                                    Maestra Artículos
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
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">
                    <Card>
                        <Card.Body className="p-0 table-responsive">
                            {
                                articles && articles.length > 0 ?
                                    ''
                                    :
                                    <Row  className="justify-content-center m-0 mb-5 pt-5" >
                                        <Col lg="5" className='text-center'>
                                            <Alert variant='dark'>
                                                No existen artículos para esta proforma.
                                        <hr />
                                                <button
                                                    onClick={() => history.push(`/proformas/${proforma.id}/articles/new/`)}
                                                    className="btn btn-sm btn-create-user m-2">Ingresar Artículo</button>
                                            </Alert>
                                        </Col>
                                    </Row>

                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleList;
