import { useRouter } from 'next/router';
import { Card, Grid, TextField, Button, Pagination } from '@mui/material';
import { Api, baseURL } from '../../Api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import style from './TrackFull.module.scss';
import { useForm } from 'react-hook-form';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { useAction } from '../../hooks/useActionSelector';
import { useTypeSelector } from '../../hooks/useTypeSelector';


const TrackFull: React.FC = () => {

    const router = useRouter();
    const [text, setText] = useState('');
    const [offset, setOffset] = useState(0);
    const [username, setUsername] = useState('');
    const [showMore, setShowMore] = useState(false);

    const { error, track } = useTypeSelector(state => state.tracks);

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    const { getComment } = useAction();

    if (!track) {
        return (<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h1>Трек не найден</h1>
            <Button style={{ height: 50, borderRadius: 100, marginTop: 'auto' }} onClick={() => router.push('/track')} variant="outlined" color='primary'>Вернуться назад</Button>
            <img src="https://pic.52112.com/180905/EPS-180905_293/1gimWBZJQd_small.jpg" />
        </div >);
    }

    const count = track.__v;

    const getTime = (date: string) => {

        const dtm = new Date(date);
        const now = new Date();

        if (dtm.getDay() == now.getDay()) {
            return `Сегодня: ${dtm.toLocaleTimeString()}`
        }

        if (dtm.getDay() == now.getDay() - 1) {
            return `Вчера: ${dtm.toLocaleTimeString()}`
        }

        return dtm.toLocaleDateString();
    }

    const onSubmit = async () => {
        const com = await Api().music.createComment({ text: text, username: username, trackId: track._id });
        if (com) {

            track.comments.push(com);
            getComment(track.comments)
        }
        setText('');
        setUsername('');
    }

    const onSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors('text')
        setText(e.target.value)
    };

    const onSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors('username')
        setUsername(e.target.value)
    };

    const onChangeOffset = (_event: ChangeEvent<unknown>, page: number) => {

        setOffset((10 * page) - 10);
    }

    const onGetComment = async () => {

        const comments = await Api().music.getComment({ count: 10, offset, trackId: track?._id });
        if (comments) {
            getComment(comments)
        }
    }

    return (<>
        <div className={style.btnTitle}>
            <ArrowBackIcon className={style.back} onClick={() => router.back()} />
            <h1>Информация о песни</h1>
        </div>
        <Grid container alignItems={'center'} direction={'column'} >

            <Card className={style.card}>
                <img width={300} height={300} alt={track?.name} src={baseURL + track.picture} />
                <div className={style.infoTrack}>
                    <div className={style.infoTrackItem}>
                        <b>Название: </b>{track.name}
                    </div>
                    <div className={style.infoTrackItem}>
                        <b>Исполнитель: </b>{track.artist}
                    </div>
                    <div className={style.infoTrackItem}>
                        <b>Прослушиваний: </b>{track?.listens ? track?.listens : 0}
                    </div>
                    <div className={style.infoTrackItem}>
                        <b>Текст песни: </b>{track?.text.slice(0, 150)}
                        {
                            showMore && <span>{track?.text.slice(150)}</span>
                        }
                        <div style={{ paddingTop: 5, fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => setShowMore(!showMore)}>{showMore ? 'Скрыть' : 'Показать'} полный текст песни</div>
                    </div>
                </div>
            </Card>

            <Card className={style.card}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.addFormComment}>
                    <b style={{ paddingBottom: 10 }}>Отправить комментарий</b>
                    <div>
                        <TextField fullWidth {...register('username', { minLength: 5 })} value={username} onChange={onSetUsername} id="username" required label="Имя пользователя" variant="outlined" />
                        {errors.username && <span style={{ color: 'red' }}>Заполните имя пользователя</span>}
                    </div>
                    <div>
                        <TextField fullWidth {...register('text', { minLength: 5 })} value={text} onChange={onSetText} id="text" required multiline minRows={4} label="Комментарий" variant="outlined" />
                        {errors.text && <span style={{ color: 'red' }}>Заполните поле текст комментария</span>}
                    </div>
                    <Button type="submit" variant="contained">Отправить</Button>
                </form>
            </Card>

            {
                track.comments.length > 0 && <Card className={style.card} style={{ flexDirection: 'column' }}>
                    <b style={{ paddingBottom: 10 }}>Список комментариев:</b>
                    {
                        track.comments.map(({ date, text, username }, idx) =>
                            <div key={idx} className={style.line}>
                                <div className={style.commentForm}>
                                    <b>Автор: {username}</b>
                                    <span>{getTime(date)}</span>
                                </div>
                                <span>{text}</span>
                            </div>)
                    }
                </Card>
            }
            {
                count > 10 && <Pagination onChange={onChangeOffset} onClick={onGetComment} style={{ paddingTop: 15 }} count={(count / 10) % 1 == 0 ? Math.ceil(count / 10) : 1 + Math.floor(count / 10)} color="primary" />
            }
        </Grid>
        <h3>Здесь собраны самые лучшие треки мира!</h3>
    </>);
}

export default TrackFull;