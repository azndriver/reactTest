import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const Card = (props) => {
  return(
    <div>
      <img src={props.avatar_url}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWight: "bold"}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}



const CardList = (props) =>{
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}

class Form extends React.Component{
  state={userName: ""}
  handleSubmit = (event) =>{
    event.preventDefault();
    axios.get("https://api.github.com/users/"+this.state.userName ).then(
      resp =>{
        this.props.onSubmit(resp.data);
        this.setState({userName: ''});
      }
    );
  };
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        { 
        <input value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})} type="text" placeholder="Github username"/>
        /* <input ref={(input) => this.userNameInput = input} type="text" placeholder="Github username"/> */}
        <button type="submit" >add Card</button>
      </form>
    );
  }
}
class App extends React.Component{
  state ={ 
    cards:[]
  };
  addNewCard = (cardInfo) =>{
    this.setState(prevState =>({
      cards: prevState.cards.concat(cardInfo)
    }));
  }
  render(){
    return(
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
