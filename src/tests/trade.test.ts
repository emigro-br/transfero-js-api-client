import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { TradeAPI } from '../client/trade';
import { TransferoTradeRequest, TransferoTradeResponse } from '../client/types';

import acceptQuoteRequestJson from '@/mocks/trade/acceptquote.request.json';
import acceptQuoteResponseJson from '@/mocks/trade/acceptquote.response.json';

describe('TradeAPI', () => {
  let apiClient: AxiosInstance;
  let tradeApi: TradeAPI;
  let mock: MockAdapter;

  beforeEach(() => {
    apiClient = axios.create({ baseURL: '/trade/v1' });
    tradeApi = new TradeAPI(apiClient);
    mock = new MockAdapter(apiClient);
  });

  describe('acceptQuote', () => {
    it('should make a POST request to /acceptquote with the correct data', async () => {
      const requestData = acceptQuoteRequestJson as TransferoTradeRequest;
      const responseData = acceptQuoteResponseJson as TransferoTradeResponse;

      mock.onPost('/acceptquote').reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await tradeApi.acceptQuote(requestData);

      expect(mockAxiosPost).toHaveBeenCalledWith('/acceptquote', requestData);
      expect(result).toEqual(responseData);
    });
  });
});
