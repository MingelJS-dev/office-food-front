import React, { useContext, useState, useEffect } from 'react';
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

// import { usePagination } from '../shared/Pagination.js'
// import useSearch from '../shared/Search.js'
import Header, { HeaderActions } from "../shared/SecondHeader.js"
import PortsTable from './PortTable.js';
import * as PortActions from '../../actions/ports.actions.js'
import { CurrentUserContext } from '../../App.js'

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"Buscar puerto..."}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

function PortPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState('');
    const currentUser = useContext(CurrentUserContext)
    // const [searchItem, setSearchItem] = useState({});
    //   const paginationInfo = useSelector(UserReducer.getPagination)


    //   const Pagination = usePagination(paginationInfo, page => {
    //     if (currentFilters.page !== page) {
    //       setCurrentFilters({ ...currentFilters, page })
    //     }
    //   })

    function exportPort() {
        dispatch(PortActions.exportPortFile())
    }




    const updateSearch = async (input) => {
        setInput(input)
    }

    useEffect(() => {
        dispatch(PortActions.fetchAll())
        // dispatch(ProductActions.fetchAll())
        // dispatch(CategoryActions.fetchAll())
        // dispatch(CountryActions.fetchCountries())
       
    }, [dispatch, history])

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        if (hiddenFileInput) {
            hiddenFileInput.current.click();
        }
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
    

        dispatch(PortActions.getUploadLinkAction(fileUploaded, currentUser.id))
    };


    return (
        <Container fluid={true} className="my-3 containerPage">
            <Row>
                <Header
                    title="Puertos"
                    items={[
                        { label: "Listado de Puertos" }
                    ]}
                >
                    <HeaderActions>
                        <Row>

                            <Link
                                to="/ports/new"
                                className="btn btn-sm btn-create-user m-2">Crear puerto</Link>

                            <Dropdown>
                                <Dropdown.Toggle className="btn btn-sm btn-create-user m-2" id="dropdown-basic">
                                    Maestra Puerto
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Button className="btn btn-sm btn-file m-2" onClick={() => exportPort()} >Descargar</Button>
                                    <Button className="btn btn-sm btn-file m-2" onClick={handleClick}>
                                        Actualizar
                                    </Button>
                                    <input type="file"
                                        ref={hiddenFileInput}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle className="btn btn-sm btn-create-user m-2" id="dropdown-basic">
                                    Maestra Destinos
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
            {/* <UserModal show={modalShowUser}
                onHide={() => setModalShowUser(false)} /> */}
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">
                    <Card>
                        <Card.Body className="p-0 table-responsive">
                            <PortsTable input={input} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default PortPage;
