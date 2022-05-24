import { randomInteger } from "./generalUtils"

export const generatePackingData = (withDistance = false) => {
    const container = {
        width: randomInteger(20, 25), 
        height: randomInteger(20, 25),
        depth: randomInteger(26, 31)
    }

    const boxesCount = randomInteger(10, 15)
    const boxes = []

    for (let i = 0; i < boxesCount; i++) {
        boxes.push({
            width: randomInteger(3, 9), 
            height: randomInteger(3, 9),
            depth: randomInteger(3, 9)
        })
    }

    return [container, boxes]
}