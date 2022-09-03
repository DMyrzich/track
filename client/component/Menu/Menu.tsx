import * as React from 'react';
import { Typography, Button } from '@mui/material'
import style from './Menu.module.scss';
import { useRouter } from 'next/router';

export default function AppMenu() {

    const router = useRouter();
    const menu = [{ text: 'Главная', href: '' }, { text: 'Музыка', href: 'track' }, { text: 'Альбомы', href: 'album' }, { text: 'Автор', href: 'me' }]

    return (
        <div>
            {
                menu.map((m, idx) => <Button key={idx} style={{ color: 'white' }} onClick={() => router.push('/' + m.href)} className={style.btn}>{m.text}</Button>)
            }
        </div>
    );
}
