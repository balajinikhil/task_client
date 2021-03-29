import React from 'react';
import {Link} from 'react-router-dom';
import GoogleLogin from 'react-google-login';


class NavBar extends React.Component{

    state = { searchClassName:"navbar__search", searchPlaceHolder:'Jump to...' }
    
    onSearchFocous = () =>{
        document.getElementsByClassName('fa-times')[0].style = "display:inline-block"
        document.getElementsByClassName('fa-search')[0].style = "display:none"
        this.setState({searchClassName:"navbar__search navbar__search--click", searchPlaceHolder:"Search..."});
    }

    onSearchBlur=()=>{
        document.getElementsByClassName('fa-times')[0].style = "display:none"
        document.getElementsByClassName('fa-search')[0].style = "display:inline-block"
        this.setState({searchClassName:"navbar__search", searchPlaceHolder:'Jump to...'})
    }

    responseGoogle = (val)=>{
        this.props.userSignIn(val);
    }
    
    render(){
        return(
            <nav className="section-navbar">

                <Link to="/" className="navbar__menu">
                    <i className="fas fa-bars"></i>
                </Link>
                
                <Link to="/" className="navbar__home">
                    <i className="fas fa-home"></i>
                </Link>

                <Link to="/board" className="navbar__board">
                    <i className="fab fa-flipboard"></i>
                    Boards
                </Link>

                <span className={this.state.searchClassName} onFocus={this.onSearchFocous} onBlur={this.onSearchBlur}>
                    <input type="text" placeholder={this.state.searchPlaceHolder}  />
                    <i className="fas fa-search"></i>
                    <i className="fas fa-times"></i>
                </span>

                <span className="navbar__notification">
                    <i className="fas fa-bell"></i>
                </span>
                {/* <Link to="/api-v1/google" className="navbar__google">
                    <i className="fab fa-google"></i>
                </Link> */}

                <GoogleLogin className="navbar__google"
                    clientId="973663447827-q5f6bi2nhggpa2dagufgts8v4in1eb6i.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
                
            </nav>
        )
    }
}

export default NavBar;