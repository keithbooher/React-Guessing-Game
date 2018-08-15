import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';
import CharacterCard from './components/CharacterCard';
import characters from "./characters.json";

console.log(characters)


class App extends Component {
    state = {
      characters,
      topScore: 0,
      score: 0
    };

    shuffle = a => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    reset = (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].clicked = false          
      }
    }

    win = (data) => {
      if (this.state.topScore === 11) {
        alert("YOU WIN!")

        this.reset(data)

        this.setState({characters: data, score: 0});        
      } else {
        return
      }
    }


    //function that changes a characters "clicked" value to true 
    clicked = id => {
      let data = this.state.characters;
      data = this.shuffle(data);
      let change = this.state.characters[id].clicked
      let char = {};
      this.state.characters.forEach((element,index) => {
        if(element.id===id){      
          //creating a new key with the specific character object as its value 
          char.a = element
          //creating a new key, index, that is equal to the the next index it is moved to after shuffle
          char.index = index
        }
      });
      //if character clicked is false then.......
      if(!char.a.clicked){
        char.a.clicked = true;
        //state object is ser equal to changed data
        data[char.index] = char.a;
        let newScore = this.state.score + 1;
        let newTopScore = this.state.topScore

        if (this.state.score >= this.state.topScore) {
          newTopScore = this.state.topScore + 1
        }
        
        this.setState({characters: data, score: newScore, topScore: newTopScore});
        //otherwise if clicked is already true then, we inform and reset
      } else if (char.a.clicked) {
        alert('Incorrect Guess')

        this.reset(data)
        this.setState({characters: data, score: 0})
        console.log(this.state.shake)
        
      }

      this.win(data);
      
    };
  

  render() {
    return (
      <div className="container">
        <Navbar 
          score={this.state.score}
          topScore={this.state.topScore}          
        />
        <Header />
        <Main >
        {this.state.characters.map(character => (
          <CharacterCard
            clicked={this.clicked}
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
          />
        ))}
        </Main>  
      </div>
    );
  }
}

export default App;
