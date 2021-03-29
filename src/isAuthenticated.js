// import URL from './api'
// import axios from 'axios';

const isAuthenticated = async() => {
    let userId = window.localStorage.getItem('userid');

    if(userId){
        return true;
    }else{
        return false;
    }
}

export default isAuthenticated;