import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionsCreator from '../store/action' 

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionsCreator, dispatch);
}

