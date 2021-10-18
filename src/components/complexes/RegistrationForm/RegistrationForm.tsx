import React, { FC, useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { routes } from '../../../config'
import { Auth as AuthService } from '../../../services/Auth'
import { TextField, TextFieldStatus } from '../../simples/TextField'
import { Button } from '../../simples/Button'
import { EmailField } from '../../simples/EmailField'
import { PassField } from '../../simples/PassField'
import styles from './RegistrationForm.module.scss'

const buttonClasses = {
    button: styles.button,
}

const RegistrationForm: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [organisation, setOrganisation] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isErLog, setErLog] = useState<boolean>(false)

    const history = useHistory()

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            await AuthService.registaration({
                companyName: organisation,
                login,
                password,
                email,
            })

            history.push(routes.registrationSuccess)
        },
        [login, password]
    )

    return (
        <div className={styles.content}>
            <h2 className={styles.auth_h2}>Регистрация</h2>

            <form action="/" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.formGroup}>
                    <TextField
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        placeholder={'Название организации'}
                        status={isErLog ? TextFieldStatus.Error : undefined}
                        required
                        note={isErLog ? 'Проверьте логин' : ''}
                    />
                </div>

                <div className={styles.formGroup}>
                    <TextField
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder={'Логин'}
                        status={isErLog ? TextFieldStatus.Error : undefined}
                        required
                        note={isErLog ? 'Проверьте логин' : ''}
                    />
                </div>

                <div className={styles.formGroup}>
                    <EmailField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'E-mail'}
                        required
                        type={'text'}
                        status={isErLog ? TextFieldStatus.Error : undefined}
                        note={isErLog ? 'Некорректная электронная почта' : ''}
                    />
                </div>
                <div className={styles.keep_pass_box}>
                    <Link
                        to={routes.recoveryPassword}
                        className={styles.keep_pass}
                        tabIndex={-1}
                    >
                        Восстановить пароль
                    </Link>
                </div>

                <div className={styles.formGroup}>
                    <PassField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                        required
                        status={isErLog ? TextFieldStatus.Error : undefined}
                        note={isErLog ? 'Проверьте пароль' : ''}
                    />
                </div>

                <div className={styles.marg_btn}>
                    <Link to={routes.login}>Войти</Link>

                    <label>или</label>

                    <Button type={'submit'} classNames={buttonClasses}>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm
