import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import ProformaForm from "./ProformaForm.js";
import ModalTemplate from './ModalTemplate.js'
import ArticleForm from './ArticleForm.js'

import * as CategoryActions from '../../actions/categories.actions.js'
import * as CountryActions from '../../actions/countries.actions.js'
import * as UserActions from '../../actions/users.actions.js'
import * as ProviderActions from '../../actions/provider.actions.js'
import * as PortActions from '../../actions/ports.actions.js'
import * as DestinationActions from '../../actions/destinations.actions.js'
import * as IncotermActions from '../../actions/incoterms.actions.js'
import * as ContainerActions from '../../actions/containers.actions.js'
import * as BrandActions from '../../actions/brands.actions.js'
import * as ProductActions from '../../actions/product.actions.js'
import * as ProformaActions from '../../actions/proformas.actions.js'

import * as CategoryReducer from '../../reducers/categories.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as UserReducer from '../../reducers/users.reducer.js'
import * as ProviderReducer from '../../reducers/providers.reducer.js'
import * as PortReducer from '../../reducers/ports.reducer.js'
import * as DestinationReducer from '../../reducers/destinations.reducer.js'
import * as IncotermReducer from '../../reducers/incoterms.reducer.js'
import * as ContianerReducer from '../../reducers/containers.reducer.js'

import { updateNotification } from '../../actions/notifications.actions.js'

import Header from "../shared/SecondHeader.js"

export default function NewProforma() {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [step, setStep] = useState(0);
    const [proforma, setProforma] = useState({});
    const [articles, setArticles] = useState([]);
    const [file, setFile] = useState(null)

    useEffect(() => {
        dispatch(CategoryActions.fetchAll());
        dispatch(CountryActions.fetchCountries());
        dispatch(UserActions.fetchUsers());
        dispatch(ProviderActions.fetchAll());
        dispatch(PortActions.fetchAll());
        dispatch(DestinationActions.fetchAll());
        dispatch(IncotermActions.fetchAll());
        dispatch(ContainerActions.fetchAll());
        dispatch(BrandActions.fetchAll());
        dispatch(ProductActions.fetchAll());
    }, [dispatch]);

    useEffect(() => {
        switch (step) {
            case 0:
                // setProforma({})
                break;

            default:
                break;
        }
    }, [file])

    function saveProforma(data) {
        setProforma(data)
        setStep(2)
    }

    function saveArticle(data) {
        if (data && data.length === 0) {
            dispatch(updateNotification('Se necesita al menos un artículo para avanzar.', 'danger'))
        } else {
            console.log('entra', data)
            setArticles(data)
            setStep(3)
        }
      
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        if (hiddenFileInput) {
            hiddenFileInput.current.click();
        }
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded)
        setStep(4)

    };

    function createProforma() {
        const data = {
            proforma,
            articles,
            file
        }

        dispatch(ProformaActions.createProforma(data))
    }

    return (
        <Container fluid={true} className="my-3">

            <ModalTemplate show={modalShow}
                onHide={() => setModalShow(false)} />

            <Row>
                <Header title="Nueva Proforma" items={[
                    { label: "Listado de proformas", to: "/proformas" },
                    { label: "Creación de Proforma" },
                ]} />
            </Row>

            <Row className="d-flex justify-content-center">
                <Col sm={12} className="p-0">
                    <Card className="mb-3 card-custom" style={{ height: '100%' }}>
                        <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                            {
                                step === 0 && <span>Seleccionar modo</span> ||
                                step === 1 && <span>Paso {step} de 4 : Ingresar proforma</span> ||
                                step === 2 && <span>Paso {step} de 4 : Ingresar artículos</span> ||
                                step === 3 && <span>Paso {step} de 4 : PDF</span> ||
                                step === 4 && <span>Paso {step} de 4 : Confirmación</span>
                            }
                        </Card.Header>
                        <Card.Body>
                            {
                                step === 0 &&
                                <Row className="d-flex justify-content-center" >
                                    <Col sm={7} className="p-0">
                                        <Card className="mb-5 card-custom">
                                            <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                                                <span>Creación desde template</span>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    <button
                                                        onClick={() => setModalShow(true)}
                                                        className={`btn btn-block btn-second-blue`}>
                                                        <span>Descargar template</span>
                                                    </button>
                                                    <button className={`btn btn-block btn-second-blue`}>
                                                        <span>Subir template (En desarrollo 90%)</span>
                                                    </button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={7} className="p-0">
                                        <Card className="mb-3 card-custom">
                                            <Card.Header className="card-header-custom text-center text-white font-weight-bold bg-dark card-header-custom card-header">
                                                <span>Creación desde web</span>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    <button onClick={() => setStep(1)} className={`btn btn-block btn-second-blue`}>
                                                        <span>Iniciar creación</span>
                                                    </button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            }

                            {
                                step === 1 &&
                                <ProformaForm
                                    proforma={proforma}
                                    previous={() => setStep(0)}
                                    save={saveProforma}
                                /> ||
                                step === 2 &&
                                <ArticleForm
                                    product={{}}
                                    currentProforma={proforma}
                                    previous={() => setStep(1)}
                                    save={saveArticle}
                                    currentProducts={articles}
                                /> ||
                                step === 3 && <div>
                                    <Button className="btn btn-block btn-second-blue m-2" onClick={handleClick}>
                                        Adjuntar PDF a la proforma
                                    </Button>
                                    <input type="file"
                                        ref={hiddenFileInput}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Button className="btn btn-block btn-second-blue m-2" onClick={() => setStep(4)}>
                                        Omitir
                                    </Button>
                                    <Button className="btn btn-block btn-second-blue m-2" onClick={() => setStep(2)}>
                                        Atras
                                    </Button>
                                </div> ||
                                step === 4 &&
                                <div>
                                    <ConfirmationProforma
                                        proforma={proforma}
                                        file={file}
                                    />
                                    <ConfirmationArticles
                                        articles={articles}
                                    />

                                    <Button className="btn btn-block btn-second-blue m-2" onClick={() => createProforma()}>
                                        Confirmar
                                    </Button>
                                    <Button className="btn btn-block btn-second-blue m-2" onClick={() => setStep(3)}>
                                        Atras
                                    </Button>
                                </div>
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function ConfirmationProforma({ proforma, file }) {
    const countries = useSelector(CountryReducer.getFeaturedCountries)
    const allCountries = useSelector(CountryReducer.getCountries)
    const category = useSelector(state => CategoryReducer.getCategoryById(state, proforma.CategoryId))
    const destination = useSelector(state => PortReducer.getPortById(state, proforma.DestinationId))
    const origin = useSelector(state => PortReducer.getPortById(state, proforma.OriginId))
    // const destinations = useSelector(DestinationReducer.getDestinations)
    const user = useSelector(state => UserReducer.getUserById(state, proforma.BuyerId))
    const provider = useSelector(state => ProviderReducer.getById(state, proforma.ProviderId))
    const incoterm = useSelector(state => IncotermReducer.getIncotermById(state, proforma.IncotermId))
    const container = useSelector(state => ContianerReducer.getContainerById(state, proforma.ContainerId))

    return (
        <Row className="d-flex justify-content-center">
            <Col lg={10}>
                <Card>
                    <Card.Body>
                        <Row className="d-flex justify-content-center">
                            <div >
                                <h4>Datos Proforma</h4>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <h6>
                                    Nombre: {proforma.name}
                                </h6>
                                <h6>
                                    Comprador regional: {user.first_name + ' ' + user.last_name}
                                </h6>
                                <h6>
                                    Origen: {origin.name}
                                </h6>
                            </Col>
                            <Col>
                                <h6>
                                    Categoría: {category.name}
                                </h6>
                                <h6>
                                    Proveedor: {provider.name}
                                </h6>
                                <h6>
                                    Destino: {destination.name}
                                </h6>
                            </Col>
                            <Col>
                                <h6>
                                    Moneda: {proforma.money}
                                </h6>
                                <h6>
                                    Incoterm: {incoterm.name}
                                </h6>
                                <h6>
                                    Contenedor: {container.name}
                                </h6>
                            </Col>
                            <Col>
                                <h6>
                                    ETA: {proforma.eta}
                                </h6>
                                <h6>
                                    CD: {proforma.cd}
                                </h6>
                                <h6>
                                    PDF: {file ? "Si" : "No"}
                                </h6>
                            </Col>

                        </Row>


                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

function ConfirmationArticles({ articles }) {

    const getTotal = (id) => {
        const [article] = articles.filter(x => x.ProductId === parseInt(id))
        if (article && article.units && article.unitAgreedCost) {
            return parseInt(article.units) * parseInt(article.unitAgreedCost)
        }


        return 0;
    }

    return (
        <Row className="d-flex justify-content-center pt-3" >
            <Col lg={10}>
                <Card style={{ overflow: "scroll", height: "300px" }}>
                    <Card.Body>
                        <Row className="d-flex justify-content-center">
                            <div >
                                <h4>Productos</h4>
                            </div>
                        </Row>
                        <Row className="d-flex">
                            <Table
                                striped
                                bordered
                                hover
                                className={`mb-0`}
                                
                            >
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Sku</th>
                                        <th>Cantidad</th>
                                        <th>Unidad de medida</th>
                                        <th>Costo Pactado Unitario</th>
                                        <th>Costo Pactado Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        articles && articles.map(item => {
                                            return (
                                                <tr key={item.ProductId}>
                                                    <td>
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        {item.sku}
                                                    </td>
                                                    <td>
                                                        {item.units}
                                                    </td>
                                                    <td>
                                                        {item.measurement}
                                                    </td>
                                                    <td>
                                                        {item.unitAgreedCost}
                                                    </td>
                                                    <td>
                                                        {getTotal(item.ProductId)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}