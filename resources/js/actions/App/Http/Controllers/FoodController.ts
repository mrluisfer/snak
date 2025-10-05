import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/foods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FoodController::index
* @see app/Http/Controllers/FoodController.php:11
* @route '/api/v1/foods'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const FoodController = { index }

export default FoodController