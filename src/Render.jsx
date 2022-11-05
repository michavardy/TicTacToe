import React from 'react'
import { useState, createContext, useReducer, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import "./Render.css";

const initialState = {
    board:[[null, null, null],[null, null, null],[null, null, null]],
    players:['x','o'],
    curPlayer:'x',
    turnNumber:0
};



export default function RenderGame() {
    const [state,dispatch] = useReducer(reducer, initialState);
    const idRef = useRef(0)
    useEffect(()=>{console.log(state)},[state]);
    
    return (
      <div className="screen">
        <div className="board">
            {state.board.map((row,row_index)=>(
                <div className="row">
                    {row.map((column, column_index)=>(
                        <button
                            className="cell"
                            type="text"
                            id={"row"+row_index+1 + "_column"+ column_index+1}
                            onClick={() => dispatch({type:"play",payload:{position:[row_index,column_index]}})}
                            >
                            {state.board[row_index][column_index]}
                        </button>
                    ))}
                </div>
            ))}
        </div>
        <div className="ctrls">
            <button className="ctrl_button" onClick={() => dispatch({type:"reset",payload:{}})}>reset</button>
            <button className="ctrl_button" onClick={() => dispatch({type:"skip",payload:{}})}>skip</button>
        </div>
      </div>
  )};

function updateBoard(player, pos, currBoard){
    let newBoard = currBoard.map(sub => [...sub])
    newBoard[pos[0]][pos[1]] = player
    return newBoard
}

function togglePlayer(curPlayer, playerList){
    let index = playerList.findIndex(p => {return p == curPlayer})
    if (index === playerList.length - 1) {
        return playerList[0]
    }
    else{
        return playerList[index + 1]
    }
}

function reducer (state,action){
    console.log(`reducer called: action: ${action.type}, payload: ${action.payload}`)
    switch(action.type){
        case "reset":
            return initialState;
        case "play":
            return {...state, 
                board:updateBoard(state.curPlayer, action.payload.position, state.board),
                curPlayer:togglePlayer(state.curPlayer, state.players),
                turnNumber:state.turnNumber + 1}
        case "skip":
            return {...state, curPlayer:togglePlayer(state.curPlayer, state.players)}
        default:
            console.log(`reducer function called with action: ${action.type}`)
    }
};
  
