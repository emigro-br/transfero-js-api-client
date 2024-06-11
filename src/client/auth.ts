import { AxiosInstance } from 'axios';
import qs from 'qs';
import { TransferoAuthResponse } from './types';

export class AuthAPI {
  constructor(private apiClient: AxiosInstance) {}

  // POST https://openbanking.bit.one/auth/token
  async token(
    clientId: string,
    clientSecret: string,
  ): Promise<TransferoAuthResponse> {
    // The request body must be (content type) application/x-www-form-urlencoded
    const data = qs.stringify({
      clientId,
      clientSecret,
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await this.apiClient.post('/auth/token', data, config);
    return response.data;
  }
}
