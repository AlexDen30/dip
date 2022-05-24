import { Link } from "react-router-dom"
import { ROUTE_MAIN } from "../../constants/routes"
import styles from './login.module.scss'

export const Login = ({currentUser, setUser}) => {
    return (
        <div className={styles.container}>
            <Link to={ROUTE_MAIN}>
                <button onClick={() => setUser(true)}>Login</button>
            </Link>
        </div>
    )

}