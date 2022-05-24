import {Navigate, Route, Routes} from 'react-router-dom'
import { ROUTE_LOGIN, ROUTE_MAIN } from '../constants/routes'
import MainLayout from '../layouts/MainLayout/MainLayout'
import { Login } from './login/Login'


export const RoutesSwitch = ({currentUser, setUser}) => {

    return currentUser 
    ?
        <Routes>
            <Route path={ROUTE_MAIN} element={<MainLayout currentUser={currentUser} setUser={setUser} />} />
            <Route path='*' element={<Navigate to={ROUTE_MAIN} replace />} />
        </Routes>
    :
        <Routes>
            <Route path={ROUTE_LOGIN} element={<Login currentUser={currentUser} setUser={setUser} />} />
            <Route path='*' element={<Navigate to={ROUTE_LOGIN} replace />} />
        </Routes>
}