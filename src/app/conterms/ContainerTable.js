import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as ContainerActions from '../../actions/containers.actions.js'
import * as ContainerReducer from '../../reducers/containers.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import "./ContermPage.css"
import Table from 'react-bootstrap/Table';


import Spinner from '../shared/Spinner.js';
import EditModal from './EditModal.js'

export default function ContainerTable({ tableSize, input }) {
    let containers = useSelector(ContainerReducer.getContainers)
    const isLoading = useSelector(ContainerReducer.getIsLoading)

    const dispatch = useDispatch()
    const [currentContainer, setCurrentContainer] = useState({})
    const [currentContainers, setCurrentContainers] = useState(containers)
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        if (input) {
            let filtered = currentContainers.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            )
            setCurrentContainers(filtered.filter(x => x !== undefined))
        } else {
            setCurrentContainers(containers.filter(x => x !== undefined))
        }
    }, [input, containers, containers.length])



    if (isLoading && containers.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (containers.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron contenedores.</div>
    }




    const showModal = (data) => {
        setCurrentContainer(data)
        setModalShow(true)
    }

    return (
        <Container fluid>
            <EditModal show={modalShow}
                onHide={() => setModalShow(false)}
                type={'container'}
                conterm={currentContainer} />
            <Row className="pt-3">
                {
                    currentContainers && currentContainers.map(item =>
                        <Col lg={3} key={item.id}>
                            <Card
                                className="item-card-conterm mb-3"
                                onClick={() => showModal(item)}
                            >
                                <Card.Body>
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

