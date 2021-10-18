import { RoutesMap } from './utils/route'

/**
 * Маршруты
 */

export const routes: RoutesMap = {
    home: '/',
    login: '/login',
    brands: '/brands',
    products: '/products',
    registration: '/registration',
    registrationSuccess: '/registration/success',
    confirmEmail: '/confirm-email/:key',
    registrationByInvitation: '/registration-by-invitation/:key',
    registrationByInvitationSuccess: '/registration-by-invitation-success',
    recoveryPassword: '/recovery-password',
    recoveryPasswordSuccess: '/recovery-password/success',
    setPassword: '/set-password/:key',
    setPasswordSuccess: `/set-password-success`,
    model: '/model',
    // editProducts: '/products/edit',
    editProducts: '/products/edit/:id',
    createProducts: '/products/create',
    fillings: '/fillings',
    languages: '/languages',
    automats: '/automats',
    automatMain: '/automats/:id',
    automatRefill: '/automats/:id/refill',
    automatOrders: '/automats/:id/orders',
    automatFiscalization: '/automats/:id/fiscalization',
    automatSettings: '/automats/:id/settings',
    outlets: '/outlets',
    companies: '/companies',
    createCompany: '/company/create',
    editCompany: '/company/edit/:id',
    companyUsers: '/company/users',
    companyUserEdit: '/company/users/:id',
    myCompany: '/my-company',
    adMaterials: '/ad-materials',
    adModules: '/ad-modules',
    news: '/news',
    profile: '/profile',
    promotions: '/promotions',
    promoCodes: '/promo-codes',
    mobileUsers: '/mobile-users',
    mobileUserEdit: '/mobile-users/:id',
}

/**
 * Шрифты, которые должны быть принудительно предзагружены.
 */
export const fontsForPreload = [
    '100 14px Roboto',
    'italic 100 14px Roboto',
    '300 14px Roboto',
    'italic 300 14px Roboto',
    '14px Roboto',
    'italic 14px Roboto',
    '500 14px Roboto',
    'italic 500 14px Roboto',
    'bold 14px Roboto',
    'italic bold 14px Roboto',
    '900 14px Roboto',
    'italic 900 14px Roboto',
]

export const MAX_UPLOADING_PHOTO_SIZE = 10 * 1024 * 1024 // 10Mb
export const MAX_UPLOADING_DOCUMENT_SIZE = 50 * 1024 * 1024 // 50Mb
