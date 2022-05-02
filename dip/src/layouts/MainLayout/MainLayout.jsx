import PackingView2D from '../../components/packingView2D/PackingView2D';
import PackingView3D from '../../components/packingView3D/PackingView3D';
import styles from './mainLayout.module.css';


const blocks = [
    {position: [0, 3, 3], metrics: [2, 5, 4]},
    {position: [3, 10, 7], metrics: [3, 2, 2]},
    {position: [24, 13, 15], metrics: [3, 4, 7]},
    {position: [9, 7, 23], metrics: [5, 6, 6]},
    {position: [17, 4, 11], metrics: [9, 3, 5]},
    {position: [12, 6, 19], metrics: [4, 1, 3]},
]

const containerMetrics = [30, 25, 35];

function MainLayout() {
    return (
        <div className={styles.container}>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>
            {/* <PackingView2D /> */}
            <PackingView3D blocks={blocks} containerMetrics={containerMetrics} />
        </main>
        <footer className={styles.footer}>

        </footer>
        </div>
    )
}

export default MainLayout