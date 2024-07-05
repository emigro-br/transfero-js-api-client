import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthAPI } from '../client/auth';

import authJson from '@/mocks/auth/token.response.json';

describe('AuthAPI', () => {
  let apiClient: AxiosInstance;
  let authAPI: AuthAPI;
  let mock: any;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = axios.create({ baseURL: '/auth' });
    authAPI = new AuthAPI(apiClient);
    mock = new MockAdapter(apiClient, { onNoMatch: 'throwException' });
  });

  describe('token', () => {
    it('should make a POST request to /auth/token with the correct data and headers', async () => {
      const clientId = 'your-client-id';
      const clientSecret = 'your-client-secret';
      const clientScope = 'your-client-scope';

      const expectedData =
        'grant_type=client_credentials&scope=your-client-scope&client_id=your-client-id&client_secret=your-client-secret';
      const expectedConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const responseData = authJson;
      mock.onPost('/auth/token').reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await authAPI.token(clientId, clientSecret, clientScope);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        '/token',
        expectedData,
        expectedConfig,
      );
      expect(result).toEqual(responseData);
    });
  });
});
