import React from 'react';



class HomePage extends React.Component{

    render(){
        return(
            <>
            <header className="main__header">
                <div>
                    <h1 className="header__heading">The board is just the beginning</h1>
                    <p>
                        Lists and cards are the building blocks of organizing work on a Todo board. <br/>  
                        Grow from there with task assignments, timelines, <br/>
                        productivity metrics, calendars, and more.
                    </p>
                </div>
                <img src="/images/card.svg" alt="cards" />
            </header>
            </>
        )
    }
};

export default HomePage; 