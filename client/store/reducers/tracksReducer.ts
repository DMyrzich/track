import { TracksAction, TracksActionTypes, TracksState } from '../types/tracks';

const initialState: TracksState = {
    tracks: [],
    upload: null,
    track: null,
    error: ''
}

export const tracksReducer = (state = initialState, action: TracksAction): TracksState => {

    switch (action.type) {

        case TracksActionTypes.GET_ALL_TRACKS: {
            return { ...state, tracks: action.payload, error: '' };
        }
        case TracksActionTypes.UPLOAD_TRACKS: {
            return { ...state, error: '', upload: action.payload };
        }
        case TracksActionTypes.TRACKS_ERROR: {
            return { ...state, error: action.payload };
        }
        case TracksActionTypes.GET_COMMENT: {
            return { ...state, track: { ...state?.track, comments: [...action.payload] }, error: '' };
        }
        case TracksActionTypes.GET_INFO_TRACK: {
            return { ...state, track: action.payload, error: '' };
        }
        default: return state;
    }
}