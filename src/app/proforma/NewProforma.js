import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ProformaForm from "./ProformaForm.js";
import ModalTemplate from './ModalTemplate.js'
import ArticleForm from './ArticleForm.js'

import * as CountryReducer from '../../reducers/countries.reducer.js'

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

import Header from "../shared/SecondHeader.js"

export default function NewProforma() {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [step, setStep] = useState(0);
    const [proforma, setProforma] = useState({});
    const [articles, setArticles] = useState([]);
    const [file, setFile] = useState({})

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
        console.log(data)
        setProforma(data)
        setStep(2)
    }

    function saveArticle(data) {
        setArticles(data)
        setStep(3)
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
                    <Card className="mb-3 card-custom" style={{ height: '600px' }}>
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
                                                        <span>Subir template</span>
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