import { useEffect, useState } from 'react';
import PackingView2D from '../../components/packingView2D/PackingView2D';
import PackingView3D from '../../components/packingView3D/PackingView3D';
import SideMenu from '../../components/sideMenu/SideMenu';
import { generatePackingData } from '../../helpers/dataGenerator';
import { packingMaxHeight } from '../../helpers/packing';
import styles from './mainLayout.module.scss';


const MainLayout = () => {

    const [boxes, setBoxes] = useState([])
    const [container, setContainer] = useState({})

    const handleRandomizePalleting = () => {
        const [containerGenerated, boxesGenerated] = generatePackingData()
        setBoxes(boxesGenerated)
        setContainer(containerGenerated)
    }

    return (
        <div className={styles.container}>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>
            {/* <PackingView2D /> */}
            <div className={styles.sideMenu}>
                <SideMenu blocks={boxes} container={container} handleGenerate={handleRandomizePalleting}/>
            </div>
            <div className={styles.view}>
                <PackingView3D blocks={packingMaxHeight(container, boxes)} containerMetrics={[container.width, container.height, container.depth]} />
            </div>
        </main>
        <footer className={styles.footer}>

        </footer>
        </div>
    )
}

export default MainLayout