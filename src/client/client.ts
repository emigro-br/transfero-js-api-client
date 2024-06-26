import axios, { AxiosInstance } from 'axios';

import { AuthAPI } from './auth';
import { PayoutAPI } from './payout';

export type TransferoConfig = {
  clientId: string;
  clientSecret: string;
  clientScope: string;
  environment?: 'production' | 'sandbox';
};

export class TransferoClient {
  private version = 'v2';
  private auth: AuthAPI;
  private apiClient: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private clientScope: string;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor({
    clientId,
    clientSecret,
    clientScope,
    environment = 'sandbox',
  }: TransferoConfig) {
    const baseURL =
      environment === 'production'
        ? 'https://openbanking.bit.one/api'
        : 'https://staging-openbanking.bit.one/api';

    const apiClient = axios.create({ baseURL: `${baseURL}/${this.version}` });

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.clientScope = clientScope;

    this.auth = new AuthAPI(apiClient);

    apiClient.interceptors.request.use(async (config) => {
      // Check if the current request is for the token endpoint and skip the token check
      if (config.url?.endsWith('/auth/token')) {
        return config;
      }

      await this.ensureValidToken();
      if (this.token) {
        // Ensure the token is correctly prefixed with 'Bearer '
        const authToken = this.token.startsWith('Bearer ')
          ? this.token
          : `Bearer ${this.token}`;
        config.headers.Authorization = authToken;
      }
      return config;
    });
    this.apiClient = apiClient;
  }

  private async ensureValidToken(): Promise<void> {
    const now = new Date();
    // Check if the token is still valid by comparing the current time with the token expiry time
    const isTokenValid =
      this.token && this.tokenExpiry && now < this.tokenExpiry;
    if (!isTokenValid) {
      const response = await this.auth.token(
        this.clientId,
        this.clientSecret,
        this.clientScope,
      );
      this.token = `${response.token_type} ${response.access_token}`;
      // Set the token expiry based on the current time and the expires_in duration from the response
      this.tokenExpiry = new Date(now.getTime() + response.expires_in * 1000);
    }
  }

  payout(accountId: string): PayoutAPI {
    return new PayoutAPI(this.apiClient, accountId);
  }
}
