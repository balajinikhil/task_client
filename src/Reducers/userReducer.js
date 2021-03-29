import {
    ADD_USER
} from '../Action/type';

const UserReducer = (state = {}, action) =>{
    switch(action.type){
        case ADD_USER:
            return {...state}
    }
}