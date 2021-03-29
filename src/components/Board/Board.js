import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Board extends React.Component{

    state = {
        data:[
            {id:"card-1", name:"cardname", teamImg:'/images/alphabet.png'},
            {id:"card-2", name:"cardname2", teamImg:'/images/alphabet.png'},
            {id:"card-3", name:"cardname3", teamImg:'/images/alphabet.png'}
        ],
        data1:[
            {id:'c1', name:"list-2",teamImg:'/images/alphabet.png'},
            {id:'c2', name:'list-3',teamImg:'/images/alphabet.png'},
            {id:'c3', name:'list-4',teamImg:'/images/alphabet.png'}
        ]
    }

    // list 2 drag end
    handleOnDragEnd2 = (result)=>{
        if (!result.destination) return;
        const items = Array.from(this.state.data1);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({data1:items});
    }

    // list 1 drag end
    handleOnDragEnd =(result)=>{
        // reorder the array
        if (!result.destination) return;
        const items = Array.from(this.state.data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({data:items});
    }

    // list 2 cards
    renderCard2= ()=>this.state.data1.map((e,i)=>( <Draggable key={i} draggableId={`${i}`} index={i} >
    {(provide)=>(
        <div ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}
        key={i} className="board__container--todo--cards__card">
            <p className="board__container--todo--cards__card--name">{e.name}</p>
            <div className="board__container--todo--cards__card--author">
                <img src={e.teamImg} alt="google-img" className="board__google-img" />
            </div>
        </div>
        )}   
    </Draggable>))

    //list 1 cards 
    renderCard = ()=>this.state.data.map((e,i)=>(
        <Draggable key={i} draggableId={`${i}`} index={i} >
        {(provide)=>(
            <div ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}
            key={i}
            className="board__container--todo--cards__card">
                <p className="board__container--todo--cards__card--name">{e.name}</p>
                <div className="board__container--todo--cards__card--author">
                    <img src={e.teamImg} alt="google-img" className="board__google-img" />
                </div>
            </div>
        )}   
    </Draggable>
    ))

    render(){
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
                        <img src="/images/alphabet.png" alt="google-img" className="board__google-img" />
                        <img src="/images/alphabet.png" alt="google-img" className="board__google-img" />
                    </span>

                </div>
                <div className="board__container">

                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="list" >
                            {(provided)=>(<div  ref={provided.innerRef} {...provided.draggableProps}
                                        className="board__container--todo"  >
                                        <h2>To Do</h2>
                                        {/* card list */}

                                        <div className="board__container--todo--cards">
                                            {this.renderCard()}
                                        </div>
                                        <div className="board__container--todo--new">
                                            <i className="fas fa-plus"></i>
                                            <p>Add Another Card</p>
                                        </div>
                                        {provided.placeholder}
                                    </div>)}
    
                        </Droppable>
                    </DragDropContext>
                    
                    <DragDropContext onDragEnd={this.handleOnDragEnd2}>
                        <Droppable droppableId="list" >
                            {(provided)=>(<div  ref={provided.innerRef} {...provided.draggableProps}
                                        className="board__container--todo"  >
                                        <h2>Doing</h2>
                                        {/* card list */}

                                        <div className="board__container--todo--cards">
                                            {this.renderCard2()}
                                        </div>
                                        <div className="board__container--todo--new">
                                            <i className="fas fa-plus"></i>
                                            <p>Add Another Card</p>
                                        </div>
                                        {provided.placeholder}
                                    </div>)}
    
                        </Droppable>
                    </DragDropContext>

                </div>
            </section>
        )
    }
}

export default Board;