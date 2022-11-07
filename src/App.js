import React from 'react';
import { level1 } from './model/Levels.js'
import { Model } from './model/Model';
import { redrawCanvas } from './boundary/Boundary';
import styled from 'styled-components';


const UpButton = styled.button`
  background-color: #3949ab;
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
// Reuse characteristics and override whats needed to differs
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

  React.useEffect (() => {

      redrawCanvas(model, canvasRef.current)
  }, [model, redraw])

  return (
    <main>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width = "800"
        height = "800" />

      <div>
      <UpButton>    ↑ </UpButton>
      <LeftButton>  ← </LeftButton>
      <DownButton>  ↓ </DownButton>
      <RightButton> → </RightButton>
      </div>
      
    </main>
  );
}

export default App;
