import styles from './login.module.scss'

export const LoginForm = ({form, setForm}) => {

    return <>
        <input 
            type='text' 
            placeholder='email'
            className={styles.formInput}
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
            type='password' 
            placeholder='password'
            className={styles.formInput}
            value={form.pass}
            onChange={e => setForm({...form, pass: e.target.value})}
        />
    </>
}