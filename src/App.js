import React from 'react';
import { level1 } from './model/Levels.js'
import { level2 } from './model/Levels.js'
import { level3 } from './model/Levels.js'
import { Model } from './model/Model';
import { redrawCanvas } from './boundary/Boundary';
import styled from 'styled-components';
import { specs } from './specs.js';
import { moveNinja, resetLevel, pickupKey, unlockDoor } from './controller/Controller.js';


/**
 * INSTRUCTIONS:
 * 
 * Install the following to run:
 * 
 *  - npm add styled-components
 *    or search for styled-components
 *    in the VS Code plugins. 
 * 
 *  - npm install react-confetti
 * 
 *  - npm start (of course)
 */

/** Button Styling */
const UpButton = styled.button`
  background-color: purple;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  outline: 1;
  cursor: pointer;
  box-shadow: 0px 2px 4px black;
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
const L1Button = styled(UpButton)`
`;
const L2Button = styled(UpButton)`
`;
const L3Button = styled(UpButton)`
`;
const KeyButton = styled(UpButton)`
`;
const DoorButton = styled(UpButton)`
`;

function App() {
  const [model, setModel] = React.useState(new Model(level1))
  const [redraw, forceRedraw] = React.useState(0);
  const canvasRef = React.useRef(null);
  const appRef = React.useRef(null);

  React.useEffect (() => {

      redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model, redraw])

  const moveNinjaHandler = (direction) => {
    let newModel = moveNinja(model, direction);
    model.numMoves +=1;
    setModel(newModel);   // react to changes, if model has changed.
  }

  function LevelHandler (level) {
    let newModel = resetLevel(level)
    setModel(newModel)
  }

  function KeyHandler (model) {
    let newModel = pickupKey(model);
    setModel(newModel)
  }

  function DoorHandler (model) {
    let newModel = unlockDoor(model);
    setModel(newModel)
  }

  function TextLevel(){
    if(model.level === level1){
      return "Level 1"
    }
    if(model.level === level2){
      return "Level 2"
    }
    if(model.level === level3){
      return "Level 3"
    }
  }

  return (
    <main style={specs.Appmain} ref={appRef}>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width = {specs.canvas.width}
        height = {specs.canvas.height} />

      <label style={specs.title}>{TextLevel()}</label>
      <label style={specs.text}>{"Number of Moves: " + model.numMoves}</label>
      <label style={specs.reset}>{"Press level again to reset"}</label>
      
      <div style={specs.upButton}>
      <UpButton onClick={(e) => moveNinjaHandler("Up")} disabled={!model.available("Up")}>↑</UpButton>
      </div>
      <div style={specs.leftButton}>
      <LeftButton onClick={(e) => moveNinjaHandler("Left")} disabled={!model.available("Left")}>←</LeftButton>
      </div>
      <div style={specs.downButton}>
      <DownButton onClick={(e) => moveNinjaHandler("Down")} disabled={!model.available("Down")}>↓</DownButton>
      </div>
      <div style={specs.rightButton}>
      <RightButton onClick={(e) => moveNinjaHandler("Right")} disabled={!model.available("Right")}>→</RightButton>
      </div>
      <div style={specs.l1Button}>
      <L1Button onClick={(e) => LevelHandler(level1)}>Level 1</L1Button>
      </div>
      <div style={specs.l2Button}>
      <L2Button onClick={(e) => LevelHandler(level2)}>Level 2</L2Button>
      </div>
      <div style={specs.l3Button}>
      <L3Button onClick={(e) => LevelHandler(level3)}>Level 3</L3Button>
      </div>
      <div style={specs.keyButton}>
      <KeyButton onClick={(e) => KeyHandler(model)} disabled={!model.availableKey()}>Pickup Key</KeyButton>
      </div>
      <div style={specs.doorButton}>
      <DoorButton onClick={(e) => DoorHandler(model)} disabled={!model.availableDoor()}>Unlock Door</DoorButton>
      </div>
    </main>
  );
}

export default App;
