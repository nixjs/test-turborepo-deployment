export const randomUnique = (min: number, max: number, count: number) => {
    const numbers = [] // new empty array
    let p: boolean

    for (let i = 0; i < count; i++) {
        do {
            const n = Math.floor(Math.random() * (max - min + 1)) + min
            p = numbers.includes(n)
            if (!p) {
                numbers.push(n)
            }
        } while (p)
    }
    return numbers
}
