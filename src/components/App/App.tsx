import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { routes } from '../../config'
import { PrivateRoute } from '../simples/PrivateRoute'

import { Error404 } from '../pages/Error404'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import {
    checkUser,
    selectAuthChecking,
    selectIsAuth,
} from '../../store/slices/auth'
import { MainPreloader } from '../simples/MainPreloader'
import { Home } from '../pages/Home'
import { Dashboard } from '../pages/Dashboard'
import { Brand } from '../pages/Brand'
import { Product } from '../pages/Product'

import { Test } from '../pages/Test'
import Auth from '../pages/Auth/Auth'
// import Registration from '../pages/Registration/Registration'
import { Model } from '../pages/Model'
import { EditProductPage } from '../pages/EditProductPage'
import { Registration } from '../pages/Registration'
import { RegistrationSuccess } from '../pages/RegistrationSuccess'
import { ConfirmEmail } from '../pages/ConfirmEmail'
import { RegistrationByInvitation } from '../pages/RegistrationByInvitation'
import { RegistrationByInvitationSuccess } from '../pages/RegistrationByInvitationSuccess'
import { RecoveryPassword } from '../pages/RecoveryPassword'
import { RecoveryPasswordSuccess } from '../pages/RecoveryPasswordSuccess'
import { SetPassword } from '../pages/SetPassword'
import { SetPasswordSuccess } from '../pages/SetPasswordSuccess'
import { FillingPage } from '../pages/FillingPage'
import { Localization } from '../pages/Localization'
import { Automats } from '../pages/Automats'
import { AutomatMain } from '../pages/AutomatMain'
import { AutomatRefill } from '../pages/AutomatRefill'
import { AutomatOrders } from '../pages/AutomatOrders'
import { AutomatFiscalization } from '../pages/AutomatFiscalization'
import { AutomatSettings } from '../pages/AutomatSettings'
import { Outlets } from '../pages/Outlets'
import { loadBrands, loadCups, loadLangs } from '../../store/slices/storage'
import { Companies } from '../pages/Companies'
import { EditCompanyPage } from '../pages/EditCompanyPage'
import { MyCompany } from '../pages/MyCompany'
import { AdMaterials } from '../pages/AdMaterials'
import { AdModules } from '../pages/AdModules'
import { News } from '../pages/News'
import { CompanyUsers } from '../pages/CompanyUsers'
import { EditCompanyUser } from '../pages/EditCompanyUser'
import { Profile } from '../pages/Profile'
import { Promotion } from '../pages/Promotion'
import { PromoCode } from '../pages/PromoCode'
import { MobileUsers } from '../pages/MobileUsers'
import { EditMobileUser } from '../pages/EditMobileUser'

const App = () => {
    const preloading = useAppSelector(selectAuthChecking)
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        dispatch(checkUser())
        dispatch(loadBrands())
        dispatch(loadCups())
        dispatch(loadLangs())
    }, [dispatch, isAuth])

    if (preloading) {
        return <MainPreloader />
    }

    return (
        <div className={styles.app}>
            <Router>
                <Switch>
                    {/* <Route>
                        <Test />
                    </Route> */}
                    <PrivateRoute path={routes.home} exact>
                        <Dashboard />
                    </PrivateRoute>

                    <Route path={routes.registration} exact>
                        <Registration />
                    </Route>
                    <Route path={routes.registrationSuccess} exact>
                        <RegistrationSuccess />
                    </Route>

                    <Route path={routes.confirmEmail} exact>
                        <ConfirmEmail />
                    </Route>

                    <Route path={routes.registrationByInvitation} exact>
                        <RegistrationByInvitation />
                    </Route>

                    <Route path={routes.registrationByInvitationSuccess} exact>
                        <RegistrationByInvitationSuccess />
                    </Route>

                    <Route path={routes.recoveryPassword} exact>
                        <RecoveryPassword />
                    </Route>

                    <Route path={routes.recoveryPasswordSuccess} exact>
                        <RecoveryPasswordSuccess />
                    </Route>

                    <Route path={routes.setPassword} exact>
                        <SetPassword />
                    </Route>

                    <Route path={routes.setPasswordSuccess} exact>
                        <SetPasswordSuccess />
                    </Route>

                    <Route path={routes.login} exact>
                        <Auth />
                    </Route>

                    <PrivateRoute path={routes.brands} exact>
                        <Brand />
                    </PrivateRoute>

                    <PrivateRoute path={routes.products} exact>
                        <Product />
                    </PrivateRoute>
                    <PrivateRoute path={routes.editProducts} exact>
                        <EditProductPage />
                    </PrivateRoute>
                    <PrivateRoute path={routes.createProducts} exact>
                        <EditProductPage />
                    </PrivateRoute>
                    <PrivateRoute path={routes.fillings} exact>
                        <FillingPage />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automats} exact>
                        <Automats />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automatMain} exact>
                        <AutomatMain />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automatRefill} exact>
                        <AutomatRefill />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automatOrders} exact>
                        <AutomatOrders />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automatFiscalization} exact>
                        <AutomatFiscalization />
                    </PrivateRoute>
                    <PrivateRoute path={routes.automatSettings} exact>
                        <AutomatSettings />
                    </PrivateRoute>

                    <PrivateRoute path={routes.model} exact>
                        <Model />
                    </PrivateRoute>

                    <PrivateRoute path={routes.languages} exact>
                        <Localization />
                    </PrivateRoute>

                    <PrivateRoute path={routes.outlets} exact>
                        <Outlets />
                    </PrivateRoute>

                    <PrivateRoute path={routes.companies} exact>
                        <Companies />
                    </PrivateRoute>

                    <PrivateRoute path={routes.editCompany} exact>
                        <EditCompanyPage />
                    </PrivateRoute>

                    <PrivateRoute path={routes.createCompany} exact>
                        <EditCompanyPage />
                    </PrivateRoute>

                    <PrivateRoute path={routes.myCompany} exact>
                        <MyCompany />
                    </PrivateRoute>

                    <PrivateRoute path={routes.companyUsers} exact>
                        <CompanyUsers />
                    </PrivateRoute>
                    <PrivateRoute path={routes.companyUserEdit} exact>
                        <EditCompanyUser />
                    </PrivateRoute>

                    <PrivateRoute path={routes.adMaterials} exact>
                        <AdMaterials />
                    </PrivateRoute>
                    <PrivateRoute path={routes.adModules} exact>
                        <AdModules />
                    </PrivateRoute>

                    <PrivateRoute path={routes.news} exact>
                        <News />
                    </PrivateRoute>

                    <PrivateRoute path={routes.profile} exact>
                        <Profile />
                    </PrivateRoute>

                    <PrivateRoute path={routes.promotions} exact>
                        <Promotion />
                    </PrivateRoute>

                    <PrivateRoute path={routes.promoCodes} exact>
                        <PromoCode />
                    </PrivateRoute>

                    <PrivateRoute path={routes.mobileUsers} exact>
                        <MobileUsers />
                    </PrivateRoute>

                    <PrivateRoute path={routes.mobileUserEdit} exact>
                        <EditMobileUser />
                    </PrivateRoute>

                    <Route path={'/test'}>
                        <Test />
                    </Route>

                    <Route>
                        <Error404 />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
