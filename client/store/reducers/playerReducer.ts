import { PlayerState, PlayerAction, PlayerActionTypes } from '../types/player';

const initialState: PlayerState = {
    active: null,
    duration: 0,
    volume: 50,
    currentTime: 0,
    pause: true,
    repeat: false,
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {

    switch (action.type) {

        case PlayerActionTypes.PAUSE: {
            return { ...state, pause: true };
        }
        case PlayerActionTypes.PLAY: {
            return { ...state, pause: false };
        }
        case PlayerActionTypes.SET_ACTIVE: {
            return { ...state, active: action.payload, duration: 0, currentTime: 0 };
        }
        case PlayerActionTypes.SET_CURRENT_TIME: {
            return { ...state, currentTime: action.payload };
        }
        case PlayerActionTypes.SET_VOLUME: {
            return { ...state, volume: action.payload };
        }
        case PlayerActionTypes.SET_DURATION: {
            return { ...state, duration: action.payload };
        }
        case PlayerActionTypes.REPEAT: { 
            return { ...state, repeat: !state.repeat };
        }
        default: return state;
    }
}