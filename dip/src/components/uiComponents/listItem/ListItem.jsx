import styles from './listItem.module.scss';

const ListItem = ({primaryText, secondaryText}) => {
    return (
        <li className={`${styles.container} border-top-bottom`}>
            <div className={styles.primaryText}>
                {primaryText}
            </div>
            <div className={styles.secondaryText}>
                {secondaryText}
            </div>
        </li>
    )
}

export default ListItem