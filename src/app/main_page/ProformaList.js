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

import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import Header, { HeaderActions } from "../shared/SecondHeader.js"

import { CurrentUserContext } from '../../App.js'

import ProformaListItem from './ProformaListItem.js';
import EmailMassiveModal from './EmailMassiveModal.js';
import ModalTemplate from '../proforma/ModalTemplate.js'
import SpinnerFile from '../shared/SpinnerFile.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'

import * as ProformaActions from '../../actions/proformas.actions.js'
import * as FileActions from '../../actions/files.actions.js'
import * as FileReducer from '../../reducers/files.reducer.js'

function StatusCheck({ item, CountryIds, selectCountry }) {
    const dispatch = useDispatch()
    const [statusCheck, setStatusCheck] = useState(false)
    let label = item.name


    function toggle() {
        selectCountry(item.id)
        // const status = item.status ? 'No disponible' : 'Disponible'
    }
    useEffect(() => {
        setStatusCheck(CountryIds.includes(item.id))
    }, [dispatch, CountryIds, CountryIds.length])



    return (
        <Form.Check
            type="switch"
            className="user-status-check pr-4 pl-4"
            id={`sw-${item.id}`}
            label={label}
            checked={statusCheck}
            onChange={() => toggle()}
        />
    )
}

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
    const [modalShowEmail, setModalShowEmail] = useState(false);
    const [CountryIds, setCountryIds] = useState([])
    const [filterProformas, setFilterProformas] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const currentUser = useContext(CurrentUserContext)
    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const isLoading = useSelector(FileReducer.getIsLoading)

    const updateSearch = async (input) => {
        setInput(input)
    }

    useEffect(() => {

    }, [dispatch, history])

    useEffect(() => {
        if (CountryIds.length > 0) {
            setFilterProformas(proformas.filter(item => CountryIds.includes(item.Destination.Country.id)))
        } else {
            setFilterProformas([])
        }
    }, [CountryIds])

    function exportBase() {
        dispatch(ProformaActions.exportBase())
    }

    const selectCountry = (id) => {
        setCountryIds([id])
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        if (hiddenFileInput) {
            hiddenFileInput.current.click();
        }
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        dispatch(FileActions.getUploadLinkAction(fileUploaded, currentUser.id))
    };


    return (
        <Container fluid={true} className="my-3">
            {isLoading && <SpinnerFile isLoading={isLoading} /> }
            <ModalTemplate show={modalShow}
                onHide={() => setModalShow(false)} />
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
                                onClick={() => setModalShowEmail(true)}>
                                Enviar Correo Masivo
                            </button>
                            <button className="btn btn-sm btn-create-user m-2"
                                onClick={() => exportBase()}>
                                Descargar base
                            </button>
                            {/* <Dropdown>
                                <Dropdown.Toggle className="btn btn-sm btn-create-user m-2" id="dropdown-basic">
                                    Template Masivo
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Button className="btn btn-sm btn-file m-2" onClick={() => setModalShow(true)} >Descargar</Button>
                                    <Button className="btn btn-sm btn-file m-2" onClick={handleClick}>
                                        Actualizar
                                    </Button>
                                    <input type="file"
                                        ref={hiddenFileInput}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </Dropdown.Menu>
                            </Dropdown> */}
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
                <Col lg={9} className="d-flex justify-content-start pt-2">
                    {countries && countries.map(item =>
                        <StatusCheck key={item.id} item={item} CountryIds={CountryIds} selectCountry={selectCountry} />
                    )}
                </Col>

            </Row>
            <EmailMassiveModal show={modalShowEmail}
                onHide={() => setModalShowEmail(false)} />
            <Row>
           
            </Row>
            <Row className="pt-2  justify-content-center">
           
                {
                    filterProformas && filterProformas.length > 0 ?
                        <Col className="pr-0 pb-0 pl-0" id='style-8'>
                            
                            {/* <Card>
                                <Card.Body className="p-0 table-responsive"> */}
                                
                            <ProformaListItem proformas={filterProformas} input={input} />
                            {/* </Card.Body>
                            </Card> */}
                        </Col>
                        :

                        <Col className="" id='style-8'>
                            <Alert className='text-center' variant='warning'>
                                Seleccione un país
                                         <hr />
                            </Alert>
                        </Col>

                }


            </Row>
        </Container>
    );
}

export default ProformaList;
