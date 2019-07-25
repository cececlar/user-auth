import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })

  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.email);
    console.log(this.state.password);

    axios.post('/users/add', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(response => {
      console.log("This worked")
    })

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="text-center">
          GOODLE
        </div>
         <div className="form-group">
           <label for="exampleInputEmail1">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}></input>
         </div>
         <div className="form-group">
           <label for="exampleInputPassword1">Password</label>
           <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePasswordChange}></input>
         </div>
         <div className="form-group form-check">
           <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
           <label className="form-check-label" for="exampleCheck1">I agree to some extremely burdensome terms of service in which you may use my data for extremely invasive purposes of which I am completely unaware.</label>
         </div>
         <button type="submit" className="btn btn-primary center-block">Submit</button>
      </form>
    )
  }
}

export default SignUp;
