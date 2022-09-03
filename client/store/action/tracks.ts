import { Dispatch } from 'react';
import { Api } from '../../Api';
import { TracksAction, TracksActionTypes } from '../types/tracks';
import { ITrack, IComment } from '../../Api/response';


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TracksAction>) => {
        try {
            const payload = await Api().music.get();
            dispatch({ type: TracksActionTypes.GET_ALL_TRACKS, payload })
        } catch {
            dispatch({ type: TracksActionTypes.TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков. Попробуйте загрузить треки позже!' })
        }
    }
}

export const fetchInfoTrack = (id: string) => {
    return async (dispatch: Dispatch<TracksAction>) => {
        try {
            const payload = await Api().music.getOne(id);
            dispatch({ type: TracksActionTypes.GET_INFO_TRACK, payload })
        } catch {
            dispatch({ type: TracksActionTypes.TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков. Попробуйте загрузить треки позже!' })
        }
    }
}

export const getComment = (payload: IComment[]) => {
    try {
        return ({ type: TracksActionTypes.GET_COMMENT, payload })
    } catch {
        return ({ type: TracksActionTypes.TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков. Попробуйте загрузить треки позже!' })
    }
}
