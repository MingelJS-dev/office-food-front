import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as ProductActions from '../../actions/product.actions.js'

import * as ProductReducer from '../../reducers/products.reducer.js'
import * as CountryReducer from '../../reducers/countries.reducer.js'
import * as BrandReducer from '../../reducers/brands.reducer.js'
import * as CategoryReducer from '../../reducers/categories.reducer.js'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import history from '../../history.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';

import Spinner from '../shared/Spinner.js';


export default function ProvidersTable({ tableSize, input }) {
    let products = useSelector(ProductReducer.getProducts)
    let brands = useSelector(BrandReducer.getBrands)
    let countries = useSelector(CountryReducer.getCountries)
    let categories = useSelector(CategoryReducer.getCategories)

    const isLoading = useSelector(ProductReducer.getIsLoading)
    // const roles = useSelector(RolesReducer.getRoles)
    const dispatch = useDispatch()
    const [currentProducts, setCurrentProducts] = useState(products)


    useEffect(() => {
        if (input) {
            let filtered = currentProducts.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            )
            setCurrentProducts(filtered.filter(x => x !== undefined))
        } else {
            setCurrentProducts(products.filter(x => x !== undefined))
        }
    }, [input, products, products.length])



    if (isLoading && products.length === 0 && brands.length === 0
        && countries.length === 0 && categories.length === 0) {
        return (
            <div className="container-lg py-4 p-0 text-center">
                <Spinner />
            </div>
        )
    }

    if (products.length === 0 && !isLoading) {
        return <div className="not-found-table-items">No se encontraron productos.</div>
    }

    function destroyProduct(ProductId) {
        swal({
            title: "¿Está seguro que desea eliminar el artículo?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
            .then(ok => {
                if (ok) {
                    dispatch(new ProductActions.destroyById(ProductId))
                }
            });
    }

    return (
        <Table
            striped
            bordered
            hover
            className={`mb-0 ${tableSize ? 'table-sm' : ''}`}
        >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>País</th>
                    <th>Categoría</th>
                    <th>EAN</th>
                    <th>SKU</th>
                    <th>Marca</th>
                    <th>PVP</th>
                    <th>Unid x Caja</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentProducts.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {/* <Link to={"/users/" + item.id + "/edit"}>{item.name}</Link> */}
                                    {item.name}
                                </td>
                                <td>
                                    {countries.length > 0 && countries.filter(x => parseInt(item.CountryId) === x.id)[0].name}
                                </td>
                                <td>
                                    {categories.length > 0 && categories.filter(x => parseInt(item.CategoryId) === x.id)[0].name}
                                </td>
                                <td>
                                    {item.ean}
                                </td>
                                <td>
                                    {item.sku}
                                </td>
                                <td>
                                    {brands.length > 0 && brands.filter(x => parseInt(item.BrandId) === x.id)[0].name}
                                </td>
                                <td>
                                    {item.pvp}
                                </td>
                                <td>
                                    {item.unitPerBox}
                                </td>
                                <td className='d-flex justify-content-center'>                                    
                                    <button
                                     onClick={() => history.push(`/products/${item.id}/edit`)}
                                        className='btn btn-create-user mr-2'>
                                        Editar
                                    </button>

                                    <button className='btn btn-danger-custom'
                                        onClick={() => destroyProduct(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

