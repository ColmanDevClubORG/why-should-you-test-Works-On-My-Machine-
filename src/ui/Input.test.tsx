import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  it('renders with a label and is linked correctly', () => {
    render(<Input label='Username' placeholder='Enter name' />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('allows the user to write into it', () => {
    const handleChange = vi.fn();
    render(<Input placeholder='Type here' onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'Hello World' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows an error message when error prop is provided', () => {
    render(<Input error='This field is required' />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });
});
