export interface RoutesMap {
    [routeName: string]: string
}

export interface RouteParams {
    [paramName: string]: number | string
}

/**
 * Get route to page
 * @param {string} route
 * @param {RouteParams} params
 */
export function route(route: string, params: RouteParams): string {
    let url = route
    for (let name in params) {
        url = url
            .replace(`:${name}?`, params[name] + '')
            .replace(`:${name}`, params[name] + '')
    }

    return url
}

export type SearchParams = {
    [name: string]: string
}
export function parseSearchOfLocation(search: string): SearchParams {
    const params: SearchParams = {}

    let _search = search
    if (_search.indexOf('?') === 0) {
        _search = _search.substring(1)
    }

    const searchParts = _search.split('&')

    searchParts.forEach((part) => {
        const param = part.split('=')

        if (param.length < 1) {
            return
        }

        const name = param[0]
        const value = param[1] || ''

        params[name] = value
    })

    return params
}
