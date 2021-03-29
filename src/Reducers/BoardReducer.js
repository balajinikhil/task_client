import { GET_BOARD  } from '../Action/type';

import _ from 'lodash';

const BoardReducer = (state = {}, action) => {
    switch(action.type){
        case GET_BOARD:
            return {...state, ..._.mapKeys(action.payload, 'id') }     
        default :
            return state
    }
}

export default streamsReducer