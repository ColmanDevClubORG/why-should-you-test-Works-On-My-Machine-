import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Home } from './Home';

vi.mock('../services/apiService', () => ({
  apiService: vi.fn(() => ({
    registerUser: vi.fn().mockResolvedValue({ success: true, id: '123' }),
    logAnalytics: vi.fn(),
  })),
}));

describe('Home Integration Test', () => {
  it('should successfully register a user when valid data is provided', async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(screen.getByText(/Create Account/i));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Success! User testuser registered'),
      );
    });

    alertSpy.mockRestore();
  });

  it('should show validation errors from the Validation Service', async () => {
    render(<Home />);

    // Provide invalid email (integrating with real validationService logic)
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByText(/Create Account/i));

    // Check if the error message from the validation service appears in the UI
    expect(
      await screen.findByText(/Please enter a valid email/i),
    ).toBeInTheDocument();
  });
});
