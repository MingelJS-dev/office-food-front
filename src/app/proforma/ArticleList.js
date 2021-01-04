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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faPlane, faMoneyBill, faSquare } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

import * as ArticleReducer from '../../reducers/proforma_products.reducer.js'
import * as ArticleActions from '../../actions/proforma_product.actions.js'


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
    const [total, setTotal] = useState(0)
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
        let cost = 0;
        articles.map(x => cost += x.units * x.unitAgreedCost)

        setTotal(cost)
    }, [dispatch, history, articles, articles && articles.length])

    let title = `${proforma.name} - Artículos`

    return (
        <Container fluid={true} className="my-3">
            <Row>
                <Header
                    title={title}
                    items={[
                        { label: "Listado de proformas", to: "/proformas" },
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
                <Col className="d-flex justify-content-end">
                    <Col className="pt-3">
                        <SearchBar
                            input={input}
                            setKeyword={updateSearch}
                        />
                    </Col>
                    <Card className="ml-2 text-center">
                        <Card.Body>
                            <h6 className="m-0">
                                {/* <FontAwesomeIcon className="mr-2" icon={faSquare} /> */}
                             Contenedor: {proforma.Container.name} </h6>
                        </Card.Body>
                    </Card>
                    <Card className="ml-2 m-0 text-center">
                        <Card.Body>
                            <h6 className="m-0">
                                {/* <FontAwesomeIcon className="mr-2" icon={faPlane} /> */}
                             Incoterm: {proforma.Incoterm.name} </h6>
                        </Card.Body>
                    </Card>
                    <Card className="ml-2 m-0 text-center" >
                        <Card.Body>
                            <h6 className="m-0">
                                <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
                             Costo Total: {total} </h6>
                        </Card.Body>
                    </Card>
                    <Card className="ml-2 text-center">
                        <Card.Body>
                            <h6 className="m-0">
                                <FontAwesomeIcon className="mr-2" icon={faPlane} />
                             Destino: {proforma.Destination.name} </h6>
                        </Card.Body>
                    </Card>
                    <Card className="ml-2 text-center">
                        <Card.Body>
                            <h6 className="m-0">
                                <FontAwesomeIcon className="mr-2" icon={faUser} />
                              Proveedor: {proforma.Provider.name} </h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="pt-2 pr-0 pb-0 pl-0">

                    {
                        articles && articles.length > 0 ?
                            <ArticleItems articles={articles} />
                            :
                            <Card>
                                <Card.Body className="p-0 table-responsive">
                                    <Row className="justify-content-center m-0 mb-5 pt-5" >
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
                                </Card.Body>
                            </Card>

                    }

                </Col>
            </Row>
        </Container>
    );
}

function ArticleItems({ articles }) {
    const [select, setSelect] = useState(null)

    const selectArticle = (item) => {
        setSelect(item)
    }

    return (
        <Container fluid={true}>
            <Row  >
                <Col lg={2} className='pt-2'>
                    <Card style={{ height: '650px' }} className="mb-3 card-custom">
                        <Card.Header className="card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Productos</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                articles.map(item =>
                                (
                                    <Card key={item.id}>
                                        <Card.Body
                                            className={`card-body-custom ${select && select.id === item.id ? 'card-body-custom-active' : ''}`}
                                            onClick={() => selectArticle(item)}>

                                            {item.name} - {item.Product.sku}

                                        </Card.Body>
                                    </Card>
                                )
                                )
                            }
                        </Card.Body>
                    </Card>

                </Col>
                <Col lg={10} className='pt-2'>
                    <Card className="mb-3 card-custom" style={{ height: '650px' }} >
                        <Card.Header className="text-center card-header-custom text-white font-weight-bold bg-dark card-header-custom card-header">
                            <span>Gestión de artículo</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                select ? <ArticleForm article={select} /> :
                                    <Alert className='text-center' variant='warning'>
                                        Seleccionar artículo.
                        <hr />
                                    </Alert>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function ArticleForm({ article }) {
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(article || null)
    const [units, setUnits] = useState(article.units || '')
    const [measurement, setMeasurement] = useState(article.measurement || '')
    const [observation, setObservation] = useState(article.observation || '')
    const [unitAgreedCost, setUnitAgreedCost] = useState(article.unitAgreedCost || '')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setCurrent(article)
        setUnits(article.units || '')
        setMeasurement(article.measurement || '')
        setUnitAgreedCost(article.unitAgreedCost || '')
        setObservation(article.observation || '')
    }, [article])

    function validate() {
        // e.preventDefault()
        // TODO: Validate required data and format
        const validations = []

        if (!units) {
            validations.push(['units', 'Unidades es requerida'])
        }

        if (!measurement) {
            validations.push(['measurement', 'Unidad de medida es requerido'])
        }

        if (!unitAgreedCost) {
            validations.push(['unitAgreedCost', 'Costo pactado unitario es requerido'])
        }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                units,
                measurement,
                unitAgreedCost,
                observation
            }

            if (article.id) {
                data.id = article.id
            }

            save(data)
        }
    }

    if (!current) {
        return (
            <Alert className='text-center' variant='warning'>
                Seleccionar artículo.
                <hr />
            </Alert>
        )
    }

    const getTotal = () => {
        return parseInt(units) * parseInt(unitAgreedCost)
    }

    const save = (data) => {
        dispatch(new ArticleActions.updateById(data))
    }

    const destroy = () => {
        swal({
            title: "¿Está seguro que desea eliminar el artículo?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new ArticleActions.destroyById(article.id))
                    setCurrent(null)
                }
            });
    }



    return (
        <Container fluid={true}>
            <h5> {current.name} - {current.Product.sku} </h5>
            <Row>
                <Col className='d-flex'>
                    <div className='pr-5'>
                        <label>Nombre</label>

                        <input
                            type="text"
                            className={`form-control`}
                            disabled={true}
                            value={article.Product.name}
                            autoComplete="false"
                        />
                    </div>
                    <div className='pr-5'>
                        <label>SKU</label>

                        <input
                            type="text"
                            className={`form-control`}
                            disabled={true}
                            value={article.Product.sku}
                            autoComplete="false"
                        />
                    </div>
                    <div className='pr-5'>
                        <label>EAN</label>

                        <input
                            type="text"
                            className={`form-control`}
                            disabled={true}
                            value={article.Product.ean}
                            autoComplete="false"
                        />
                    </div>
                    <div className='pr-5'>
                        <label>PVP</label>

                        <input
                            type="number"
                            className={`form-control `}
                            disabled={true}
                            value={article.Product.pvp}
                            autoComplete="false"
                        />
                    </div>
                    <div className='pr-5'>
                        <label>Unidad por caja</label>

                        <input
                            type="number"
                            className={`form-control `}
                            disabled={true}
                            value={article.Product.unitPerBox}
                            autoComplete="false"
                        />
                    </div>
                </Col>
            </Row>
            <hr />
            <form onSubmit={validate} noValidate>
                <Row>
                    <Col lg='2'>
                        <label>Unidad de medida</label>
                        <select
                            onChange={(x) => setMeasurement(x.target.value)}
                            value={measurement}
                            className={`form-control`}
                        >
                            <option value="">Seleccione...</option>
                            <option value="Unid">Unid</option>
                            <option value="Cajas">Cajas</option>
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                        </select>
                    </Col>

                </Row>
                <Row>
                    <Col className='d-flex'>
                        <div className="form-group p-1">
                            <label>Unidades</label>

                            <input
                                type="number"
                                className={`form-control ${errors.units ? 'is-invalid' : ''}`}
                                onChange={(x) => setUnits(x.target.value)}
                                value={units}
                                autoComplete="false"
                            />

                            <div className="invalid-feedback">{errors.units}</div>
                        </div>
                        <div className="form-group p-1">
                            <label>Costo Unitario Pactado</label>

                            <input
                                type="number"
                                className={`form-control ${errors.unitAgreedCost ? 'is-invalid' : ''}`}
                                onChange={(x) => setUnitAgreedCost(x.target.value)}
                                value={unitAgreedCost}
                                autoComplete="false"
                            />

                            <div className="invalid-feedback">{errors.unitAgreedCost}</div>
                        </div>
                        <div className="form-group p-1">
                            <label>Costo Pactado Total</label>

                            <input
                                type="number"
                                className={`form-control ${errors.unitAgreedCost ? 'is-invalid' : ''}`}
                                disabled={true}
                                value={getTotal()}
                                autoComplete="false"
                            />

                            <div className="invalid-feedback">{errors.unitAgreedCost}</div>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="comment">Observaciones:</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                onChange={(x) => setObservation(x.target.value)}
                                value={observation}
                                id="comment"></textarea>
                        </div>
                    </Col>
                </Row>

            </form>
            <Row className='justify-content-between pt-5'>
                <div className="form-group">
                    <button className={`btn btn-primary`}
                        onClick={() => validate()}>
                        <span>Guardar</span>
                    </button>
                </div>
                <div className="form-group">
                    <button className='btn btn-danger-custom'
                        onClick={() => destroy()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </Row>
        </Container>


    )
}

export default ArticleList;
