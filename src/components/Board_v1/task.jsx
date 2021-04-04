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
