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
      score: 0,
      shake: '',
      guessed: ''
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

    addShake = () => {
      setTimeout( () =>  this.setState({shake: "shake"}), 10 )
      this.removeShake()
    }

    removeShake = () => {
      this.setState({shake: " "})
    }


    //function that changes a characters "clicked" value to true 
    clicked = id => {
      let data = this.state.characters;
      data = this.shuffle(data);
      let char = {};


      this.state.characters.forEach((element,index) => {
        //element.id represents characters.
        //if element.id equals id of the object clicked. Then in our char object, we record that object in the 'specific' key and record its index
        if(element.id===id){      
          //creating a new key with the specific character object as its value 
          char.specific = element
          //creating a new key, index, that is equal to the the next index it is moved to after shuffle
          char.index = index
        }
      });
      console.log(char.specific)

      //if character clicked is false then.......
      if(!char.specific.clicked){
        char.specific.clicked = true;
        // state object is set equal to changed data
        // we use "[char.index]" because when we console log "data[char.index]", data is an array and we need to target which one it is, this makes it easier than trying to target the id of a moving obejct
        data[char.index] = char.specific;
        //incrementing scores
        let newScore = this.state.score + 1;
        let newTopScore = this.state.topScore;

        if (this.state.score >= this.state.topScore) {
          newTopScore = this.state.topScore + 1
        }
        
        this.setState({characters: data, score: newScore, topScore: newTopScore, guessed: "You guessed Correctly!", color: "red"});
        //otherwise if clicked is already true then, we inform and reset
      } else if (char.specific.clicked) {
        this.addShake()

        // alert('Incorrect Guess')
        this.reset(data)
        this.setState({characters: data, score: 0, guessed: "Incorrect Guess!"})
        
      }

      this.win(data);
      
    };
  

  render() {
    return (
      <div className="container">
        <Navbar 
          score={this.state.score}
          topScore={this.state.topScore}    
          guessed={this.state.guessed}      
        />
        <Header />
        <Main shake={this.state.shake} >
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
