import { AxiosInstance } from 'axios';
import { TransferoTradeRequest, TransferoTradeResponse } from './types';

export class TradeAPI {
  private readonly apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  // POST https://openbanking.bit.one/api/trade/v{version}/acceptquote
  async acceptQuote(
    data: TransferoTradeRequest,
  ): Promise<TransferoTradeResponse> {
    const response = await this.apiClient.post('/acceptquote', data);
    return response.data;
  }
}
