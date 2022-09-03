import { Card, Grid, IconButton } from '@mui/material'
import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import TrackList from '../../component/TrackList/TrackList';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { fetchTracks } from '../../store/action/tracks';
import { NextThunkDispatch, wrapper } from '../../store';
import Play from '@mui/icons-material/PlayArrow';
import Reply from '@mui/icons-material/Reply';
import { useAction } from '../../hooks/useActionSelector';
import style from '../../styles/Track.module.scss';


const Track: NextPage = () => {

    const router = useRouter();

    const { error, tracks } = useTypeSelector(state => state.tracks);

    const { SetPause, SetActive } = useAction();

    const playAudio = () => {
        SetPause();
        SetActive(tracks[0]);
    }

    return (<MainLayout>
        <h1>Песни</h1>
        <Grid container justifyContent={'center'}>
            <Card className={style.card}>
                <Grid container justifyContent={'space-between'} style={{ alignItems: 'center' }}>
                    <div className={style.container}>
                        <img className={style.img} src="https://zvuk.com/static/avatar/playlist/f41/93a/1062105.46ae721.png"></img>
                        <div className={style.info}>
                            <span>ПЛЕЙЛИСТ</span>
                            <h1>Топ-100</h1>
                            Самые прослушиваемые треки дня. Этот плейлист обновляется автоматически.
                        </div>
                    </div>
                    <Button className={style.btnCreate} onClick={() => router.push('track/create')} variant="outlined" color='primary'>Загрузить</Button>
                    <div className={style.action}>
                        <Button className={style.actionBtn} onClick={playAudio} variant="outlined" color='primary'>
                            <Play />
                            Играть
                        </Button>
                        <Button className={style.actionBtn} onClick={() => router.push('track/create')} variant="outlined" color='primary'>
                            <Reply />
                        </Button>
                    </div>
                </Grid>
            </Card>
            <TrackList tracks={tracks} />
        </Grid >
        <h3>Здесь собраны самые лучшие треки мира!</h3>
    </MainLayout >)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());
    return {
        props: {},
    };
});

export default Track
