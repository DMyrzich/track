import { ITrack, IComment } from '../../Api/response';

export interface TracksState {
    tracks: ITrack[],
    upload: ITrack | null,
    track: ITrack | null; 
    error: string;
}

export enum TracksActionTypes {
    GET_ALL_TRACKS = "GET_ALL_TRACKS",
    UPLOAD_TRACKS = "UPLOAD_TRACKS",
    GET_COMMENT = "GET_COMMENT",
    GET_INFO_TRACK = "GET_INFO_TRACK",
    TRACKS_ERROR = "TRACKS_ERROR",
}

interface GetAllTracks {
    type: TracksActionTypes.GET_ALL_TRACKS
    payload: ITrack[];
}

interface GetInfoTrack {
    type: TracksActionTypes.GET_INFO_TRACK
    payload: ITrack;
}

interface GetAllComment {
    type: TracksActionTypes.GET_COMMENT
    payload: IComment[];
}

interface TracksError {
    type: TracksActionTypes.TRACKS_ERROR
    payload: string;
}

interface UpLoadTrack {
    type: TracksActionTypes.UPLOAD_TRACKS
    payload: ITrack | null;
}

export type TracksAction = GetAllTracks | TracksError | UpLoadTrack | GetAllComment | GetInfoTrack;
