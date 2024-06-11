import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthAPI } from '../client/auth';

describe('AuthAPI', () => {
  let apiClient: AxiosInstance;
  let authAPI: AuthAPI;
  let mock: any;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = axios.create();
    authAPI = new AuthAPI(apiClient);
    mock = new MockAdapter(apiClient, { onNoMatch: 'throwException' });
  });

  describe('token', () => {
    it('should make a POST request to /auth/token with the correct data and headers', async () => {
      const clientId = 'your-client-id';
      const clientSecret = 'your-client-secret';

      const expectedData =
        'clientId=your-client-id&clientSecret=your-client-secret';
      const expectedConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const responseData = { accessToken: 'your-access-token' };
      mock.onPost('/auth/token').reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await authAPI.token(clientId, clientSecret);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        '/auth/token',
        expectedData,
        expectedConfig,
      );
      expect(result).toEqual(responseData);
    });
  });
});
