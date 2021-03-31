import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './NavBar/NavBar';
// import Board from './Board/Board';
import Board from './Board_v1/board';
import BoardList from './BoardList/boardList';
import URL from '../api';
// import ProtectedRoute from './ProtecetedRoutes';

class App extends React.Component{

    state = { user:[], isLoggedIn:false }

    userSignIn = async (val) => {
        let user = val.profileObj;
        try{
            const response = await axios.post(`${URL}/singin`, {
                email:user.email,
                name:user.name,
                googleId:user.googleId,
                imageUrl:user.imageUrl
            } );
                this.setState({isLoggedIn:true});
                localStorage.setItem('userid', response.data.user.googleId);
                toast.success('Logged in successfully');
                      
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return(<HashRouter>
            <NavBar userSignIn = {this.userSignIn} />
            <Route path="/board/:id" exact render={(props)=><Board isLoggedIn={this.state.isLoggedIn} {...props} />} ></Route>
            <Route path="/board" component={BoardList} ></Route>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </HashRouter>)
    }
}




export default App;