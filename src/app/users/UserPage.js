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

import UserTable from './UserTable.js';

import * as UserActions from '../../actions/users.actions.js'
import * as RolesActions from '../../actions/roles.actions.js'
import UserModal from './NewUser.js'

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar usuario..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function UsersPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShowUser, setModalShowUser] = useState(false);
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
        dispatch(UserActions.fetchUsers())
        dispatch(RolesActions.fetchRoles())
    }, [dispatch, history])

    return (
        <Container fluid={true} className="my-3 containerPage">
            <Row>
                <Header
                    title="Usuarios"
                    items={[
                        { label: "Listado de usuarios" }
                    ]}
                >
                    <HeaderActions>
                        <button
                        onClick={() => setModalShowUser(true)}
                        className="btn btn-sm btn-create-user">Crear usuario</button>
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
            <UserModal show={modalShowUser}
                onHide={() => setModalShowUser(false)} />
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">
                    <Card>
                        <Card.Body className="p-0 table-responsive">
                            <UserTable 
                            input={input}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default UsersPage;
