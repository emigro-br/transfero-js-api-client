import axios from 'axios';

import { AuthAPI } from './auth';
import { PayoutAPI } from './payout';

export class TransferoClient {
  private auth: AuthAPI;
  public payout: PayoutAPI;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private accountId: string,
  ) {
    const apiClient = axios.create({
      baseURL: 'https://openbanking.bit.one/api/v2', //TODO: check the version
    });
    this.auth = new AuthAPI(apiClient);
    this.payout = new PayoutAPI(apiClient, accountId);

    // Set the Authorization header for all requests
    this.auth.token(this.clientId, this.clientSecret).then((response) => {
      apiClient.defaults.headers.common['Authorization'] =
        `${response.token_type} ${response.access_token}`;
    });
  }
}
