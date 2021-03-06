import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class LoginForm extends React.Component {
   constructor() {
       super()
       this.state = {
           email: '',
           password: '',
           redirectTo: null
       }
        }


   handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value
       })
   }


   handleSubmit(event) {
       event.preventDefault()
       console.log('handleSubmit')


       axios
           .post('/users/login', {
               email: this.state.email,
               password: this.state.password
           })
           .then(response => {
               console.log('login response: ')
               console.log(response)
               if (response.status === 200) {
                   // update App.js state
                   this.props.updateUser({
                       loggedIn: true,
                       email: response.data.email
                   })
                   // update the state to redirect to home
                   this.setState({
                       redirectTo: '/'
                   })
               }
           }).catch(error => {
               console.log('login error: ')
               console.log(error);

           })
   }


   render() {
       if (this.state.redirectTo) {
           return <Redirect to={{ pathname: this.state.redirectTo }} />
       } else {
           return (
               <div>
                   <h4>Login</h4>
                   <form className="form-horizontal">
                       <div className="form-group">
                           <div className="col-1 col-ml-auto">
                               <label className="form-label" htmlFor="username">Username</label>
                           </div>
                           <div className="col-3 col-mr-auto">
                               <input className="form-input"
                                   type="text"
                                   id="email"
                                   name="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                               />
                           </div>
                       </div>
                       <div className="form-group">
                           <div className="col-1 col-ml-auto">
                               <label className="form-label" htmlFor="password">Password: </label>
                           </div>
                           <div className="col-3 col-mr-auto">
                               <input className="form-input"
                                   placeholder="password"
                                   type="password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                               />
                           </div>
                       </div>
                       <div className="form-group ">
                           <div className="col-7"></div>
                           <button
                               className="btn btn-primary col-1 col-mr-auto"

                               onClick={this.handleSubmit}
                               type="submit">Login</button>
                       </div>
                   </form>
               </div>
           )
       }
   }
}


export default LoginForm
