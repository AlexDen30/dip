import { useEffect, useState } from 'react';
import PackingView2D from '../../components/packingView2D/PackingView2D';
import PackingView3D from '../../components/packingView3D/PackingView3D';
import SideMenu from '../../components/sideMenu/SideMenu';
import { generatePackingData } from '../../helpers/dataGenerator';
import geneticPacking from '../../helpers/geneticPacking';
import simplePacking from '../../helpers/packingSimple';
import styles from './mainLayout.module.scss';

// geneticPacking({}, [1,2,3,4,5,6,7])

const MainLayout = () => {

    const [boxes, setBoxes] = useState([])
    const [container, setContainer] = useState({})
    const [density, setDensity] = useState()

    const handleRandomizePalleting = () => {
        const [containerGenerated, boxesGenerated] = generatePackingData()
        packing(boxesGenerated, containerGenerated)
    }

    const handleUploadJson = (config) => {
        if (!!config.boxes.length && !!config.container.width) {
            packing(config.boxes, config.container)
        }
    }

    const packing = (boxes, container) => {
        /// test
        const [boxesCalculatedForView, densityCalculated] = geneticPacking(container, boxes)
        //
        // const [boxesCalculatedForView, densityCalculated] = simplePacking(container, boxes)
        setContainer(container)
        setBoxes(boxesCalculatedForView)
        setDensity(densityCalculated)
    }

    return (
        <div className={styles.container}>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>
            {/* <PackingView2D /> */}
            <div className={styles.sideMenu}>
                <SideMenu 
                    blocks={boxes} 
                    container={container} 
                    density={density} 
                    handleGenerate={handleRandomizePalleting} 
                    handleUploadJson={handleUploadJson}
                />
            </div>
            <div className={styles.view}>
                <PackingView3D blocks={boxes} containerMetrics={[container.width, container.height, container.depth]} />
            </div>
        </main>
        <footer className={styles.footer}>

        </footer>
        </div>
    )
}

export default MainLayout