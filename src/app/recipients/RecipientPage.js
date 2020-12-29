import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import { usePagination } from '../shared/Pagination.js'
// import useSearch from '../shared/Search.js'
import Header, { HeaderActions } from "../shared/SecondHeader.js"
import useWindowSize from "../shared/WindowSize.js";

import RecipientTable from './RecipientTable.js';

import * as RecipientActions from '../../actions/recipients.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as CategoryActions from '../../actions/categories.actions.js'

import NewRecipientModal from './NewRecipient.js'

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar destinatario..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function RecipientPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    const [input, setInput] = useState('');
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
        dispatch(RecipientActions.fetchAll())
        dispatch(CountryActions.fetchCountries())
        dispatch(CategoryActions.fetchAll())
    }, [dispatch, history])

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title="Destinatarios"
                    items={[
                        { label: "Listado de destinatarios" }
                    ]}
                >
                    <HeaderActions>
                        <button
                            onClick={() => setModalShow(true)}
                            className="btn btn-sm btn-create-user">Crear destinatario</button>
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
            <NewRecipientModal show={modalShow}
                onHide={() => setModalShow(false)} />
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">
                    <Card>
                        <Card.Body className="p-0 table-responsive">
                            <RecipientTable
                                input={input} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default RecipientPage;
