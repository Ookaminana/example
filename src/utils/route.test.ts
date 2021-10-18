import {route, RoutesMap, RouteParams} from "./route"

const testRoutes: RoutesMap = {
    entity: '/entity/:id',
}

it('must replace params', () => {
    const params: RouteParams = { id: 100 };
    const path = route(testRoutes.entity, params)
    expect(path).toBe('/entity/100')
})
