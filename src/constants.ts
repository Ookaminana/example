import { OptionType } from './components/simples/Selector'
import { AutomatType, TasteType } from './types'
import { RoutesMap } from './utils/route'

export const DOMAIN = process.env.REACT_APP_API_URL

export const API_PREFIX = '/'

export const endpoints: RoutesMap = {
    // Users
    getUsersList: `${API_PREFIX}users`,
    getUserItem: `${API_PREFIX}users/get/:id`,
    inviteUser: `${API_PREFIX}users/invite`,
    regUser: `${API_PREFIX}users/registration`,
    registrationByInvitation: `${API_PREFIX}users/registration-by-invitation`,
    updateUser: `${API_PREFIX}users/update/:id`,
    deleteUser: `${API_PREFIX}users/delete/:id`,
    confirmUserEmail: `/users/confirm-email`,
    login: `${API_PREFIX}users/login`,
    restoreUserPassword: `${API_PREFIX}users/restore-password`,
    setPassword: `${API_PREFIX}users/set-password`,
    uploadPhoto: `${API_PREFIX}users/upload-photo`,
    deletePhoto: `${API_PREFIX}users/delete-photo`,
    uploadPhotoByUserId: `${API_PREFIX}users/upload-user-photo/:id`,
    deletePhotoByUserId: `${API_PREFIX}users/delete-user-photo/:id`,
    getProfile: `${API_PREFIX}users/profile`,
    updateProfile: `${API_PREFIX}users/profile`,

    // removeToken: `${API_PREFIX}auth/remove-token`,
    // removeRefreshToken: `${API_PREFIX}auth/remove-refresh-token`,
    // refreshToken: `${API_PREFIX}auth/refresh-token`,
    // sendPasswordRecoveryLink: `${API_PREFIX}auth/send-password-recovery-link`,
    // recoveryPassword: `${API_PREFIX}auth/recovery-password`,

    // Signup
    // signupConfirm: `${API_PREFIX}signup/confirm/:token`,
    // signup: `${API_PREFIX}signup`,

    // Brands
    getBrandList: `${API_PREFIX}brands`,
    createBrand: `${API_PREFIX}brands/create`,
    updateBrand: `${API_PREFIX}brands/update/:id`,
    deleteBrand: `${API_PREFIX}brands/delete/:id`,

    // Products
    getProductList: `${API_PREFIX}products`,
    createProduct: `${API_PREFIX}products/create`,
    updateProduct: `${API_PREFIX}products/update/:id`,
    deleteProduct: `${API_PREFIX}products/delete/:id`,

    // Models
    getModelList: `${API_PREFIX}automat-models`,
    createModel: `${API_PREFIX}automat-models/create`,
    updateModel: `${API_PREFIX}automat-models/update/`,
    deleteModel: `${API_PREFIX}automat-models/delete/`,

    //Fillings
    fillings: `${API_PREFIX}automat-filling`,
    editFilling: `${API_PREFIX}automat-filling/update/:id`,
    createFilling: `${API_PREFIX}automat-filling/create`,
    deleteFilling: `${API_PREFIX}automat-filling/delete/:id`,

    // Languages
    getLanguageList: `${API_PREFIX}languages`,
    createLangKeys: `${API_PREFIX}lang-keys/create`,
    getLangKeys: `${API_PREFIX}lang-keys`,
    importLangKeys: `${API_PREFIX}lang-keys/import`,
    updateLangKeys: `${API_PREFIX}lang-keys/update/`,
    deleteLangKeys: `${API_PREFIX}lang-keys/delete/`,

    // Outlets
    getOutletsList: `${API_PREFIX}outlets`,
    createOutlet: `${API_PREFIX}outlets/create`,
    updateOutlet: `${API_PREFIX}outlets/update/:id`,
    deleteOutlet: `${API_PREFIX}outlets/delete/:id`,

    // Automats
    getAutomatsList: `${API_PREFIX}automat`,
    updateAutomat: `${API_PREFIX}automat/update/:id`,
    createAutomat: `${API_PREFIX}automat/create`,
    deleteAutomat: `${API_PREFIX}automat/delete/:id`,
    getAutomatsLogs: `${API_PREFIX}automat/logs`,
    sendCommandToAutomat: `${API_PREFIX}automat/send-command/:id`,
    sendRefillAppToAutomat: `${API_PREFIX}automat/refill-apps`,

    // Cups
    getCups: `${API_PREFIX}cups`,

    // Dashboard
    getDashboardData: `${API_PREFIX}dashboard`,
    getSalesSchedule: `${API_PREFIX}dashboard/sales-schedule`,

    //Tastes
    getTastes: `${API_PREFIX}tastes`,
    createTaste: `${API_PREFIX}tastes/create`,
    updateTaste: `${API_PREFIX}tastes/update/:id`,
    deleteTaste: `${API_PREFIX}tastes/delete/:id`,

    // Companies

    //Admin
    getCompanies: `${API_PREFIX}companies`,
    getCompany: `${API_PREFIX}companies/get/:id`,
    createCompany: `${API_PREFIX}companies/create`,
    updateCompany: `${API_PREFIX}companies/update/:id`,
    updateCompanyPhoto: `${API_PREFIX}companies/photo/:id`,
    deleteCompany: `${API_PREFIX}companies/delete/:id`,

    //Owner
    getMyCompany: `${API_PREFIX}my-company`,
    updateMyCompany: `${API_PREFIX}my-company/update`,
    updateMyCompanyPhoto: `${API_PREFIX}my-company/photo`,

    // Orders
    getOrdersList: `${API_PREFIX}orders`,

    // Ad Materials
    getAdMaterials: `${API_PREFIX}ad-materials`,
    getAdMaterial: `${API_PREFIX}ad-materials/get/:id`,
    createAdMaterial: `${API_PREFIX}ad-materials/create`,
    updateAdMaterial: `${API_PREFIX}ad-materials/update/:id`,
    uploadAdMaterialPhoto: `${API_PREFIX}ad-materials/photo/:id`,
    deleteAdMaterial: `${API_PREFIX}ad-materials/delete/:id`,

    // Ad Modules
    getAdModules: `${API_PREFIX}ad-modules`,
    getAdModule: `${API_PREFIX}ad-modules/get/:id`,
    createAdModule: `${API_PREFIX}ad-modules/create`,
    updateAdModule: `${API_PREFIX}ad-modules/update/:id`,
    deleteAdModule: `${API_PREFIX}ad-modules/delete/:id`,

    // News
    getNewsList: `${API_PREFIX}news`,
    getNewsItem: `${API_PREFIX}news/get/:id`,
    createNews: `${API_PREFIX}news/create`,
    updateNews: `${API_PREFIX}news/update/:id`,
    uploadNewsPhoto: `${API_PREFIX}news/photo/:id`,
    deleteNews: `${API_PREFIX}news/delete/:id`,

    // Promotion
    getPromotions: `${API_PREFIX}promotions`,
    getPromotion: `${API_PREFIX}promotions/get/:id`,
    createPromotion: `${API_PREFIX}promotions/create`,
    updatePromotion: `${API_PREFIX}promotions/update/:id`,
    deletePromotion: `${API_PREFIX}promotions/delete/:id`,

    // Promotion
    getPromoCodes: `${API_PREFIX}promo-codes`,
    getPromoCode: `${API_PREFIX}promo-codes/get/:id`,
    createPromoCode: `${API_PREFIX}promo-codes/create`,
    updatePromoCode: `${API_PREFIX}promo-codes/update/:id`,
    deletePromoCode: `${API_PREFIX}promo-codes/delete/:id`,
}

export const productType: any = {
    1: 'Порошок',
    2: 'Сироп',
}

export const productTypeOptions: Array<OptionType> = [
    { value: 1, label: 'Порошок' },
    { value: 2, label: 'Сироп' },
]

export const componentUnits: any = {
    1: 'г',
    2: 'мл',
}

export const initProduct = {
    brandId: null,
    name: '',
    cupId: null,
    condition: null,
}
