import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import * as CategoryReducer from '../../reducers/categories.reducer.js'

import "./MainPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

import Header, { HeaderActions } from "../shared/SecondHeader.js"


function ProformaListItem({ proformas, input }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [filterProformas, setFilterProformas] = useState(proformas)
    const [currentCategories, setCurrentCategories] = useState([])
    const [CategoryId, setCategoryId] = useState(null)

    const categories = useSelector(CategoryReducer.getCategoryN5s)

    useEffect(() => {
        let CategorytIds = proformas.map(item => item.CategoryId)
        setCurrentCategories(categories.filter(x => CategorytIds.includes(x.id)))
    }, [proformas, proformas.length])

    useEffect(() => {
        if (input) {
            let filtered = filterProformas.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            )
            setFilterProformas(filtered.filter(x => x !== undefined))
        } else {
            setFilterProformas(proformas.filter(x => x !== undefined))
        }
    }, [input, proformas, proformas.length])

    function getProformas(id) {
        return proformas.filter(x => x.CategoryId === parseInt(id))
    }

    const selectCategory = (id) => {
        if (CategoryId === id) {
            setCategoryId(null)
        } else {
            setCategoryId(id)
        }

    }

    return (
        <Container fluid={true} className="my-3">
            {currentCategories.map(item =>
                <Row key={item.id} className="pb-2">
                    <Col lg={12}>
                        <Card
                            onClick={() => selectCategory(item.id)}
                            className="category-card">
                            <Card.Body className="d-flex justify-content-between">
                                <div>
                                    <h5>
                                        {item.name}
                                    </h5>
                                </div>
                                <div>
                                    <h3 className="m-0">
                                        {
                                            CategoryId === item.id ?
                                                <FontAwesomeIcon icon={faArrowUp} /> :
                                                <FontAwesomeIcon icon={faArrowDown} /> 
                                    }
                                    </h3>
                                </div>
                            </Card.Body>
                        </Card>
                        {
                            CategoryId === item.id && <ProformaItem proformas={getProformas(item.id)} input={input} />
                        }
                    </Col>
                </Row>

            )
            }
        </Container>
    );
}

function ProformaItem({ proformas, input }) {
    const history = useHistory()
    const [filterProformas, setFilterProformas] = useState(proformas)

    useEffect(() => {
        console.log(proformas)
        if (input) {
            let filtered = filterProformas.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            )
            setFilterProformas(filtered.filter(x => x !== undefined))
        } else {
            setFilterProformas(proformas.filter(x => x !== undefined))
        }
    }, [input, proformas, proformas.length])

    return (
        <Container fluid={true} className="my-3">
            {
                filterProformas.map(item =>
                    <Row key={item.id} className="pb-2">
                        <Col lg={12}>
                            <Card>
                                <Card.Body className="d-flex justify-content-between">
                                    <div>
                                        <h5>
                                            {item.name}
                                        </h5>
                                        <h5>
                                            {item.Category.name} - {item.Provider.name}
                                        </h5>
                                    </div>
                                    <div>
                                        <h6>Estado Email: {item.statusEmail ?
                                            <span className='success-span'>Enviado</span> :
                                            <span className='warning-span'>Pendiente</span>} </h6>

                                        <h6>Estado Comex: {item.statusComex ?
                                            <span className='success-span'>Enviado</span> :
                                            <span className='warning-span'>Pendiente</span>}</h6>
                                        <button
                                            onClick={() => history.push(`/proformas/${item.id}/articles`)}
                                            className="btn btn-sm btn-create-user m-2">Ver Proforma</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                )
            }
        </Container>
    );
}
export default ProformaListItem;
