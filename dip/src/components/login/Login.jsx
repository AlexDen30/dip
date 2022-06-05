import { signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FirebaseContext } from "../.."
import styles from './login.module.scss'
import { LoginForm } from "./LoginForm"

export const Login = () => {

    const {firebaseAuth} = useContext(FirebaseContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({email: '', pass: ''})

    const signin = async () => {
        try {
            const newUser = await signInWithEmailAndPassword(firebaseAuth, form.email, form.pass)
            setForm({email: '', pass: ''})
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className={styles.container}>
            <h4>Login</h4>
            <LoginForm form={form} setForm={setForm} />
            <button
                onClick={signin} 
                className={styles.formButton}
            >
                Login
            </button>
            <button
                onClick={() => navigate('/signup')} 
                className={styles.formButton}
            >
                Signup
            </button>
        </div>
    )

}