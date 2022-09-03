import { AxiosInstance } from "axios";
import { CreateComment, GetComment, IComment, ITrack } from "./response";

export const MusicApi = (instance: AxiosInstance) => ({

    async get(): Promise<ITrack[]> {

        const { data } = await instance.get("track?count=10");
        return data;
    },

    async getOne(id: string): Promise<ITrack> {

        const { data } = await instance.get("track/" + id);
        return data;
    },

    async delete(id: string): Promise<ITrack> {

        const { data } = await instance.delete("track/" + id);
        return data;
    },

    async create(obj: FormData): Promise<ITrack> {

        const { data } = await instance.post("track", obj);
        return data;
    },

    async createComment(comment: CreateComment): Promise<IComment> {

        const { data } = await instance.post("comment", comment);
        return data;
    },

    async getComment(params: GetComment): Promise<IComment[]> {

        const { trackId } = params;
        const { comments } = (await instance.get<ITrack>("comment/" + trackId, { params })).data;
        return comments;
    },
})