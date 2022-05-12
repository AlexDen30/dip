import styles from './modalWindow.module.scss';

const ModalWindow = ({isShowed, close, children}) => {
    return (
        <div className={`${styles.modal} ${isShowed ? styles.active : ''}`} onClick={() => close()}>
            <div className={`${styles.modalContent} ${isShowed ? styles.active : ''}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalWindow;