import { useRouter } from 'next/router';
import { ITrack } from '../../Api/response';
import { Card, Grid, IconButton } from '@mui/material';
import { Api, baseURL } from '../../Api';
import style from './TrackItem.module.scss';
import { Pause, Delete } from '@mui/icons-material';
import Eye from '@mui/icons-material/RemoveRedEye';
import Play from '@mui/icons-material/PlayArrow';
import { useAction } from '../../hooks/useActionSelector';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import AddIcon from '@mui/icons-material/Add';
import TrackDialog from '../Dialog/TrackDialog';
import { useState } from 'react';

interface TrackItemProps {
    track: ITrack;
    deleteTrack: (id: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, deleteTrack }) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { picture, name, _id, audio, artist, duration, listens } = track;

    const { active, pause, currentTime, volume } = useTypeSelector(state => state.player)
    const { SetPause, SetActive } = useAction();

    const playAudio = () => {
        SetPause();
        SetActive(track);
    }

    function secondsToMinutes(time: number) {
        let seconds = Math.floor(time % 60);
        return Math.floor(time / 60) + `:${seconds < 10 ? "0" : ""}` + seconds;
    }

    return (<Card className={style.card}>
        <IconButton onClick={playAudio} className={style.play}>
            {
                active?._id == track._id && !pause ? <Pause className={style.play} /> : <Play className={style.play} />
            }
        </IconButton>
        {
            picture && <img className={style.pic} alt={name} src={baseURL + picture}></img>
        }
        <div className={style.names}>
            <h3 style={{ margin: 0 }}>{name}</h3>
            <p style={{ margin: 0 }}>{artist}</p>
        </div>
        <span className={style.progress}>{active?._id == track._id ? secondsToMinutes(currentTime) + ' / ' + secondsToMinutes(duration) : secondsToMinutes(duration)}</span>
        <div className={style.action}>
            <IconButton onClick={() => router.push('/track/' + _id)}>
                <AddIcon />
            </IconButton>
            <IconButton onClick={() => router.push('/track/' + _id)}>
                <Eye />
            </IconButton>
            <IconButton style={{ marginRight: 15 }} onClick={() => { setOpen(!open) }}>
                <Delete />
                <TrackDialog FC={() => deleteTrack(_id)} open={open} title={`Вы уверены, что хотите удалить трек ${track.name}?`} description='Минуточку внимания. Отменить удаление трека не получится. Трек исчезнет раз и навсегда.' />
            </IconButton>
        </div>

    </Card >);
}

export default TrackItem;