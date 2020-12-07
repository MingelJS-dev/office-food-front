import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert, Button } from 'react-bootstrap';


export default function MainPage() {
    return (
        <Container fluid>
            <Row className="justify-content-md-center" >
                <Col lg="5" className='text-center'>
                    <Alert variant='dark'>
                        Back Office Food Regional
                        <hr />
                        <Button variant='success'>
                            Crear Proforma
                        </Button>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}

