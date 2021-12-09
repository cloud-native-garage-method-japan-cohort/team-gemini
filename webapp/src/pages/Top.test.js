import { render, screen, fireEvent } from '@testing-library/react';
import Top from './Top';
import { BrowserRouter as Router, Route } from 'react-router-dom'

test('text inputクリック時にデフォルト検索ワードが入力されている', () => {
  render(
    <Router>
        <Route exact path='/' component={Top} />
    </Router>
  );

  const input = screen.getByRole("textbox").closest("input");
  const defaultKeyword = "IBM";

  expect(input.value).toBe("");

  fireEvent(
    input,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(input.value).toBe(defaultKeyword);
});