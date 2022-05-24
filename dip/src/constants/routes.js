import { Login } from "../components/login/Login"
import MainLayout from "../layouts/MainLayout/MainLayout"

export const ROUTE_LOGIN = '/login'
export const ROUTE_MAIN = '/main'

export const publicRoutes = [
    {
        path: ROUTE_LOGIN,
        component: Login
    }
]

export const privateRoutes = [
    {
        path: ROUTE_MAIN,
        component: MainLayout
    }
]