import { FastRewindRounded, Pause, VolumeUp } from '@mui/icons-material';
import Play from '@mui/icons-material/PlayArrow';
import style from './Player.module.scss'
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useAction } from '../../hooks/useActionSelector';
import { IconButton } from '@mui/material';
import { baseURL } from '../../Api/index';
import { useEffect, useState } from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';

let audio: HTMLAudioElement;

const Player = () => {

    const { error, tracks } = useTypeSelector(state => state.tracks);
    const { active, pause, currentTime, duration, volume, repeat, } = useTypeSelector(state => state.player)
    const { SetPlay, SetPause, SetVolume, SetCurrentTime, SetDuration, SetRepeat, SetActive } = useAction();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        }
        setAudio();
        playAudio();
    }, [active])

    const nextAudio = () => {
        const idx = tracks.findIndex(el => el._id == active?._id) - 1
        if (idx == -1) {
            return;
        }
        SetPause();
        SetActive(tracks[idx]);
    }

    const backAudio = () => {
        const idx = tracks.findIndex(el => el._id == active?._id) + 1
        if (tracks.length == idx) {
            return;
        }
        SetPause();
        SetActive(tracks[idx]);
    }

    const playAudio = () => {
        if (pause) {
            SetPlay();
            audio.play();
        } else {
            SetPause();
            audio.pause();
        }
    }

    const repeatAudio = () => {
        audio.loop = !repeat;
        SetRepeat();
    }

    const setAudio = () => {
        if (active) {
            audio.src = baseURL + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => SetDuration(audio.duration);
            audio.ontimeupdate = () => SetCurrentTime(audio.currentTime);
            audio.onended = function () {
                if (!audio.loop) {
                    audio.currentTime = 0;
                    SetPause();
                }
            };
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = +e.target.value / 100;
        SetVolume(+e.target.value)
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Math.ceil(+e.target.value);
        SetCurrentTime(+e.target.value)
    }

    function secondsToMinutes(time: number) {
        let seconds = Math.floor(time % 60);
        return Math.floor(time / 60) + `:${seconds < 10 ? "0" : ""}` + seconds;
    }

    if (!active) {
        return null;
    }

    return (<div className={style.player}>
        <div className={style.action}>
            <IconButton className={style.next}>
                <ShuffleIcon />
            </IconButton>
            <IconButton aria-label="previous song" className={style.next} onClick={nextAudio}>
                <FastRewindRounded fontSize="large" />
            </IconButton>
            <IconButton onClick={playAudio} className={style.play}>
                {
                    !pause ? <Pause style={{ height: 35, width: 35 }} /> : <Play style={{ height: 35, width: 35 }} />
                }
            </IconButton>
            <IconButton aria-label="next song" className={style.back} onClick={backAudio}>
                <FastRewindRounded fontSize="large" />
            </IconButton>
            <IconButton onClick={repeatAudio} className={style.next}>
                {repeat ? <RepeatIcon className={style.repeat} /> : <RepeatIcon />}
            </IconButton>
        </div>
        <div className={style.infoTrack}>
            <span>{active?.artist}</span>
            <div className={style.track}>
                {active?.name}
            </div>
        </div>
        <input className={style.progress} min={0} max={duration} type={'range'} value={currentTime} onChange={(e) => changeCurrentTime(e)}></input>
        <div className={style.time}>{secondsToMinutes(currentTime)} / {secondsToMinutes(duration)} </div>
        <div className={style.volume}>
            <VolumeUp />
            <input type={'range'} min={0} max={100} value={volume} onChange={(e) => changeVolume(e)}></input>
            <div style={{ width: 45 }}>{volume}%</div>
        </div>
    </div >
    );
}

export default Player;