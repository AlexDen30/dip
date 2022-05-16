import { randomInteger } from "./generalUtils";

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const packing = (container, boxes, order) => {

    let realVolume = 0
    const result = []
    let currentX = 0

    const addToResult = (box, position) => {
        
        result.push({
            position,
            metrics: { width: box.width, height: box.height, depth: box.depth }
        })
    }

    let i = 0
    while (i < boxes.length) {

        let maxDepth = 0
        let sumWidth = 0
        let sumOfAreas = 0

        // ряд вправо
        while (i < boxes.length && boxes[order[i]].width + sumWidth <= container.width) {
            
            addToResult(boxes[order[i]], [sumWidth, 0, currentX])
            
            if (maxDepth < boxes[order[i]].depth) {
                maxDepth = boxes[order[i]].depth
            }
            sumOfAreas += boxes[order[i]].width * boxes[order[i]].height


            const basement = boxes[order[i]]
            let sumHeight = basement.height

            i++

            // ряд вверх
            while (true) {

                if (i < boxes.length 
                        && boxes[order[i]].height + sumHeight <= container.height
                        && boxes[order[i]].width <= basement.width
                        && boxes[order[i]].depth <= basement.depth
                    ) {
                    
                    addToResult(boxes[order[i]], [sumWidth, sumHeight, currentX])
                    sumHeight += boxes[order[i]].height

                    i++

                } else {
                    
                    if (sumHeight > basement.height) {
                        realVolume += basement.width * basement.depth * (sumHeight - basement.height)
                    }

                    break
                }

            }

            sumWidth += basement.width
        }

        if (sumWidth !== 0) {
            realVolume += maxDepth * sumOfAreas
            currentX += maxDepth
        }
    }

    return [result, realVolume]
}

const calculateSumOfBoxesVolumes = (boxes) => {

    let sumOfVolumes = 0

    for (let box of boxes) {
        sumOfVolumes += box.width * box.depth * box.height
    }

    return sumOfVolumes
}

const geneticPacking = (container, boxes) => {

    // для дальнейшего вычисления критерия подсчитаем сумму объёмов
    const sumOfVolumes = calculateSumOfBoxesVolumes(boxes)

    // генерируем хромосомы
    let chromosomes = [[]]

    for (let i = 0; i < boxes.length; i++) {
        chromosomes[0].push(i)
    }

    for (let i = 1; i < boxes.length; i++) {
        const newPermutation = [...chromosomes[0]]
        shuffle(newPermutation)
        chromosomes.push(newPermutation)
    }

    // элементы укладки и их коэффициент
    let currentPopulation = []

    // i = количеству поколений
    for (let i = 0; i < 10000; i++) {

        currentPopulation = []

        for (let chromosome of chromosomes) {
            const [packingValue, volume] = packing(container, boxes, chromosome)
            currentPopulation.push([packingValue, volume, chromosome])
        }

        // сортируем по убыванию коэффициента
        currentPopulation.sort((a, b) => a[1] - b[1])

        // добавляем лучших
        const newGenerationChromosomes = [currentPopulation[0][2], currentPopulation[1][2]]

        // скрещиваем не считая две худшие особи
        for (let j = 0; j < currentPopulation.length - 2; j++) {
            // выбираем три случайные особи
            const indexOfChromosomes = []
            while (indexOfChromosomes.length !== 3) {
                const index = randomInteger(0, currentPopulation.length)
                if (!indexOfChromosomes.includes(index)) {
                    indexOfChromosomes.push(index)
                }
            }

            const breedingChromosomes = indexOfChromosomes.map(index => currentPopulation[index]).sort((a, b) => b[1] - a[1])
            // убираем слабую особь
            breedingChromosomes.pop()

            // скрещиваем
            // выбираем точку скрещивания - элементы до неё идут в новую хромосому
            // остальные берём из второго родителя (вычеркивая элементы, взятые из первого)

            const pointOfBreeding = randomInteger(0, breedingChromosomes[0].length - 1)
            const firstPart = [...breedingChromosomes[0][2].slice(0, pointOfBreeding)]
            const secondPart = [...breedingChromosomes[1][2]]

            for (let elemFromFirstPart of firstPart) {
                const indexOfDeletingElem = secondPart.findIndex(elem => elem === elemFromFirstPart)
                if (indexOfDeletingElem >= 0) {
                    secondPart.splice(indexOfDeletingElem, 1)
                }
            }


            newGenerationChromosomes.push([...firstPart, ...secondPart])
        }


        // мутации
        for (let j = 2; j < newGenerationChromosomes.length; j++) {

            const randNum = randomInteger(0, 100)
            const isMutating = randNum === 1

            if (isMutating) {
                const newPositionOfFirstElem = randomInteger(1, newGenerationChromosomes.length - 1)

                let swapContainer = newGenerationChromosomes[j][0]
                newGenerationChromosomes[j][0] = newGenerationChromosomes[j][newPositionOfFirstElem]
                newGenerationChromosomes[j][newPositionOfFirstElem] = swapContainer
            } 
        }

        chromosomes = newGenerationChromosomes
    }

    return [currentPopulation[0][0], sumOfVolumes / currentPopulation[0][1]]
}

export default geneticPacking