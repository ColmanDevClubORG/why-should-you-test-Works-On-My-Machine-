export const apiService = () => {
  const registerUser = async (userData: any): Promise<{ success: boolean; id?: string }> => {
    console.log('Real API Call: Sending data to /api/register...', userData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      id: Math.random().toString(36).substr(2, 9),
    };
  };

  const logAnalytics = (event: string, data?: any) => {
    console.log(`Real API Call: Logging event [${event}]`, data);
  };

  return {
    registerUser,
    logAnalytics,
  };
};
