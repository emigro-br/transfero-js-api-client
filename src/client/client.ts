import axios, { AxiosInstance } from 'axios';

import { AuthAPI } from './auth';
import { PaymentsAPI } from './payments';

export type TransferoConfig = {
  clientId: string;
  clientSecret: string;
  clientScope: string;
  environment?: 'production' | 'sandbox';
};

const productionBaseURL = 'https://openbanking.bit.one';
const sandboxBaseURL = 'https://staging-openbanking.bit.one';

export class TransferoClient {
  private version = 'v2';
  private apiBaseURL: string;
  private clientId: string;
  private clientSecret: string;
  private clientScope: string;
  private _auth?: AuthAPI;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor({
    clientId,
    clientSecret,
    clientScope,
    environment = 'sandbox',
  }: TransferoConfig) {
    const baseURL =
      environment === 'production' ? productionBaseURL : sandboxBaseURL;
    this.apiBaseURL = `${baseURL}/api`;

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.clientScope = clientScope;
  }

  /**
   * Creates an instance of the API client with a token interceptor.
   * @param baseURL The base URL for the API client.
   * @returns An instance of the Axios client.
   */
  private createApiClient(baseURL: string): AxiosInstance {
    const apiClient = axios.create({ baseURL });

    apiClient.interceptors.request.use(async (config: any) => {
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
    return apiClient;
  }

  private async ensureValidToken(): Promise<void> {
    const now = new Date();
    // Check if the token is still valid by comparing the current time with the token expiry time
    const isTokenValid =
      this.token && this.tokenExpiry && now < this.tokenExpiry;
    if (!isTokenValid) {
      const response = await this.auth().token(
        this.clientId,
        this.clientSecret,
        this.clientScope,
      );
      this.token = `${response.token_type} ${response.access_token}`;
      // Set the token expiry based on the current time and the expires_in duration from the response
      this.tokenExpiry = new Date(now.getTime() + response.expires_in * 1000);
    }
  }

  auth(): AuthAPI {
    // cache it to avoid creating multiple instances
    if (!this._auth) {
      // baseURL is the same for both sandbox and production
      const authBaseURL = `${productionBaseURL}/auth`;
      // Create an instance of the API client without a token interceptor
      const apiClient = axios.create({ baseURL: authBaseURL });
      this._auth = new AuthAPI(apiClient);
    }
    return this._auth;
  }

  payments(accountId: string): PaymentsAPI {
    const paymentsBaseURL = `${this.apiBaseURL}/${this.version}`;
    const apiClient = this.createApiClient(paymentsBaseURL);
    return new PaymentsAPI(apiClient, accountId);
  }
}
