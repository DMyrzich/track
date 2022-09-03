export interface ITrack {
    _id: string,
    __v: number,
    name: string,
    text: string,
    listens: number,
    duration: number,
    artist: string;
    picture: string,
    audio: string,
    albums: string[],
    comments: IComment[],
}

export interface IComment {
    _id: string,
    __v: number,
    username: string,
    text: string,
    date: string;
}


export interface CreateComment {
    trackId: string,
    username: string,
    text: string,
}

export interface GetComment {
    trackId: string,
    count: number,
    offset: number,
}