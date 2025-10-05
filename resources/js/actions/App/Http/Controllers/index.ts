import FoodController from './FoodController'
import Auth from './Auth'

const Controllers = {
    FoodController: Object.assign(FoodController, FoodController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers