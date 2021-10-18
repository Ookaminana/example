export type User = {
    id: number
    fullName: string
    groups: {
        root?: UserRole
        owner?: UserRole
        club?: UserRole
        manager?: UserRole
        service?: UserRole
        employer?: UserRole
    }
    photoPath: string | null
    company: CompanyProfile
    contacts: Array<ContactType>
    permissions: UserPermissions
}

export enum UserGroups {
    Root = 'root',
    Owner = 'owner',
    Club = 'club',
    Manager = 'manager',
    Service = 'service',
    Employer = 'employer',
    User = 'user',
}

type ClubServiceUserPermissions = {
    group: UserGroups.Club | UserGroups.Service
    outlets: Array<number>
}

type EmployerUserPermissions = {
    group: UserGroups.Employer
    automats: Array<number>
}

export type UserPermissions =
    | ClubServiceUserPermissions
    | EmployerUserPermissions
    | {
          group:
              | UserGroups.Root
              | UserGroups.Owner
              | UserGroups.Manager
              | UserGroups.User
      }

// Авторизованный пользователь
export type Profile = User

export type CompanyProfile = {
    id: number
    name: string
    ownerId: number
    photoPath: string
}

export type UserRole = {
    type: number
    name: string
    description: string
    ruleName: string | null
    data: string | null
}

export type Thumbnails = {
    [size: string]: string
}

export type File = {
    id: number
    name: string
    ext: string
    original?: string
    hash?: string
    thumbnails: Thumbnails | null
}

export type Brand = {
    id: number
    mediaKey: string
    name: string
}

export type Product = {
    id: number
    logo: string
    brand_id: number
    flavors: Array<number>
    brand_name: string
    name: string
    feature: string
    compound: string
}

/**
 * НОВЫЕ ТИПЫ
 */
export enum ConditionType {
    POWDER = 1,
    SYRUP = 2,
}
export type ProductType = {
    id: number
    brandId: number
    name: string
    cupId: number
    condition: ConditionType
}

/**
 * Component
 */

export type ComponentType = {
    id: number
    name: string
    amount: number
    measurementUnit: string
}

/**
 * Dosages
 */

export type BaseDosagesType = {
    id: number
    drinkVolume: number
    water: number
    product: number
    conversionFactor: number
}

export enum DoseEnum {
    DRINK_VOLUME = 'drinkVolume',
    WATER = 'water',
    PRODUCT = 'product',
    CONVERSION_FACTOR = 'conversionFactor',
    PRICE = 'price',
}

/**
 * TASTE
 */
export type TasteType = {
    id: number
    name: string
    productId: number
    product?: ProductType
    color: string
    componentOnAmount: number
    mediaKey: string
    components: Array<ComponentType>
    baseDosages: Array<BaseDosagesType>
}

// export type AutomatType = {
//     //'1 - bunker, 2 - snack'
//     id: number
//     name: string
// }

export type AutomatBunkerType = {
    id: number
    automatModelId?: number
    type: number
    number: number
    volume: number
}

export type AutomatModel = {
    id: number
    name: string
    type: AutomatModelTypes
    cups: number
    containers: Array<AutomatModelContainer>
}

export enum AutomatModelTypes {
    Beverages = 1,
    Snack = 2,
    Coffee = 3,
}

export type AutomatModelContainer = {
    id: number
    type: AutomatContainerTypes
    number: number
    volume: number //[note: 'g']
}

export enum AutomatContainerTypes {
    Powder = 1,
    Syrup = 2,
}

export type OwnerType = {
    id: number
    name: string
    email: string
    login: string
}

export type ContactType = {
    id: number
    type: string
    contact: string
    confirmed: boolean
}

export type AutomatOutletType = {
    id: number
    name: string
}

export type OutletType = {
    id: number
    name: string
    address: string
    automats: Array<AutomatOutletType>
}

export type Company = {
    id: number
    name: string
    photoPath: string | null
    owner: OwnerType
    contacts: Array<ContactType> | null
    outlets: Array<OutletType> | null
}

/**
 * AUTOMAT
 */

export type AutomatContainerType = {
    id: number
    automatModelContainerId: number
    tasteId: number
    isActive: boolean
    hasSmallDrink: boolean
    remainsVolume: number
}

export type AutomatDosageType = BaseDosagesType & {
    tasteId: number
    price: number
}

export type AutomatType = {
    id: number
    key: string
    name: string
    serialNumber: string
    automatModelId: number
    outletId: number
    address: string
    longitude: number
    latitude: number
    containers: Array<AutomatContainerType>
    dosages: Array<AutomatDosageType>
    cupsRemaining: 0
    waterRemaining: 0
    outlet: Outlet
}

export type AutomatLog = {
    id: number
    automat: {
        id: number
        name: string
        address: string
        updateAt: Date
    }
    level: AutomatLogLevels
    message: string
    timeAt: Date
}

export enum AutomatLogLevels {
    Error = 1,
    Warn = 2,
    Info = 3,
}

export type LanguageList = {
    id: number
    name: string
    abbreviation: string
}

export type Translations = {
    languageId: number
    translate: string
}

export type LangKeys = {
    id: number
    name: string
    translations: Array<Translations>
}

/**
 * Automat-filling
 */

export type FillingContainerType = {
    automatContainerId: number
    tasteId: number
}

export type AutomatFillinsType = {
    id: number
    name: string
    automatModelId: number
    containers: Array<FillingContainerType>
}

// CUPS

export type CupType = {
    id: 0
    name: string
    mediaPath: string
}

// Orders

export type Order = {
    id: number
    status: OrderStatuses
    totalPrice: number
    discount: number
    promo: string
    mode: string
    buyAt: Date
    prices: Array<OrderPrice>
    items: Array<{
        id: number
        taste: {
            id: number
            name: string
        }
        drinkVolume: number
        price: number
    }>
    automat: {
        id: number
        name: string
    }
}

export enum OrderStatuses {
    New = 1,
    Paid = 2,
    Execution = 3,
    Completed = 4,
}

export type OrderPrice = {
    sum: number
    method: OrderPriceMethods
}

export enum OrderPriceMethods {
    Nothing = 0,
    Cachless = 1,
    Cash = 2,
    RFID = 3,
    QR = 4,
}

// Outlets

export type Outlet = {
    id: number
    name: string
    address: string
    companyId: number
}

// Dashboard

export type DashboardData = {
    incomeMonth?: number
    incomeRelativelyLastMonth?: number
    incomeWeek?: number
    incomeRelativelyLastWeek?: number
    incomeToday?: number
    incomeRelativelyYesterday?: number
    automatsCount?: number
    top3Products?: Array<{
        id: number
        name: string
    }>
    top3Automats?: Array<{
        id: number
        address: string
    }>
    top3PromoCodes?: Array<{
        id: number
        promoCode: string
    }>
    salesSchedule?: Array<{
        day: string
        income: number
    }>
    automatsLogs?: Array<AutomatLog>
    news?: Array<NewsType>
}

// Ad materials

export type AdMaterial = {
    id: number
    name: string
    photoPath: string | null
}

export type AdModule = {
    id: number
    adMaterialId: number
    adMaterial: AdMaterial
    name: string
    automatId: number
    numberOfShowing: number
    timeOfShowing: string
}

export type NewsType = {
    id: number
    title: string
    content: string
    photoPath: string | null
}

export type Promotion = {
    id: number
    productId: number
    product: {
        id: number
        name: string
    }
    automatId: number
    automat: {
        id: number
        name: string
        address: string
    }
    price: number
    startAt: Date
    endAt: Date
}

export type PromoCode = {
    id: number
    promoCode: string
    startAt: Date
    endAt: Date
    usageAmount: number
    remainsUsageAmount: number
    discount: number // %,
    automatsIds: Array<number>
    tastes: string //"all" or "1,2,3"
}
