import styles from './packingView.module.css';

const blocks = [
    {width: 5, height: 3, top: 5, left: 6},
    {width: 4, height: 6, top: 20, left: 20},
    {width: 2, height: 7, top: 40, left: 40},
    {width: 1, height: 4, top: 60, left: 60},
]

const calculateBlockStyle = (block) => ({
    height: block.height,
    width: block.width,
    top: block.top,  
    left: block.top,
})

function PackingView() {
  return (
    <div className={styles.container}>
        <div className={styles.blocks}>
            {blocks.map((block, ind) => (
                <div 
                    className={styles.block} 
                    style={calculateBlockStyle(block)}
                    key={ind}
                >
                </div>
            ))}
        </div>
    </div>
  );
}

export default PackingView;
