import React, { FC, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { checkUser } from '../../../store/slices/auth'
import { TextField, TextFieldStatus } from '../../simples/TextField'
import { Button } from '../../simples/Button'
import { Auth as AuthServices } from '../../../services/Auth'

import styles from './AuthForm.module.scss'
import { PassField } from '../../simples/PassField'

import { routes } from '../../../config'

const buttonClasses = {
    button: styles.button,
}

const AuthForm: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isErLog, setErLog] = useState<boolean>(false)

    const navigation = useHistory()

    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await AuthServices.login(login, password)
                dispatch(checkUser())
                navigation.push(routes.home)
            } catch (e) {
                setErLog(true)
            }
        },
        [dispatch, login, password]
    )

    return (
        <div className={styles.content}>
            <h2 className={styles.auth_h2}>Авторизация</h2>

            <form action="/" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.formGroup}>
                    <TextField
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder={'Логин'}
                        status={isErLog ? TextFieldStatus.Error : undefined}
                        required
                        note={isErLog ? 'Логин или пароль неверные' : ''}
                    />
                </div>

                <div className={styles.keep_pass_box}>
                    <Link
                        to={routes.recoveryPassword}
                        className={styles.keep_pass}
                        tabIndex={-1}
                    >
                        Востановить пароль
                    </Link>
                </div>

                <div className={styles.formGroup}>
                    <PassField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                        required
                        status={isErLog ? TextFieldStatus.Error : undefined}
                    />
                </div>

                <div className={styles.marg_btn}>
                    <Button type={'submit'} classNames={buttonClasses}>
                        Войти
                    </Button>
                    <label>или</label>
                    <Link to={routes.registration}>Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    )
}

export default AuthForm
