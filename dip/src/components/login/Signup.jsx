import { createUserWithEmailAndPassword } from "firebase/auth"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FirebaseContext } from "../.."
import styles from './login.module.scss'
import { LoginForm } from "./LoginForm"

export const Signup = () => {

    const {firebaseAuth} = useContext(FirebaseContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({email: '', pass: ''})

    const signup = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.pass)
            alert('User created!')
            setForm({email: '', pass: ''})
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className={styles.container}>
            <h4>Signup</h4>
            <LoginForm form={form} setForm={setForm} />
            <button
                onClick={signup} 
                className={styles.formButton}
            >
                Signup
            </button>
            <button
                onClick={() => navigate('/login')} 
                className={styles.formButton}
            >
                Login
            </button>
        </div>
    )

}