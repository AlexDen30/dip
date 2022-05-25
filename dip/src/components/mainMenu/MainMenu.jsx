import styles from './mainMenu.module.scss';
import JsonUploader from '../utilityComponents/fileUploader/JsonUploader';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../..';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const MainMenu = ({closeMenu, handleUploadJson, handleGenerate, handleDownload}) => {

    const {firebaseAuth} = useContext(FirebaseContext)

    const [user, setUser] = useState({})

    onAuthStateChanged(firebaseAuth, currentUser => {!user.email && setUser(currentUser)})

    const logout = async () => {
        try {
            await signOut(firebaseAuth)
        } catch (error) {
            console.log(error.message)
        }
    }

    return ( 
    <div className={styles.modalContainer} onClick={closeMenu}>
        <h4>Welcome, {user.email}</h4>
        <JsonUploader returnParsedJson={handleUploadJson}/>
        <button onClick={handleDownload}>Export as JSON</button>
        <button onClick={handleGenerate}>Generate random Palleting</button>
        <button>Show statistics</button>
        <button onClick={logout}>Logout</button>
    </div>
    )
}

export default MainMenu