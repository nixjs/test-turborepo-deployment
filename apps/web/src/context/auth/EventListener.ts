export namespace Listener {
    export type ListenerRemover = () => boolean
    export type ListenerAction = (...args: Array<any>) => void
}

export class EventListener {
    private listeners: Array<Listener.ListenerAction> = []

    public getSize = (): number => {
        return this.listeners.length
    }

    public add = (action: Listener.ListenerAction): Listener.ListenerRemover => {
        this.listeners.push(action)
        let removed = false
        return (): boolean => {
            if (removed) {
                return false
            }
            removed = true
            return this.remove(action)
        }
    }

    public remove = (action: Listener.ListenerAction): boolean => {
        for (let i = 0; i < this.listeners.length; ++i) {
            if (action === this.listeners[i]) {
                this.listeners.splice(i, 1)
                return true
            }
        }
        return false
    }

    public fire = (...args: Array<any>): void => {
        for (let i = 0; i < this.listeners.length; ++i) {
            const listener = this.listeners[i]
            listener.apply(listener, args)
        }
    }

    public clean = (): void => {
        this.listeners = []
    }
}

export const eventListener = new EventListener()

// const listener = new EventListener()

// listener.add((a: string, b: string, c: string, n: string): void => {})
// listener.add((a: string, b: string, c: string, n: string): void => {})

// listener.fire('a', 'b', 'c', 'n')
