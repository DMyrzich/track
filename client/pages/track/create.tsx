import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import TrackCreate from '../../component/TrackCreate/TrackCreate';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, TextField } from '@mui/material';
import FileUpload from '../../component/FileUpload/FileUpload';
import { useInput } from '../../hooks/useInput';
import { Api } from '../../Api';
import { useRouter } from 'next/router';
import style from '../../styles/Track.module.scss';

const CreateTrack: NextPage = () => {

    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const router = useRouter();

    const next = () => {
        setActiveStep((el) => el + 1)
    }

    const trackUpload = async () => {

        if (audio && picture) {
            const data = new FormData();
            data.append('name', name.value)
            data.append('artist', artist.value)
            data.append('text', text.value)
            data.append('picture', picture)
            data.append('audio', audio)
            const track = await Api().music.create(data);
            if (track) {
                router.push('/track/' + track._id)
            }
        }
    }

    const back = () => {
        setActiveStep((el) => el - 1)
    }

    return (<MainLayout>
        <h1 style={{ marginBottom: 35 }}>Загрузка трека</h1>
        <TrackCreate activeStep={activeStep}>
            {
                activeStep == 0 && <Grid height={295} container direction={'column'} padding={2}>
                    <TextField {...name} style={{ margin: 7 }} id="outlined-basic" label="Название трека" variant="outlined" />
                    <TextField {...artist} style={{ margin: 7 }} id="outlined-basic" label="Исполнитель трека" variant="outlined" />
                    <TextField {...text} style={{ margin: '7px 7px 0px 7px' }} id="outlined-multiline-static" multiline rows={3} label="Текст песни" variant="outlined" />
                </Grid>
            }
            {
                activeStep == 1 && <FileUpload accept={'image/*'} click={setPicture} text="Перетащите фото для загрузки обложки..." />
            }
            {
                activeStep == 2 && <FileUpload accept={'audio/*'} click={setAudio} text="Перетащите аудио для загрузки..." />
            }
            {
                activeStep == 3 && <Grid height={295} container direction={'column'} padding={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <h3>Нажмите на кнопку загрузки трека, чтобы отправить данные на сервер.</h3>
                    <Button style={{ width: 250, height: 50 }} variant={'contained'} onClick={trackUpload} disabled={activeStep != 3}>
                        Загрузить трек
                    </Button>
                </Grid>
            }
            <div className={style.createAction}>
                <Button style={{ width: 120 }} onClick={back} disabled={activeStep == 0}>
                    <ArrowBackIcon style={{ cursor: 'pointer', width: 50, height: 50 }} />
                    Назад
                </Button>
                <Button style={{ width: 120 }} onClick={next} disabled={activeStep == 3}>
                    Вперед
                    <ArrowBackIcon style={{ cursor: 'pointer', width: 50, height: 50, transform: 'rotate(180deg)' }} />
                </Button>
            </div>
        </TrackCreate>
    </MainLayout >)
}

export default CreateTrack

