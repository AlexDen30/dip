import { randomInteger } from "./generalUtils"

export const generatePackingData = () => {
    const container = {
        width: randomInteger(20, 25), 
        height: randomInteger(10, 15),
        depth: randomInteger(30, 50)
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