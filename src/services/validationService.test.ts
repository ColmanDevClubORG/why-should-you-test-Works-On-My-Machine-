import { describe, it, expect } from 'vitest';
import { validationService } from './validationService';

describe('validationService', () => {
  const { validateEmail, validatePassword, isUsernameTaken } =
    validationService();

  describe('validateEmail', () => {
    it('returns true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('testexample.com')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for passwords with 8+ chars and a number', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('longEnough8')).toBe(true);
    });

    it('returns false if password is too short', () => {
      expect(validatePassword('short1')).toBe(false);
    });

    it('returns false if password has no numbers', () => {
      expect(validatePassword('passwordString')).toBe(false);
    });
  });

  describe('isUsernameTaken', () => {
    it('returns true for taken usernames', () => {
      expect(isUsernameTaken('admin')).toBe(true);
      expect(isUsernameTaken('ROOT')).toBe(true);
    });

    it('returns false for available usernames', () => {
      expect(isUsernameTaken('tamir198')).toBe(false);
      expect(isUsernameTaken('new_user')).toBe(false);
    });
  });
});
