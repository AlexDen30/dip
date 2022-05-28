import { useEffect, useRef } from "react"

const IntersectionObs = ({intersectionCallback}) => {

    const observerTarget = useRef()

    useEffect(() => {
        const obs = new IntersectionObserver((e) => {
            e.forEach(intersectTarget => {
                if (intersectTarget.isIntersecting) {
                    intersectionCallback()
                }
            })
        })
        obs.observe(observerTarget.current)
    }, [intersectionCallback])
    
    return <div ref={observerTarget} style={{width: '100%', height: '1px'}}></div>
}

export default IntersectionObs