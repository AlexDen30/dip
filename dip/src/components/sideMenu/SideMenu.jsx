import { useState } from 'react';
import ListItem from '../uiComponents/listItem/ListItem';
import ModalWindow from '../uiComponents/modalWindow/ModalWindow';
import downloadJson from '../utilityComponents/downloadFile';
import JsonUploader from '../utilityComponents/fileUploader/JsonUploader';
import styles from './sideMenu.module.scss';

const SideMenu = ({container, blocks, density, handleGenerate, handleUploadJson}) => {

    const [isMenuShowed, setIsMenuShowed] = useState(false);

    const handleDownload = () => {
        downloadJson({container, density, blocks}, 'packing.json');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                
                <button onClick={() => setIsMenuShowed(true)} className={styles.popupMenuButton}>Menu</button>
                <h4 className={styles.headerName}>Palleting</h4>
            </div>
            <div className={styles.info}>
            { !!container.width &&
                <ListItem
                    primaryText={`Container (density: ${(density * 100).toFixed(2)}%)`}
                    secondaryText={`width: ${container.width}, depth: ${container.depth}, height: ${container.height}`}
                />
            }
            { !!blocks.length &&
                <ul className={styles.list}>
                    {blocks.map((box, ind) => (
                        <ListItem
                            key={ind}
                            primaryText={`Box number ${ind}`}
                            secondaryText={`width: ${box.metrics.width}, depth: ${box.metrics.depth}, height: ${box.metrics.height}`}
                        />
                    ))}
                </ul>
            }
            </div>
            <div className={styles.footer}>
                <button onClick={handleGenerate}>Generate random Palleting</button>
            </div>
            <ModalWindow isShowed={isMenuShowed} close={() => setIsMenuShowed(false)}>
                <div className={styles.modalContainer} onClick={() => setIsMenuShowed(false)}>
                    <JsonUploader returnParsedJson={handleUploadJson}/>
                    <button onClick={handleDownload}>Export as JSON</button>
                    <button onClick={handleGenerate}>Generate random Palleting</button>
                    <button>Show statistics</button>
                </div>
            </ModalWindow>
        </div>
    )
}

export default SideMenu