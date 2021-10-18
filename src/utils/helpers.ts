import { OptionType } from '../components/simples/Selector'
import { AutomatLogLevels, OrderPriceMethods, UserGroups } from '../types'

export const prepareOptionsFromConst = (i: any): OptionType[] => {
    const options: OptionType[] = []
    Object.keys(i).map((o) => {
        options.push({
            value: +o,
            label: i[o],
        })
    })
    return options
}

/**
 * Получение названия уровня лога, понятный для человека.
 *
 * @param level     Уровень лога
 * @return string   Название уровня лога
 */
export const getLogLevelName = (level: AutomatLogLevels) => {
    let name = ''

    switch (level) {
        case AutomatLogLevels.Error:
            name = 'Ошибка'
            break

        case AutomatLogLevels.Warn:
            name = 'Предупреждение'
            break

        case AutomatLogLevels.Info:
            name = 'Информация'
            break
    }

    return name
}

/**
 * Получение названия метода оплаты
 *
 * @param method    Метод оплаты
 * @return string   Название метода оплаты
 */
export const getPriceMethodName = (method: OrderPriceMethods) => {
    let name = ''

    switch (method) {
        case OrderPriceMethods.Nothing:
            name = 'Без оплаты'
            break

        case OrderPriceMethods.Cachless:
            name = 'Карта'
            break

        case OrderPriceMethods.Cash:
            name = 'Наличные'
            break

        case OrderPriceMethods.RFID:
            name = 'RFID'
            break

        case OrderPriceMethods.QR:
            name = 'QR'
            break
    }

    return name
}

/**
 * Получение названия группы пользователей.
 *
 * @param group     Группа пользователей
 * @return string   Название группы пользователей
 */
export const getUserGroupName = (group: UserGroups) => {
    let name = ''

    switch (group) {
        case UserGroups.Root:
            name = 'Администратор'
            break

        case UserGroups.Owner:
            name = 'Собственник организации'
            break

        case UserGroups.Club:
            name = 'Клуб'
            break

        case UserGroups.Employer:
            name = 'Сотрудник'
            break

        case UserGroups.Service:
            name = 'Сервисный сотрудник'
            break

        case UserGroups.Manager:
            name = 'Менеджер заявок'
            break
    }

    return name
}
