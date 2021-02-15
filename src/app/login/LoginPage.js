import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogin, fetchCompanyBySlug } from '../../actions/auth.actions.js';
import { Link } from 'react-router-dom'

// import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
//import logo from '../../assets/images/logo-enel.png';

import Spinner from '../shared/Spinner.js'

function Header(){


  // if(!){
  //   return <Spinner />
  // }

  window.title = 'Back Office Food'

  return (
    <Figure>
      {
        false ?
          <Figure.Image width={171} height={180} alt="171x180" src={'url_icon'} />
        : null
      }
      <Figure.Caption>
        <h4 className="pt-2">Back Office Food</h4>
      </Figure.Caption>
    </Figure>
  )
}

function LoginPage() {
  const dispatch = useDispatch()
  const isLoggingIn = useSelector(state => state.auth.isLoggingIn)
  const credentialsMsg = useSelector(state => state.auth.credentialsMsg)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(() => {

  }, [dispatch])

  function login(e){
    e.preventDefault()
    dispatch(startLogin(email, password))
  }
  console.log(window.config)
  return (
    <div className="background-login">
      <div className="auth-wrapper mx-2">
        <Card className="shadow col-12 col-sm-6 col-md-3">
          <Card.Body>
            <Form onSubmit={login}>
              <FormGroup className="text-center" >
                <Header />
              </FormGroup>

              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control value={email} disabled={isLoggingIn} onChange={(e) => { setEmail(e.target.value) }} type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control value={password} disabled={isLoggingIn} onChange={(e) => { setPassword(e.target.value) }} type="password" />
              </Form.Group>

              {
                isLoggingIn
                ?
                  <Form.Group className='text-center'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Cargando...</span>
                    </div>
                  </Form.Group>
                :
                  <Form.Group className='text-center'>
                    <Button className='btn-login' type='submit' disabled={isLoggingIn}>
                      Iniciar Sesión
                    </Button>
                    { credentialsMsg && (
                      <p className="message mt-3 mb-0">Credenciales incorrectas.</p>
                    )}
                  </Form.Group>
              }
            </Form>
            {/* <Card.Footer>
                <p className="message d-flex justify-content-center mt-3 mb-0"> <Link to={`/users/new`}>Crear usuario</Link></p>
                </Card.Footer> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
