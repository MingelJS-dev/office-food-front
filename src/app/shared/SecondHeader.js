import React, { useEffect } from 'react';

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import history from '../../history.js'

import './SecondHeader.css'

export function HeaderActions({ children }) {
  return (
    <div>{children}</div>
  )
}

export default function Header({ title, items = [], children }) {
  const dispatch = useDispatch()
  children = React.Children.toArray(children)

  const breadCrumbs = items.map((item, idx) => {
    if (items.length - 1 === idx) {
      return (
        <li
          key={item.label}
          className="breadcrumb-item active"
        >{item.label}</li>
      )
    } else {
      return (
        <li key={item.label} className="breadcrumb-item">
          <Link to={item.to}>{item.label}</Link>
        </li>
      )
    }
  })

  let Actions;

  if (children.length) {
    Actions = children.find(x => x.type === HeaderActions)
  }

  return (
    <Col sm={12} className="p-0">
      <div className="d-flex justify-content-between align-items-center pb-2 pb-md-0">
        {
          history.length ?
            <div className="d-md-none">
              <button
                className="btn btn-link collapsed"
                onClick={e => history.goBack()}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
            : null
        }

        <div>
          <h5 className="page-title m-0 test">{title}</h5>
          <nav className="d-none d-md-block">
            <ol className="breadcrumb">
              {breadCrumbs}
            </ol>
          </nav>
        </div>

        {
          Actions ? Actions : null
        }
      </div>

      <hr style={{ marginTop: '0px' }} />
    </Col>
  )
}
