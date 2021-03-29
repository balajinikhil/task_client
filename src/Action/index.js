import {
    GET_BOARD,
    ADD_USER
} from './type';
import api from '../api';

// export const fetchStreams = () => async dispatch => {
//     const response = await  streams.get("/streams")
//     dispatch({type:FETCH_STREAMS, payload:response.data})
// }

export const addUser = (user) => async dispatch => {
    const response = await api.get('/signin', user);
    dispatch({type:ADD_USER, payload: user});
}