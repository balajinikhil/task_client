import React from 'react';
import { Link } from 'react-router-dom';
import {toast } from 'react-toastify';

import history from '../../history';
import URL from '../../api';
import axios from 'axios';


class BoardList extends React.Component{

    state = {length:0, board:[], boardname:'', popup:'none'}

    componentDidMount = async()=>{
       this.getBoardList();
    }

    getBoardList = async() => {
        if(this.isAuthenticated){
            let googleId = localStorage.getItem('userid');
            let {data} = await axios.get(`${URL}/boards/list?googleId=${googleId}`);
            this.setState({length:data.length});
            this.setState({board:data.boards});
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    boardFormSubmit = async(e) => {
        e.preventDefault();
        if(this.state.boardname.length > 3){
            let response = await axios.post(`${URL}/board-new`, {
                boardname:this.state.boardname
            }, {
                headers:{
                    Authorization:localStorage.getItem('userid')
                }
            });

            console.log(response.data);

            if(response.data.message === 'Unauthorized'){
                toast.error('Unauthorized, Login Again');
                history.push('/');
            }else if(response.data.message === 'success'){
                toast.success('Board created');
                this.setState({popup:'none'})
                this.getBoardList();
            }else{  
                toast.error('Connection error, Try Again later')
            }

        }else{
            toast.error('Board Name must be more than 3 characters')
        }
    }


    renderPopUp = () => {
        return(
            <div className="popup" style={{display:this.state.popup}}>
                <form className="popup__form" autoComplete="off"
                    onSubmit={e => this.boardFormSubmit(e)} >
                    <i className="far fa-times-circle" 
                    onClick={()=>this.setState({popup:'none'})}
                    style={{color:'white'}}></i>
                    <input type="text" name="name" 
                     onChange={e=>this.setState({boardname:e.target.value})}
                    placeholder="Board Name" value={this.state.boardname} />
                    <button type="submit" >Create</button>
                </form>
            </div>
        )
    }

    renderEmpty = () => {
        return(
            <div className="board__list--container--card">
                <div className="board__list--container--card__notfound">
                    <h2>No Boards Found</h2>
                    <button onClick={()=>this.setState({popup:"block"})}>Add New</button>
                </div>
            </div>
        )
    }

    renderList = ()=>{
        return(
            <div className="board__list--container--cards">
                {this.state.board.map((e,i)=>{
                    return(
                        <Link to={`/board/${e._id}`} className="card" key={i}>
                            <h3>{e.boardname}</h3>
                        </Link>
                    )
                })}
                <div className="card__new" onClick={()=>this.setState({popup:'block'})}>
                    <h3>Create New</h3>
                </div>
            </div>
        )
    }

    renderBoardList = () =>{
        return(
            <section className="board__list">
                {this.renderPopUp()}
               <div className="board__list--sidebar">
                   
               </div>
               <div className="board__list--container" >
                  {this.state.length === 0 ? this.renderEmpty() :  this.renderList() }
               </div>
           </section>
        )
    }

    isAuthenticated = () => {
        let userId = localStorage.getItem('userid');
        if(!userId) toast.error('Login to view boards');
        return userId ? true : false;
   }

    render(){
        return this.isAuthenticated() ? 
            <>{this.renderBoardList()}</> :
            <>{history.push('/')}</>
    }
};

export default BoardList;