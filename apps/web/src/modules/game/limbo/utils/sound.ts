import { SoundEvent, SourceType } from 'modules/game/limbo/context/SoundContext/types'

export class sound {
    audios: SourceType<any> = {}

    enabled = true

    constructor(dict: SourceType<string>) {
        Object.keys(dict).forEach((item) => {
            Object.assign(this.audios, { [item]: new Audio(dict[item as SoundEvent]) })
        })
    }

    onSoundClick(isTogglesound = false) {
        if (isTogglesound) {
            if (!this.enabled) {
                this.audios.click && this.audios.click.play()
            }
            return
        }
        if (this.enabled) {
            this.audios.click && this.audios.click.play()
        }
    }

    onSoundError() {
        if (this.enabled) {
            this.audios.error && this.audios.error.play()
        }
    }

    onSoundWin() {
        if (this.enabled) {
            this.audios.win && this.audios.win.play()
        }
    }

    onSoundLose() {
        if (this.enabled) {
            this.audios.lose && this.audios.lose.play()
        }
    }

    onSourcePlay() {
        if (this.enabled) {
            this.audios.play && this.audios.play.play()
        }
    }

    onSoundEnabled(payload: boolean) {
        this.enabled = payload
    }
}
