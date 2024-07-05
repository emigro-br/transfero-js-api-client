import { AxiosInstance } from 'axios';
import { TransferoQuoteRequest, TransferoQuoteResponse } from './types';

export class QuoteAPI {
  private readonly apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  // POST https://openbanking.bit.one/api/quote/v{version}/requestquote
  async getQuote(
    data: TransferoQuoteRequest,
  ): Promise<TransferoQuoteResponse[]> {
    const response = await this.apiClient.post('/requestquote', data);
    return response.data;
  }
}
