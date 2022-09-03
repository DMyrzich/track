import { ITrack } from '../../Api/response';

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    repeat: boolean;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    REPEAT = "REPEAT",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}

interface RepeatAction {
    type: PlayerActionTypes.REPEAT
}

interface PauseAction {
    type: PlayerActionTypes.PAUSE
}

interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE
    payload: ITrack;
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number;
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number;
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number;
}

export type PlayerAction = RepeatAction | PauseAction | SetActiveAction | SetDurationAction | PlayAction | SetVolumeAction | SetCurrentTimeAction;
