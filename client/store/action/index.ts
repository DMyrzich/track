import * as PlayerActionCreator from './player';
import { getComment, fetchInfoTrack } from './tracks';

export default {
    ...PlayerActionCreator, getComment, fetchInfoTrack
}