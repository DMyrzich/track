import type { GetServerSidePropsContext, NextPageContext } from 'next';
import axios from 'axios';
import { MusicApi } from './music';

export type ApiReturnType = {
    music: ReturnType<typeof MusicApi>;
};

export const baseURL = 'https://track-top.herokuapp.com/';

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext) => {

    const instance = axios.create({ baseURL });

    return { music: MusicApi(instance) }
};