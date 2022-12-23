export const groupByToMap = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(acc[predicate(value, index, array)] ||= []).push(value)
        return acc
    }, {} as { [key: string]: T[] })
