import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { FirebaseContext } from '..'
import { ROUTE_LOGIN, ROUTE_MAIN, ROUTE_SIGNUP } from '../constants/routes'
import MainLayout from '../layouts/MainLayout/MainLayout'
import { Login } from './login/Login'
import { Signup } from './login/Signup'


export const RoutesSwitch = () => {

    const {firebaseAuth} = useContext(FirebaseContext)
    const [currUser, setCurrUser] = useState(firebaseAuth)

    onAuthStateChanged(firebaseAuth, currentUser => setCurrUser(!!currentUser))

    return currUser 
    ?
        <Routes>
            <Route path={ROUTE_MAIN} element={<MainLayout />} />
            <Route path='*' element={<Navigate to={ROUTE_MAIN} replace />} />
        </Routes>
    :
        <Routes>
            <Route path={ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE_SIGNUP} element={<Signup />} />
            <Route path='*' element={<Navigate to={ROUTE_LOGIN} replace />} />
        </Routes>
}