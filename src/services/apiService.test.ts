import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './apiService';

describe('apiService Internal Mocking Demo', () => {
  let service: ReturnType<typeof apiService>;

  beforeEach(() => {
    service = apiService();
    vi.clearAllMocks();
  });

  it('should mock registerUser while using the real service object', async () => {
    service.registerUser = vi.fn().mockResolvedValue({
      success: true,
      id: 'mocked-id-999',
    });

    const result = await service.registerUser({ name: 'test' });

    expect(result.id).toBe('mocked-id-999');
    expect(service.registerUser).toHaveBeenCalledTimes(1);
  });

  it('should mock logAnalytics to prevent console output', () => {
    service.logAnalytics = vi.fn();

    service.logAnalytics('event_name');

    expect(service.logAnalytics).toHaveBeenCalledWith('event_name');
  });

  it('should show that other functions remain real if not mocked', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const realService = apiService();
    realService.logAnalytics('test');

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Real API Call'),
      undefined,
    );
    spy.mockRestore();
  });
});
