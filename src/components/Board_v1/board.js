import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import {toast} from 'react-toastify'

import initialData from './intialData';
import Column from './column';
import history from '../../history';
import axios from 'axios';
import URL from '../../api';


const Container = styled.div`
  display: flex;
`;

class Board extends React.Component {

state = initialData;

componentDidMount = async() => {
    if(this.isAuthenticated){
      let response = await axios.get(`${URL}/board-new/${this.props.match.params.id}`, {
        headers:{
          Authorization:localStorage.getItem('userid')
      }
      });
      let board = response.data.board;
      let obj = board ? {...board.board} : {};
      this.setState(obj);
    }else{
      return
    }
}

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
}

  updateBoard = async() => {
    const response = await axios.post(`${URL}/update-board/${this.props.match.params.id}`, this.state, {
      headers:{
        Authorization:localStorage.getItem('userid')
      }
    });
    if(response.data.message === 'updated') return
    else toast.error('Network Error, Try again after few seconds')
  }

  onDragEnd = async(result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      await this.setState(newState);
      this.updateBoard();
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    await this.setState(newState);
    this.updateBoard();
  };

  isAuthenticated = async() => {
    let userId = localStorage.getItem('userid');

    if(userId){
        return true;
    }else{
        toast.error('Unauthorized, Login again');
        history.push('/');
        return false;
    }
  }

  newCardPopUp = (id) => {
      return(
        <div className="popup__card" style={{display:this.state.popup}}>
            <form autoComplete="off"
            onSubmit={async(e)=>{
              e.preventDefault();
              if(this.state.newname.length < 2){
                toast.error('Card name must be longer than 2 characters');
              }else{
                await this.setState({addCard:true})
                this.addNewCard(false);
              }
            }}
            >
            <i className="far fa-times-circle" 
            onClick={()=>this.setState({popup:'none'})}
            style={{color:'white'}}></i>
              <input type="text" name="name"
              value={this.state.newname}
              onChange={e=>this.setState({newname:e.target.value})}
              placeholder="Card Name"  />
              <button type="submit" > Create Card </button>
            </form>
        </div>
      )
  }

  addNewCard = async(id) =>{
    if(id){
      await this.setState({previd:id});
    }
    await this.setState({popup:'block'});
    console.log(this.state);
    if(this.state.addCard){
      let colid = this.state.previd;
      let lastTaskArr = Object.keys(this.state.tasks);
      let lastTaskNum = lastTaskArr[lastTaskArr.length - 1].split('-')[1] || '1';
      let updateObj = this.state.tasks;
      updateObj[`task-${lastTaskNum * 1 + 1}`] = { id: `task-${lastTaskNum * 1 + 1}`, 
      content:`${this.state.newname}`, teamImg:'/images/alphabet.png' }
      await this.setState({tasks : updateObj });
      let columnObj = this.state.columns;
      console.log(columnObj[colid].taskIds.push(`task-${lastTaskNum * 1 + 1}`));
      await this.setState({columns: columnObj});
      await this.setState({addCard:false});
      await this.setState({newname:""});
      await this.setState({popup:'none'});
      this.updateBoard();
    }
  }

  renderBoard = () =>{
    return(
      <section className="section-board">
            <video className="video_background" playsInline autoPlay muted loop id="bgvid">
                        <source src="/videos/bc.mp4" type="video/mp4" />
            </video>
            {this.newCardPopUp()}
            <div className="board__head">
                    <span className="board__head--name">
                        <h1>Board Name</h1>
                    </span>

                    <span className="board__head--team">
                        <img src={localStorage.getItem('imageUrl')}
                         alt="google-img" className="board__google-img" />
                    </span>

            </div>
            <div className="board__container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                    {this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(
                        taskId => this.state.tasks[taskId],
                        );

                        return <Column key={column.id} column={column} tasks={tasks}
                         addNewCard={this.addNewCard}
                        
                         />;
                    })}
                    </Container>
                </DragDropContext>
            </div>
        </section>
    )
  }

  render() {
    return this.isAuthenticated() ? <> {this.renderBoard()} </>: <> {history.push('/')} </>;
  }
}

export default Board;