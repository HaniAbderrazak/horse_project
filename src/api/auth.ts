interface LoginResponse {
    token: string;
    user: {
      email: string;
    };
  }
  
  export const login = async (email: string, password: string): Promise<LoginResponse> => {
    // Mock API call - replace with actual API call
    if (email === 'noonacademy.an@gmail.com' && password === '2d4ILZCLc5NX') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-123456',
            user: {
              email,
            },
          });
        }, 500); // Simulate network delay
      });
    }
  
    throw new Error('Invalid credentials');
  };