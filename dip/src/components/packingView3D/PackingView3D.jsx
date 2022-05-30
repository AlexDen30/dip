import { OrbitControls, Shadow, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from './packingView3D.module.css';

const translateBoxPosition = (metrics, position) => ([
    position[0] + metrics[0] / 2,
    position[1] + metrics[1] / 2,
    position[2] + metrics[2] / 2,
])

const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16)

const Box = ({position, metrics, color, opacity}) => {
    return (
        <mesh position={translateBoxPosition(metrics, position)}>
            <boxBufferGeometry attach='geometry' args={metrics}/>
            <meshLambertMaterial attach='material' color={color} transparent={!!opacity} opacity={opacity}/>
        </mesh>
    )
}

const PackingView3D = ({blocks, containerMetrics}) => {
  return (
    <div className={styles.container}>
        <Canvas camera={{position:[50, 25, 50]}}>
            <OrbitControls />
            <Sky />
            <ambientLight intensity={0.5} />
            <spotLight position={[1000, 1000, 1000]} angle={0.3} />
            <axesHelper args={[10]} />
            <Box position={[0, 0, 0]} metrics={containerMetrics} color='seagreen' opacity={0.25}/>
            {blocks.map((block, ind) => (
                <Box
                    position={block.position}
                    metrics={[block.metrics.width, block.metrics.height, block.metrics.depth]}
                    color={generateRandomColor()}
                    key={ind}
                />
            ))}
        </Canvas>
    </div>
  );
}

export default PackingView3D;
