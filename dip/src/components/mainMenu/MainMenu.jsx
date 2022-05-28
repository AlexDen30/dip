import styles from './mainMenu.module.scss';
import JsonUploader from '../utilityComponents/fileUploader/JsonUploader';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../..';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ListItem from '../uiComponents/listItem/ListItem';
import { palletingCollection } from '../services/palletingService';
import { limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';
import IntersectionObs from '../utilityComponents/IntersectionObs';
import downloadJson from '../utilityComponents/downloadFile';


const MainMenu = ({closeMenu, handleUploadJson, handleGenerate, handleDownload}) => {

    const {firebaseAuth} = useContext(FirebaseContext)

    const [user, setUser] = useState({})
    const [showStatistics, setShowStatistics] = useState(false)

    const [palletings, setPalletings] = useState([])
    const [lastPalleting, setLastPalleting] = useState()
    const [allLoaded, setAllLoaded] = useState(false)
    
    const updatePalletingState = useCallback((collections) => {
        if (collections.docs.length !== 0) {
            setPalletings([...palletings, ...collections.docs.map(palleting => palleting.data())])
            setLastPalleting(collections.docs[collections.docs.length - 1])
        } else {
            setAllLoaded(true)
        }
    }, [palletings])

    useEffect(() => {
        if (user.uid) {
            const startQuery = query(palletingCollection, where('userId', '==', user.uid), orderBy('timestamp', 'desc'), limit(4))
            onSnapshot(startQuery, palletings => updatePalletingState(palletings))
        }
    }, [user])

    const getMorePalletings = () => {
        const moreQuery = query(palletingCollection, where('userId', '==', user.uid), orderBy('timestamp', 'desc'), startAfter(lastPalleting), limit(3))
        onSnapshot(moreQuery, palletings => updatePalletingState(palletings))
    }

    onAuthStateChanged(firebaseAuth, currentUser => {!user.email && setUser(currentUser)})

    const logout = async () => {
        try {
            await signOut(firebaseAuth)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleButtonClick = (callback) => {
        closeMenu()
        callback()
    }

    const handleDownloadPalleting = (palleting) => {
        const time = new Date(palleting.timestamp).toLocaleString()
        downloadJson({
            container: palleting.container,
            palleting: palleting.palleting,
            density: palleting.density,
            time
        }, time.replace('.', '-') + '.json')
    }

    return (
        <div className={styles.modalContainer}>
            { !showStatistics
            ?   <>
                    <h4>Welcome, {user.email}</h4>
                    <JsonUploader returnParsedJson={handleUploadJson}/>
                    <button onClick={() => handleButtonClick(handleDownload)}>Export as JSON</button>
                    <button onClick={() => handleButtonClick(handleGenerate)}>Generate random Palleting</button>
                    <button onClick={() => setShowStatistics(true)}>Show your statistics</button>
                    <button onClick={() => handleButtonClick(logout)}>Logout</button>
                </>
            :
                <>
                    <div className={styles.statisticsHeader}>
                        <h4>Statistics:</h4>
                        <span>(double click to download palleting)</span>
                    </div>
                    <ul className={styles.statisticsList} >
                        {palletings.map(palleting => (
                            <div onDoubleClick={() => handleDownloadPalleting(palleting)}>
                            <ListItem 
                                key={palleting.timestamp}
                                primaryText={`Density: ${(palleting.density * 100).toFixed(2)}%`}
                                secondaryText={`Date: ${new Date(palleting.timestamp).toLocaleString()}`} 
                            />
                            </div>
                        ))}
                        <IntersectionObs intersectionCallback={allLoaded ? () => {} : getMorePalletings}/>
                    </ul>
                    <button onClick={() => setShowStatistics(false)}>Back to menu</button>
                </> 
            }
        </div>
    )
}

export default MainMenu