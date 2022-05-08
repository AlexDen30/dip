import ListItem from '../uiComponents/listItem/ListItem';
import styles from './sideMenu.module.scss';


const SideMenu = ({container, blocks, handleGenerate}) => {
    return (
        <div className={styles.container}>
            <h4>Palleting</h4>
            <div className={styles.info}>
            { !!container.width &&
                <ListItem
                    primaryText={'Container'}
                    secondaryText={`width: ${container.width}, depth: ${container.depth}, height: ${container.height}`}
                />
            }
            { !!blocks.length &&
                <ul className={styles.list}>
                    {blocks.map((box, ind) => (
                        <ListItem
                            key={ind}
                            primaryText={`Box number ${ind}`}
                            secondaryText={`width: ${box.width}, depth: ${box.depth}, height: ${box.height}`}
                        />
                    ))}
                </ul>
            }
            </div>
            <button onClick={handleGenerate}>Generate random Palleting</button>
            <button>Import from JSON</button>
        </div>
    )
}

export default SideMenu