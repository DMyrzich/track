import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'


const NotFound: NextPage = () => {

  return (<MainLayout>
    <h1 style={{ margin: 0 }}>Страница не найдена</h1>
    <img src="https://pic.52112.com/180905/EPS-180905_293/1gimWBZJQd_small.jpg"></img>
    <h3>Здесь собраны самые лучшие треки мира!</h3>
  </MainLayout >)
}

export default NotFound
