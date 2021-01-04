import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as IncotermActions from '../../actions/incoterms.actions.js'
import * as IncotermReducer from '../../reducers/incoterms.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import "./ContermPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';

import Spinner from '../shared/Spinner.js';
import EditModal from './EditModal.js'

export default function IncotermTable({ tableSize, input }) {
    let incoterms = useSelector(IncotermReducer.getIncoterms)
    const isLoading = useSelector(IncotermReducer.getIsLoading)

    const dispatch = useDispatch()
    const [currentIncoterm, setCurrentIncoterm] = useState({})
    const [currentIncoterms, setCurrentIncoterms] = useState(incoterms)
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        if (input) {
            let filtered = currentIncoterms.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            )
            setCurrentIncoterms(filtered.filter(x => x !== undefined))
        } else {
            setCurrentIncoterms(incoterms.filter(x => x !== undefined))
        }
    }, [input, incoterms, incoterms.length])



    if (isLoading && incoterms.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (incoterms.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron incoterms.</div>
    }

    const showModal = (data) => {
        setCurrentIncoterm(data)
        setModalShow(true)
    }

    return (
        <Container fluid>
            <EditModal show={modalShow}
                onHide={() => setModalShow(false)}
                type={'incoterm'}
                conterm={currentIncoterm} />
            <Row className="pt-3">
                {
                    currentIncoterms && currentIncoterms.map(item =>
                        <Col lg={3} key={item.id}>
                            <Card className="item-card-conterm mb-3"
                                onClick={() => showModal(item)}>
                                {/* <button style={{ border: '0' }} className="btn btn-outline-danger"
                                ><FontAwesomeIcon icon={faTimesCircle} /></button> */}
                                <Card.Body className="d-flex justify-content-between">
                                    <h5 className="m-0">{item.name}</h5>

                                </Card.Body>

                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container>
    )

}

