import { HiLoCardSuit, HiLoCardValue } from 'modules/game/hilo/consts/enum'

function onConvertEnumToArray(en: any) {
    const arrayObjects: { id: number; name: string }[] = []
    // Retrieve key and values using Object.entries() method.
    for (const [propertyKey, propertyValue] of Object.entries(en)) {
        // Ignore keys that are not numbers
        if (!Number.isNaN(Number(propertyKey))) {
            continue
        }

        // Add keys and values to array
        arrayObjects.push({ id: Number(propertyValue), name: propertyKey })
    }

    return arrayObjects
}

function onDeckBuilder() {
    const values = onConvertEnumToArray(HiLoCardValue).filter((v) => Number(v.id) !== HiLoCardValue.HLCV_NONE)
    const suits = onConvertEnumToArray(HiLoCardSuit).filter((s) => Number(s.id) !== HiLoCardSuit.HLCS_NONE)
    const cards = []
    for (let s = 0; s < suits.length; s++) {
        for (let v = 0; v < values.length; v++) {
            const value = values[v]
            const suit = suits[s]
            cards.push({ value, suit })
        }
    }
    return cards
}

export function onRandomCard() {
    const cards = onDeckBuilder()
    const random = Math.floor(Math.random() * 51)
    const cardValue = cards[random].value
    const cardSuit = cards[random].suit
    return [
        [cardSuit.id, cardSuit.name],
        [cardValue.id, cardValue.name]
    ]
}
