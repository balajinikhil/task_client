import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  box-shadow: 0 .1rem .3rem rgba(0,0,0,.2);
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="board__container--todo--cards__card">
            <p 
            className="board__container--todo--cards__card--name">
                {this.props.task.content}            
            </p>
            <div className="board__container--todo--cards__card--author">
              <span className="board__container--todo--cards__card--trash" 
              onClick={()=>this.props.deleteCard(this.props.task.id)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/>
                </svg>
              </span>
              <img src={localStorage.getItem('imageUrl')} alt="google-img"
                className="board__google-img" />
            </div>
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}
