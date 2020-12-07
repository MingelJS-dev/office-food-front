import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Header.css'
import Card from 'react-bootstrap/Card';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-expand-md navOffice ">
            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto">  Back Office Food Regional</a>
            </div>
        </nav>
    )
}

