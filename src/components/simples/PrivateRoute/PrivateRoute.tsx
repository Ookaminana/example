import React, { FC } from 'react'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import { selectIsAuth } from '../../../store/slices/auth'
import { AuthScreen } from '../../pages/Auth'
import { Registration } from '../../pages/Registration'

type Props = RouteProps

const PrivateRoute: FC<Props> = ({ children, ...rest }) => {
    const isAuth = useAppSelector(selectIsAuth)
    let path = useHistory()
    // console.log('path.location.state ',path.location.pathname );

    return <Route {...rest}>{isAuth ? <>{children}</> : <AuthScreen />}</Route>
}

export default PrivateRoute
