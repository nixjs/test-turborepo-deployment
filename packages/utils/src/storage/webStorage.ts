export type StoreValue = boolean | number | string | ReadonlyArray<StoreValue | null> | StoreObject

export interface StoreObject {
    readonly [key: string]: StoreValue | null
}

export abstract class WebStorage {
    /** The {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API | Web Storage API} instance on which to add, update, or delete store values. */
    protected abstract readonly store: Storage

    get length(): number {
        return this.store.length
    }

    getItem<T extends StoreValue>(key: string): T | null {
        return WebStorage.parseRawValue(this.store.getItem(key))
    }

    setItem<T extends StoreValue>(key: string, value: T): this {
        this.store.setItem(key, JSON.stringify(value))
        return this
    }

    removeItem(key: string): this {
        this.store.removeItem(key)
        return this
    }

    clears(keys: string[]) {
        for (let i = 0; i < keys.length; i++) {
            const e = keys[i]
            this.store.removeItem(e)
        }
        return this
    }

    static parseRawValue<T extends StoreValue>(rawValue: string | null): T | null {
        try {
            return rawValue ? JSON.parse(rawValue) : null
        } catch (error) {
            return null
        }
    }
}
