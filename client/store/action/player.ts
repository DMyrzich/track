import { PlayerAction, PlayerActionTypes } from '../types/player';
import { ITrack } from '../../Api/response';

export const SetPlay = (): PlayerAction => {
    return { type: PlayerActionTypes.PLAY }
}

export const SetPause = (): PlayerAction => {
    return { type: PlayerActionTypes.PAUSE }
}

export const SetRepeat = (): PlayerAction => {
    return { type: PlayerActionTypes.REPEAT }
}

export const SetVolume = (payload: number): PlayerAction => {
    return { type: PlayerActionTypes.SET_VOLUME, payload }
}

export const SetDuration = (payload: number): PlayerAction => {
    return { type: PlayerActionTypes.SET_DURATION, payload }
}

export const SetCurrentTime = (payload: number): PlayerAction => {
    return { type: PlayerActionTypes.SET_CURRENT_TIME, payload }
}

export const SetActive = (payload: ITrack): PlayerAction => {
    return { type: PlayerActionTypes.SET_ACTIVE, payload }
}