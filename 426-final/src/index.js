import axios from 'axios';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import "./styles.css";

const moves = ["rock", "paper", "scissors"];
class App extends Component {
  state = {
    player: moves[0],
    bot: moves[0],
    winner: "",
    compl: "",
    activity: ""
  };

  startGame = () => {
    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;
      this.setState({
        bot: moves[Math.floor(Math.random() * moves.length)],
        winner: ""
      });
      if (counter > 5) {
        clearInterval(gameInterval);
        this.setState({
          winner: this.selectWinner()
        });
      }
    }, 100);
  };

  selectWinner = () => {
    let { player, bot } = this.state;
    let skill = document.getElementById("skill")
    if (player === "super rock") {
        skill.value -= 3;
        return "You Win!";
    } else if (player === "ultra scissors") {
        skill.value -= 3;
        return "You Win!";
    } else if (player === "angry paper") {
        skill.value -= 3;
        return "You Win!";
    } else if (player === "rock" && bot === "scissors") {
        skill.value += .5;
        return "You Win!";
    } else if (player === "scissors" && bot === "paper") {
        skill.value += .5;
        return "You Win!";
    } else if (player === "paper" && bot === "rock") {
        skill.value += .5;
        return "You Win!";
    } else if (player === bot) {
        return "Tie!";
    } else {
        return "You Lose!";
    }
  };
  selectMove = move => {
    let skill = document.getElementById("skill")
    if (skill.value === 3) {
        if (move === "rock") {
            move = "super rock"
        }
        if (move === "paper") {
            move = "angry paper"
        }
        if (move === "scissors") {
            move = "ultra scissors"
        }
    }
    this.setState({
      player: move,
      winner: ""
    });
  };
  getCompliment = () => {
    let haha = ""
    axios.get(`https://complimentr.com/api`).then(
        (response => {
            haha = response.data.compliment
            this.setState({compl: haha})
        })
    );
  }
  getActivity = () => {
    let bore = ""
    axios.get(`https://www.boredapi.com/api/activity`).then(
        (response => {
            bore = response.data.activity
            this.setState({activity: bore})
        })
    );
  }
  render() {
    const { player, bot, winner } = this.state;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Rock Paper Scissors Ultimate</h1>
        <h4 style={{ textAlign: "center" }}>Please Select Move Before Each Turn</h4>
        <div className="wrapper">
            <div className="image">
                <Player move={player} />
                <Player move={bot} />
            </div>
            Power-Up
            <progress id="skill" value="0" max="3"></progress>
            <div className="buttons">
                <button className="weaponBtn" onClick={() => this.selectMove("rock")}>
                    rock
                </button>
                <button className="weaponBtn" onClick={() => this.selectMove("paper")}>
                    paper
                </button>
                <button className="weaponBtn" onClick={() => this.selectMove("scissors")}>
                    scissors
                </button>
            </div>
        </div>
        
        <div className="winner">{winner ? this.selectWinner() : null}</div>
        <button type="button" onClick={this.startGame}>
          Fight!
        </button>
        <div style={{ textAlign: "center" }} className="api">
            <button type="button" onClick={this.getCompliment}>
                Compliment
            </button>
            {this.state.compl}
            <button type="button" onClick={this.getActivity}>
                Do Something Else
            </button>
            {this.state.activity}
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);