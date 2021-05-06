import React from "react";
import scissors from "./scissors.png";
import paper from "./paper.png";
import rock from "./rock.jpg";
import ultrascissors from "./powerscissors.png"
import superrock from "./superrock.png"
import angrypaper from "./angrypaper.png"


const Player = ({ move }) => (
    <>
        <div className="player">
        <img
            className="player-image"
            src={
            move === "rock" ? rock : move === "scissors" ? scissors : move === "paper" ? paper : move === "super rock" ? superrock : move === "ultra scissors" ? ultrascissors : angrypaper
            }
            alt="Rock Paper Scissors"
        />
        </div>
    </>
);



export default Player;
