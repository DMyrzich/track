import type { GetServerSideProps, NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import TrackFull from '../../component/TrackFull/TrackFull';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchInfoTrack } from '../../store/action/tracks';

const TrackInfo: NextPage = () => {

    return (<MainLayout>
        <TrackFull />
    </MainLayout>)
}


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    const { id } = ctx.query;
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchInfoTrack(id as string));
    return {
        props: {},
    };
});

export default TrackInfo
