import { AxiosInstance } from 'axios';
import qs from 'qs';
import { TransferoAuthResponse } from './types';

export class AuthAPI {
  constructor(private apiClient: AxiosInstance) {}

  // POST https://openbanking.bit.one/auth/token
  async token(
    clientId: string,
    clientSecret: string,
    scope: string,
  ): Promise<TransferoAuthResponse> {
    // The request body must be (content type) application/x-www-form-urlencoded
    const data = qs.stringify({
      grant_type: 'client_credentials',
      scope: scope,
      client_id: clientId,
      client_secret: clientSecret,
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await this.apiClient.post('/token', data, config);
    return response.data;
  }
}
