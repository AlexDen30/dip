import ListItem from '../uiComponents/listItem/ListItem';
import JsonUploader from '../utilityComponents/fileUploader/JsonUploader';
import styles from './sideMenu.module.scss';


const SideMenu = ({container, blocks, density, handleGenerate, handleUploadJson}) => {
    return (
        <div className={styles.container}>
            <h4>Palleting</h4>
            <div className={styles.info}>
            { !!container.width &&
                <ListItem
                    primaryText={`Container (density: ${density.toFixed(4) * 100}%)`}
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
            <button onClick={handleGenerate}>Generate random Palleting</button>
            {/* <button >Import from JSON</button> */}
            <JsonUploader returnParsedJson={handleUploadJson}/>
        </div>
    )
}

export default SideMenu