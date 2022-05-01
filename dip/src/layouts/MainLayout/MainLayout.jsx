import PackingView from '../../components/packingView/PackingView';
import styles from './mainLayout.module.css';

function MainLayout() {
    return (
        <div className={styles.container}>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>
            <PackingView />
        </main>
        <footer className={styles.footer}>

        </footer>
        </div>
    )
}

export default MainLayout