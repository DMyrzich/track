import { ITrack } from '../../Api/response';
import TrackItem from '../TrackItem/TrackItem';
import { useState } from 'react';
import { Api } from '../../Api';

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {

    const [allTrack, setAllTrack] = useState(tracks);

    const deleteTrack = (id: string) => {
        Api().music.delete(id);
        setAllTrack(state => state.filter(el => el._id != id))
    }

    return (<>
        {
            allTrack && allTrack.map((track) => <TrackItem key={track._id} deleteTrack={deleteTrack} track={track} />)
        }
    </>);
}

export default TrackList;