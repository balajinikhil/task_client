import React from 'react';
import isAuthenticated from '../../isAuthenticated';
import { Link } from 'react-router-dom';
import history from '../../history';
import URL from '../../api';
import axios from 'axios';


class BoardList extends React.Component{

    state = {length:0, board:[]}

    componentDidMount = async()=>{
        let googleId = localStorage.getItem('userid');
        let {data} = await axios.get(`${URL}/boards/list?googleId=${googleId}`);
        console.log(data);
        this.setState({length:data.length});
        this.setState({board:data.boards})
    }

    renderEmpty = () => {
        return(
            <div className="board__list--container--card">
                <h2>No Boards Found</h2>
                <button>Add New</button>
            </div>
        )
    }

    renderList = ()=>{
        return(
            <div className="board__list--container--cards">
                {this.state.board.map((e,i)=>{
                    console.log(e);
                    return(
                        <Link to={`/board/${e._id}`} className="card" key={i}>
                            <h3>{e.name}</h3>
                        </Link>
                    )
                })}
            </div>
        )
    }

    renderBoardList = () =>{
        return(
            <section className="board__list">
               <div className="board__list--sidebar">
                   
               </div>
               <div className="board__list--container" >
                  {this.state.length === 0 ? this.renderEmpty() :  this.renderList() }
               </div>
           </section>
        )
    }

    render(){
        console.log(isAuthenticated());

        return isAuthenticated() ? 
            <>{this.renderBoardList()}</> :
            <>{history.push('/')}</>
    }
};

export default BoardList;