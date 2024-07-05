import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QuoteAPI } from '../client/quote';
import { TransferoQuoteRequest, TransferoQuoteResponse } from '../client/types';
import quoteRequestJson from '@/mocks/quote/requestquote.request.json';
import quoteResponseJson from '@/mocks/quote/requestquote.response.json';

describe('QuoteAPI', () => {
  let apiClient: AxiosInstance;
  let quoteApi: QuoteAPI;
  let mock: MockAdapter;

  beforeEach(() => {
    apiClient = axios.create({ baseURL: '/quote/v1' });
    quoteApi = new QuoteAPI(apiClient);
    mock = new MockAdapter(apiClient);
  });

  describe('getQuote', () => {
    it('should make a POST request to /requestquote with the correct data', async () => {
      const requestData = quoteRequestJson as TransferoQuoteRequest;
      const responseData = [quoteResponseJson as TransferoQuoteResponse];

      mock.onPost('/requestquote').reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await quoteApi.getQuote(requestData);

      expect(mockAxiosPost).toHaveBeenCalledWith('/requestquote', requestData);
      expect(result).toEqual(responseData);
    });
  });
});
