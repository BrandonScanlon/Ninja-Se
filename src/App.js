import React from 'react';
import { level1 } from './model/Levels.js'
import { level2 } from './model/Levels.js'
import { level3 } from './model/Levels.js'
import { Model } from './model/Model';
import { redrawCanvas } from './boundary/Boundary';
import styled from 'styled-components';
import { specs } from './specs.js';


/**
 * INSTRUCTIONS:
 * 
 * Install the following to run:
 * 
 *  - npm install react-router-dom
 *  - npm add styled-components
 *    or search for styled-components
 *    in VS Code plugins. 
 */

/** Button Styling */
const UpButton = styled.button`
  background-color: #5B25C1;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  outline: 1;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    opacity: 0.5;
  }
  &:disabled {
    cursor: default;
    opacity: 0.1;
  }
`;
// Reuse characteristics and override whats needed to differ
const LeftButton = styled(UpButton)`
   padding: 5px 7px;
`;
const RightButton = styled(UpButton)`
   padding: 5px 7px;
`;
const DownButton = styled(UpButton)`
`;

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0);
  const canvasRef = React.useRef(null);
  const appRef = React.useRef(null);

  React.useEffect (() => {

      redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model, redraw])

  return (
    <main style={specs.Appmain} ref={appRef}>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width = {specs.canvas.width}
        height = {specs.canvas.height} />

      <label style={specs.text}>{"Number of Moves: " + model.numMoves}</label>
      
      <div style={specs.upButton}>
      <UpButton>    ↑ </UpButton>
      </div>
      <div style={specs.leftButton}>
      <LeftButton>  ← </LeftButton>
      </div>
      <div style={specs.downButton}>
      <DownButton>  ↓ </DownButton>
      </div>
      <div style={specs.rightButton}>
      <RightButton> → </RightButton>
      </div>
     
      <img id="Ninja-Se" src='./Ninja-Se.jpg' />
    </main>
  );
}

export default App;
