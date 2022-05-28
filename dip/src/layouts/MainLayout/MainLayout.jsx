import { useContext, useState } from 'react';
import { FirebaseContext } from '../..';
import PackingView3D from '../../components/packingView3D/PackingView3D';
import { addPalleting } from '../../components/services/palletingService';
import SideMenu from '../../components/sideMenu/SideMenu';
import { generatePackingData } from '../../helpers/dataGenerator';
import geneticPacking from '../../helpers/geneticPacking';
import styles from './mainLayout.module.scss';

const MainLayout = () => {

    const [boxes, setBoxes] = useState([])
    const [container, setContainer] = useState({})
    const [density, setDensity] = useState()

    const {firebaseAuth} = useContext(FirebaseContext)

    const handleRandomizePalleting = () => {
        const [containerGenerated, boxesGenerated] = generatePackingData()
        packing(boxesGenerated, containerGenerated)
    }

    const handleUploadJson = (config) => {
        if (!!config.boxes.length && !!config.container.width) {
            packing(config.boxes, config.container)
        }
    }

    const handleStorePalleting = async (density, container, palleting) => {
        if (density && container && palleting.length && firebaseAuth.currentUser) {
            try {
                const res = await addPalleting({
                    density, 
                    container,
                    palleting, 
                    userId: firebaseAuth.currentUser.uid,
                    timestamp: Date.now()
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const packing = (boxes, container) => {
        const [boxesCalculatedForView, densityCalculated] = geneticPacking(container, boxes)
        // const [boxesCalculatedForView, densityCalculated] = simplePacking(container, boxes)

        handleStorePalleting(densityCalculated, container, boxesCalculatedForView)

        setContainer(container)
        setBoxes(boxesCalculatedForView)
        setDensity(densityCalculated)
    }

    return (
        <div className={styles.container}>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>
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