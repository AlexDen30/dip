import { randomInteger } from "./generalUtils"

export const generatePackingData = () => {
    const container = {
        width: randomInteger(20, 25), 
        height: randomInteger(20, 25),
        depth: randomInteger(26, 31)
    }

    const boxesCount = randomInteger(10, 15)
    const boxes = []

    for (let i = 0; i < boxesCount; i++) {
        boxes.push({
            width: randomInteger(4, 6), 
            height: randomInteger(4, 6),
            depth: randomInteger(4, 6)
        })
    }

    return [container, boxes]
}