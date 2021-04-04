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
    let response = await axios.get(`${URL}/board-new/${this.props.match.params.id}`, {
      headers:{
        Authorization:localStorage.getItem('userid')
    }
    });
    let board = response.data.board;
    let obj = {...board.board};
    this.setState(obj);
  }

  onDragEnd = result => {
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

      this.setState(newState);
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
    this.setState(newState);
  };

  isAuthenticated = async() => {
    let userId = window.localStorage.getItem('userid');

    if(userId){
        return true;
    }else{
        toast.error('Unauthorized, Login again');
        history.push('/');
        return false;
    }
}

  renderBoard = () =>{
    return(
      <section className="section-board">
            <video className="video_background" playsInline autoPlay muted loop id="bgvid">
                        <source src="/videos/bc.mp4" type="video/mp4" />
            </video>
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

                        return <Column key={column.id} column={column} tasks={tasks} />;
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