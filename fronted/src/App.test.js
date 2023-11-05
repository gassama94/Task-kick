import {
  render,
  screen
} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render( < App / > );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import axios from 'axios';

// Mock axios for all HTTP requests
jest.mock('axios');

describe('App component', () => {
  it('renders add task input field', () => {
    render( < App / > );
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
  });

  it('allows users to input a task', () => {
    render( < App / > );
    const input = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(input, {
      target: {
        value: 'New Task'
      }
    });
    expect(input.value).toBe('New Task');
  });

  it('adds a new task when add button is clicked', async () => {
    // Mock a successful response
    axios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        title: 'New Task',
        completed: false
      },
    });

    render( < App / > );
    const input = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(input, {
      target: {
        value: 'New Task'
      }
    });
    fireEvent.click(screen.getByText('Add Task'));

    // Wait for the post call to complete and the component to re-render
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    // Check if the input has been cleared after task is added
    expect(input.value).toBe('');
  });

  // More tests can be added to cover other functionalities like marking tasks as complete, deleting tasks, etc.
});