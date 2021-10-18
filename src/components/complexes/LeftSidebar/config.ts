import { UserGroups } from '../../../types'
import { routes } from '../../../config'

type MenuGroup = {
    title: string
    items: Array<MenuItem>
}

type MenuItem = {
    title: string
    url: string
}

export const menuConfig: { [group in UserGroups]: Array<MenuGroup> } = {
    [UserGroups.Root]: [
        {
            title: 'Маркетинг',
            items: [
                { title: 'Рекламные материалы', url: routes.adMaterials },
                { title: 'Новости', url: routes.news },
                { title: 'Промокоды', url: routes.promoCodes },
                { title: 'Рекламные акции', url: routes.promotions },
            ],
        },
        {
            title: 'Создание базы',
            items: [
                { title: 'Бренды', url: routes.brands },
                { title: 'Продукты', url: routes.products },
                { title: 'Модели автоматов', url: routes.model },
                { title: 'Наполнения автоматов', url: routes.fillings },
                { title: 'Локализация', url: routes.languages },
            ],
        },
        {
            title: 'Управление',
            items: [
                { title: 'Организации', url: routes.companies },
                {
                    title: 'Пользователи мобильного приложения',
                    url: routes.mobileUsers,
                },
            ],
        },
    ],
    [UserGroups.Owner]: [
        {
            title: 'Маркетинг',
            items: [
                { title: 'Промокоды', url: routes.promoCodes },
                { title: 'Рекламные модули', url: routes.adModules },
                { title: 'Рекламные акции', url: routes.promotions },
            ],
        },
        {
            title: 'Управление',
            items: [
                { title: 'Торговые точки', url: routes.outlets },
                { title: 'Пользователи', url: routes.companyUsers },
                { title: 'Настройки организации', url: routes.myCompany },
            ],
        },
    ],
    [UserGroups.Club]: [
        {
            title: 'Маркетинг',
            items: [
                { title: 'Промокоды', url: routes.promoCodes },
                { title: 'Рекламные модули', url: routes.adModules },
                { title: 'Рекламные акции', url: routes.promotions },
            ],
        },
        {
            title: 'Управление',
            items: [
                { title: 'Автоматы', url: routes.automats },
                { title: 'Пользователи', url: routes.companyUsers },
            ],
        },
    ],
    [UserGroups.Employer]: [
        {
            title: 'Маркетинг',
            items: [{ title: 'Промокоды', url: routes.promoCodes }],
        },
        {
            title: 'Управление',
            items: [{ title: 'Пользователи', url: routes.companyUsers }],
        },
    ],
    [UserGroups.Manager]: [
        {
            title: 'Маркетинг',
            items: [{ title: 'Промокоды', url: routes.promoCodes }],
        },
        {
            title: 'Управление',
            items: [{ title: 'Пользователи', url: routes.companyUsers }],
        },
    ],
    [UserGroups.Service]: [
        {
            title: 'Управление',
            items: [{ title: 'Торговые точки', url: routes.outlets }],
        },
    ],
    [UserGroups.User]: [],
}
