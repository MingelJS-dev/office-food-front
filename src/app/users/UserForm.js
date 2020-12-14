import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// import * as UsersReducer from '../../reducers/users.reducer.js'
import * as RolesReducer from '../../reducers/roles.reducer.js'
import Spinner from '../shared/Spinner.js'
// import useFeatureChecker from '../shared/FeatureChecker.js'


function PasswordWrapper({ user, encrypted_password, setEncrypted_password, setRepeatPassword, isLoading, errors }) {
    const [disabled, setDisabled] = useState(!!user.id || isLoading)
    const [changePassword, setChangePassword] = useState(false)

    function toggle(e) {
        setChangePassword(!changePassword)
        setDisabled(!disabled)
    }

    return (
        <>
            <div className={`mb-3 ${user.id ? 'd-block' : 'd-none'}`}>
                <label role="button">
                    <input
                        type="checkbox"
                        onChange={toggle}
                        checked={changePassword}
                    />
                    <span className="pl-2">Cambiar contraseña</span>
                </label>
            </div>

            <div className={`form-group ${disabled ? 'd-none' : 'd-block'}`}>
                <label>Contraseña</label>
                <input
                    type="password"
                    className={`form-control ${errors.encrypted_password ? 'is-invalid' : ''}`}
                    onChange={(x) => setEncrypted_password(x.target.value)}
                    disabled={disabled}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.encrypted_password}</div>
            </div>

            {/* <div className={`form-group ${disabled ? 'd-none' : 'd-block'}`}>
                <label>Repetir Contraseña</label>

                <input
                    type="password"
                    className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
                    onChange={(x) => setRepeatPassword(x.target.value)}
                    disabled={disabled}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.repeatPassword}</div>
            </div> */}
        </>
    )
}

export default function UserForm({ user, save }) {
    const [last_name, setLastName] = useState(user.last_name || '')
    const [first_name, setFirstName] = useState(user.first_name || '')
    const [email, setEmail] = useState(user.email || '')
    const [ RoleId , setRoleId] = useState(user.UserRoles ? user.UserRoles[0].Role.id : '')
    const [encrypted_password, setEncrypted_password] = useState(user.encrypted_password || '')
    const [errors, setErrors] = useState({})

    const roles = useSelector(RolesReducer.getRoles)

    // const globalLoading = useSelector(UsersReducer.getIsLoading)
    // const localLoading = useSelector(state => UsersReducer.getIsLoadingById(state, user.id))


    const isLoading = false

    function validate(e) {
        e.preventDefault()

        // TODO: Validate required data and format
        const validations = []

        if (!first_name) {
            validations.push(['first_name', 'Nombre es requerido'])
        }

        if (!last_name) {
            validations.push(['last_name', 'Apellido es requerido'])
        }

        if (!user.id && !email) {
            validations.push(['email', 'Correo electrónico es requerido'])
        }


        // if (!user.id && !rut) {
        //   validations.push(['rut', 'Rut es requerido'])
        // }

        if (!user.id && !encrypted_password) {
            validations.push(['encrypted_password', 'Contraseña es requerida'])
        }

        // if (!user.id && !repeatPassword) {
        //   validations.push(['repeatPassword', 'Repetir contraseña es requerida'])
        // }

        // if (!user.id && (password && repeatPassword) && password !== repeatPassword) {
        //   validations.push(['password', 'Las contraseñas no coinciden'])
        //   validations.push(['repeatPassword', 'Las contraseñas no coinciden'])
        // }

        if (validations.length > 0) {
            setErrors(validations.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {}))
            return
        } else {
            setErrors([])
            const data = {
                first_name,
                last_name,
                email,
                encrypted_password,
                RoleId,
            }

            if (user.id) {
                data.id = user.id
            }

            save(data)
        }
    }

    if (isLoading) {
        return (<Spinner />)
    }

    return (
        <form onSubmit={validate} noValidate>
            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                    onChange={(x) => setFirstName(x.target.value)}
                    value={first_name}
                    disabled={isLoading}
                />

                <div className="invalid-feedback">{errors.first_name}</div>
            </div>

            <div className="form-group">
                <label>Apellido</label>

                <input
                    type="text"
                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                    onChange={(x) => setLastName(x.target.value)}
                    value={last_name}
                    disabled={isLoading}
                />

                <div className="invalid-feedback">{errors.last_name}</div>
            </div>

            <div className="form-group">
                <label>Correo electrónico</label>

                <input
                    type="text"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(x) => setEmail(x.target.value)}
                    value={email.toLowerCase()}
                    disabled={isLoading}
                    autoComplete="false"
                />

                <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="form-group">
                <label>Rol</label>

                <select
                    className={`form-control`}
                    onChange={(e => setRoleId(e.target.value))}
                    defaultValue={RoleId}
                >
                    <option value="">Seleccione...</option>
                    {
                        roles.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <PasswordWrapper {...{ user, encrypted_password, setEncrypted_password, isLoading, errors }} />

            <div className="form-group">
                <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                    <span>Guardar</span>
                    {
                        isLoading ?
                            <div className='spinner-border' role='status'></div>
                            : null
                    }

                </button>
            </div>

        </form>
    )
}

