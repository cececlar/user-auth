import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class Navbar extends React.Component {


   logout(event) {
       event.preventDefault()
       console.log('logging out')
       axios.post('/users/logout').then(response => {
         console.log(response.data)
         if (response.status === 200) {
           this.props.updateUser({
             loggedIn: false,
             email: null
           })
         }
       }).catch(error => {
           console.log('Logout error')
       })
     }


   render() {
       const loggedIn = this.props.loggedIn;
       console.log('navbar render, props: ')
       console.log(this.props);

       return (
           <div>


               <header className="navbar App-header" id="nav-container">
                   <div className="col-4" >
                       {loggedIn ? (
                           <section className="navbar-section">
                               <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                               <span className="text-secondary">logout</span></Link>


                           </section>
                       ) : (
                               <section className="navbar-section">
                                   <Link to="/" className="btn btn-link text-secondary">
                                       <span className="text-secondary">home</span>
                                       </Link>
                                   <Link to="/login" className="btn btn-link text-secondary">
                                   <span className="text-secondary">login</span>
				</Link>
                                   <Link to="/signup" className="btn btn-link">
                                   <span className="text-secondary">sign up</span>
				</Link>
                               </section>
                           )}
                   </div>
                   <div className="col-4 col-mr-auto">
                   <div id="top-filler"></div>
                       <h1 className="App-title">MERN Login</h1>
                   </div>
               </header>
           </div>


       );


   }
}


export default Navbar;
