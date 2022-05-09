export const packingMaxHeight = (container, boxes) => {
    // x-width y-depth z-height ?
    const boxesH = boxes.map(box => ({...box, isUsed: false})).sort((a, b) => b.height - a.height)

    const result = []
    let counter = boxes.length
    let currentX = 0
    let sumWidth = 0

    let sumVolume = 0
    let realVolume = 0

    const addBoxToResult = (box, position) => {

        result.push({
            position,
            metrics: { width: box.width, height: box.height, depth: box.depth}
        })

        counter--
        box.isUsed = true

        sumVolume += box.width * box.height * box.depth
    }

    while (counter > 0) {

        // Несущая линия блоков
        let currPlane = []
        let maxDepth = 0
        sumWidth = 0

        let currentVolume = 0

        for (let i = 0; i < boxesH.length && counter > 0 && boxesH[i].width + sumWidth <= container.width; i++) {

            if (!boxesH[i].isUsed) {
                currPlane.push({box: boxesH[i], xCoord: sumWidth})
                addBoxToResult(boxesH[i], [sumWidth, 0, currentX])
                // только ширина и высота потому что, глубина ряда общая 
                currentVolume += boxesH[i].width * boxesH[i].height

                // добавляем первый попавшийся блок сверху
                for (let j = 0; j < boxesH.length; j++) {
                    if (counter > 0 && !boxesH[j].isUsed
                        && boxesH[j].height <= (container.height - boxesH[i].height)
                        && boxesH[j].width <= boxesH[i].width
                        && boxesH[j].depth <= boxesH[i].depth
                    ) {
                        addBoxToResult(boxesH[j], [sumWidth, boxesH[i].height, currentX])

                        // add to volumes
                        // only width and height cause depth is max depth of row box
                        realVolume += boxesH[j].width * boxesH[j].height * boxesH[j].depth

                        break
                    }
                }

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
            const deltaDepth = maxDepth - currPlane[i].box.depth
            for (let j = 0; j < boxesH.length && counter > 0; j++) {
                if (!boxesH[j].isUsed && boxesH[j].depth <= deltaDepth && boxesH[j].width <= currPlane[i].box.width) {
                    addBoxToResult(boxesH[j], [currPlane[i].xCoord, 0, currentX + currPlane[i].box.depth])
                    break
                }
            }
        }

        //add rowVolume
        if (!!currPlane.length) {
            currentVolume *= maxDepth
            realVolume += currentVolume
        }

        currentX += maxDepth
    }

    return [result, sumVolume / realVolume]
}
