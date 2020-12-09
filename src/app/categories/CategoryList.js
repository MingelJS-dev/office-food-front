import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useQuery, toQueryString } from '../../utils.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import { usePagination } from '../shared/Pagination.js'
// import useSearch from '../shared/Search.js'
import Header, { HeaderActions } from "../shared/SecondHeader.js"

import * as CountryActions from '../../actions/countries.actions.js'
import * as CategoryActions from '../../actions/categories.actions.js'

import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'
import "./CategoryPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import NewCategoryModal from './NewCategory.js'
import EditCategoryModal from './EditCategory.js'
import swal from 'sweetalert';

function CategoryList({ n, nView, isSelectN, ParentId, CountryId, categories, setCategoryIdN, selectId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    const [modalEditShow, setEditModalShow] = useState(false);

    let [currentCategories, setCurrentCategories] = useState([]);
    let [currentId, setCurrentId] = useState('');

    let [current, setCurrent] = useState({})
    useEffect(() => {
        if (categories && categories.length) {
            setCurrentCategories(categories)
        } else {
            setCurrent({})
            setCurrentCategories([])
            
        }
       

    }, [dispatch, history, categories, categories && categories.length, isSelectN])

    useEffect(() => {
        setCurrentId(selectId)
        // console.log(selectId, currentId, 'asdasdasd')
    }, [selectId, setCategoryIdN])

    const selectCategory = (data) => {
        setCategoryIdN(data.id)
        setCurrent(data)
    }

    function destroyCategorie(CategoryId) {
        swal({
            title: "¿Está seguro que desea eliminar la categoría?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new CategoryActions.destroyById(CategoryId))
                }
            });
    }

    return (
        <Card className="cardJC">
            <Card.Header className="card-header-category">
                <div className="d-flex justify-content-between">
                    <h5 className="pt-2" >Categoría N{nView}</h5>
                    <Col lg={5} className="d-flex justify-content-between">
                        <button className="btn btn-category"
                            disabled={current && !current.name}
                            onClick={() => setEditModalShow(true)
                            }
                        >
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                        <button className="btn btn-category"
                         disabled={current && !current.name}
                         onClick={() => destroyCategorie(current.id)}
                        ><FontAwesomeIcon icon={faTrash} /></button>
                        <button className="btn btn-category"
                            disabled={!isSelectN}
                            onClick={() => setModalShow(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </Col>

                </div>
            </Card.Header>
            <Card.Body
                className={`card-body-category card-text-category ${categories && categories.length > 0 ? 'card-body-height-category' : ''}`}>
                <div
                    className={`card-container-category ${categories && categories.length > 0 ? 'item-card-height-category' : ''}`}>
                    <ul className="list-group">
                        {
                            currentCategories.map(x =>
                                <li key={x.id}
                                    className={`item-card ${current && current.id === x.id ? 'item-card-active' : ''}`}
                                    onClick={() => selectCategory(x)}>
                                    <div className="group-name d-flex justify-content-between">
                                        <span>{x.name}</span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </Card.Body>
            <NewCategoryModal show={modalShow}
                level={n}
                CountryId={CountryId}
                ParentId={ParentId}
                onHide={() => setModalShow(false)} />
            <EditCategoryModal show={modalEditShow}
                level={n}
                category={current}
                onHide={() => setEditModalShow(false)} />
        </Card>
    );
}

export default CategoryList;
