import React from 'react';
import logo from './logo.svg';

function Square(props) {
  const regStyle = {
      backgroundColor: "#F5B7B1"
    };
  const winStyle = {
      backgroundColor: "#58D68D"
  };
  return (
      <div className="square">
        {props.value}
      </div>
  );

  
}

class Board extends React.Component {
  renderSquare(i) {
    return(<Square
            value = {this.props.positions[i]}
            />);
  }
  render() {
    let loopRows= [];
    for (var i = 0; i<16; i+=4) {
      let row = []
      for (var j = 0; j<4; j++){
        row.push(this.renderSquare(i+j));
      }
      row = <div className="board-row">{row}</div>;
      loopRows.push(row);
    }
    return (
      <div>
        {loopRows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          positions: new Array(16).fill(100),
      };
  }

  addTile() {
    console.log('healthy')
    let emptyPositions = [];
    for (var i = 1; i<this.state.positions.length; i++) {
      if (i==null) {
        emptyPositions.push(i);
      }
    };
    let tilePosition = emptyPositions[Math.floor(Math.random()*emptyPositions.length)];
    let tileNumber = Math.floor(Math.random()*10+1);
    if (tileNumber < 9) {
      tileNumber = 2;
    } else {
      tileNumber = 4;
    }
    this.setState(prevState => ({
      positions: [prevState.positions.slice(0,tilePosition), tileNumber, prevState.positions.slice(tilePosition+1, 16)],
    }));
  }

  handleMove(arrow) {
    let newLines = new Array(16).fill(null)
    if (arrow.charCode === 37) {
      //left (u->d, l->r)  
      for (var r = 0; r<16; r+=4) {
        let myLine = [];
        let Positions = [];
        for (var c=r; c<r+4; c++){
          myLine.push(this.state.positions[c]);
          Positions.push(c);
        }
        myLine = this.handleLine(myLine)
        for (var i=0;i<4;i++){
          newLines[Positions[i]] = myLine[i]
        }
      }
    }
    else if (arrow.charCode === 39) {
      //right (u->d, r->l)
      for (r=0; r<16; r+=4) {
        let myLine = [];
        let Positions = [];
        for (c=r+3; c>r-1; r-=1) {
          myLine.push(this.state.positions[c]);
          Positions.push(c);
        }
        myLine = this.handleLine(myLine)
        for (i=0;i<4;i++){
          newLines[Positions[i]] = myLine[i]
        }
      }
    }
    else if (arrow.charCode === 38) {
      //up (l->r,u->d)
      for (c=0; c<4; c++){
        let myLine = [];
        let Positions = [];
        for (r=c; r<16; r+=4){
          myLine.push(this.state.positions[r])
          Positions.push(r);
        }
        myLine = this.handleLine(myLine)
        for (i=0;i<4;i++){
          newLines[Positions[i]] = myLine[i]
        }
      }
    }
    else if (arrow.charcode === 40) {
      //down (r->l,d->u)
      for (c=0; c>4; c++){
        let myLine = [];
        let Positions = [];
        for (r=15-c; r>-1; r-=4){
          myLine.push((this.state.positions[r]));
          Positions.push(r);
        }
        myLine = this.handleLine(myLine);
        for (i=0;i<4;i++){
          newLines[Positions[i]] = myLine[i]
        }
      }
    }
    this.setState({
      positions: newLines,
    })
    this.addTile();
  }

  handleLine(line) {
    for (var i=0;i<4;i++) {
      if (line[i]==null && i<3) {
        line[i] = line[i+1];
        line[i+1] = null;
      }
      else if (i<3 && line[i] === line[i+1]) {
        line[i] += line[i+1];
        line[i+1] = null;
      }
    }
    return line;
  }

  render() {
    return (
      <div className="game">
          <div className="game-board">
              <Board
                  positions = {this.state.positions}
                  onKeyDown={this.handleMove}
              />
          </div>
      </div>
    );
  }
}
export default Game;
