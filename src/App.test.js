import { render, screen } from '@testing-library/react';
import App from './App';
import { level1 } from "./model/Levels";
import { Model } from './model/Model';
var model = new Model(level1);

test('Moves start at 0', () => {
  expect(model.numMoves).toBe(0);
});

test('Properly renders 0 moves', () => {
  const { getByText } = render(<App />);
  const movesElement = getByText(/Number of Moves: /i);
  expect(movesElement).toBeInTheDocument();
})
