export const packingMaxHeight = (container, boxes) => {
    // x-width y-depth z-height ?
    // const boxesForCalc = boxes.map(box => ({...box, isUsed: false}))

    const boxesH = boxes.map(box => ({...box, isUsed: false})).sort((a, b) => b.height - a.height)
    console.log(boxesH)
    // const boxesD = [...boxesForCalc].sort((a, b) => a.depth - b.depth)

    const result = []
    let counter = boxes.length
    let currentX = 0
    let sumWidth = 0

    const addBoxToResult = (box) => {

        result.push({
            position: [sumWidth, 0, currentX],
            metrics: [box.width, box.height, box.depth]
        })

        counter--
        box.isUsed = true
    }

    while (counter > 0) {

        let currPlane = []
        let maxDepth = 0
        sumWidth = 0

        for (let i = 0; i < boxesH.length && counter > 0; i++) {

            if (boxesH[i].width + sumWidth <= container.width && !boxesH[i].isUsed) {
                currPlane.push(boxesH[i])
                addBoxToResult(boxesH[i])
                sumWidth += boxesH[i].width
                
                if (boxesH[i].depth > maxDepth) {
                    maxDepth = boxesH[i].depth
                }
            }
        }

        // доукладка
        for (let i = 0; i < currPlane.length && counter > 0; i++) {
            // можно первую попавшаюся коробку, можно максимально подходящую
            // первую
            const deltaDepth = maxDepth - currPlane[i].depth
            for (let j = 0; i < boxesH.length && counter > 0; i++) {
                if (!boxesH[j].isUsed && boxesH[j].depth <= deltaDepth && boxesH[j].width <= currPlane[i].width) {
                    addBoxToResult(boxesH[j])
                    break;
                }
            }
        }

        currentX += maxDepth
    }

    return result
}