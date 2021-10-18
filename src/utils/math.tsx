/**
 * Корректировка округления десятичных дробей.
 *
 * @param {String}  type  Тип корректировки.
 * @param {Number}  value Число.
 * @param {Number} exp   Показатель степени (десятичный логарифм основания корректировки).
 * @returns {Number} Скорректированное значение.
 */
export const decimalAdjust = (
    type: 'round' | 'floor' | 'ceil',
    value: number,
    exp?: number
) => {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || exp === 0) {
        return Math[type](value)
    }

    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(exp % 1 === 0)) {
        return NaN
    }

    // Сдвиг разрядов
    const valuePaths = value.toString().split('e')
    const intermediateValue = Math[type](
        +(valuePaths[0] + 'e' + (valuePaths[1] ? +valuePaths[1] - exp : -exp))
    )
    // Обратный сдвиг
    const intermediateValuePaths = intermediateValue.toString().split('e')
    return +(
        intermediateValuePaths[0] +
        'e' +
        (intermediateValuePaths[1] ? +intermediateValuePaths[1] + exp : exp)
    )
}
