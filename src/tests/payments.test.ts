import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PaymentsAPI } from '../client/payments';

import paymentPreviewResponse from '@/mocks/payments/paymentpreview.response.json';
import paymentGroupResponse from '@/mocks/payments/paymentgroup.response.json';
import pixPayoutJson from '@/mocks/payments/payout.brazil-pix.json';
import bankPayoutJson from '@/mocks/payments/payout.brazil-bank.json';
import cryptoPayoutJson from '@/mocks/payments/payout.crypto.json';
import {
  PaymentQueryParams,
  TransferoBrazilBankTransferRequest,
  TransferoCryptoPaymentRequest,
  TransferoPixTransferRequest,
} from '@/client/types';

describe('PayoutAPI', () => {
  let apiClient: AxiosInstance;
  let paymentsApi: PaymentsAPI;
  let mock: any;
  const accountId = 'your-account-id';
  const pixPayout = pixPayoutJson as TransferoPixTransferRequest;
  const bankPayout = bankPayoutJson as TransferoBrazilBankTransferRequest;
  const cryptoPayout = cryptoPayoutJson as TransferoCryptoPaymentRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = axios.create();
    paymentsApi = new PaymentsAPI(apiClient, accountId);
    mock = new MockAdapter(apiClient, { onNoMatch: 'throwException' });
  });

  describe('paymentPreview', () => {
    it('should make a POST request to /accounts/{accountId}/paymentpreview with the correct data', async () => {
      const brcode = 'your-brcode';
      const expectedData = { id: brcode };
      const responseData = paymentPreviewResponse;
      mock
        .onPost(`/accounts/${accountId}/paymentpreview`)
        .reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await paymentsApi.paymentPreview(brcode);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        `/accounts/${accountId}/paymentpreview`,
        expectedData,
      );
      expect(result).toEqual(responseData);
    });
  });

  describe('createPaymentGroup', () => {
    it('should make a POST request to /accounts/{accountId}/paymentgroup with the correct data', async () => {
      const data = [pixPayout, bankPayout, cryptoPayout];
      const responseData = paymentGroupResponse;
      mock
        .onPost(`/accounts/${accountId}/paymentgroup`)
        .reply(200, responseData);

      const mockAxiosPost = jest.spyOn(apiClient, 'post');
      const result = await paymentsApi.createPaymentGroup(data);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        `/accounts/${accountId}/paymentgroup`,
        data,
      );
      expect(result).toEqual(responseData);
    });
  });

  describe('getPaymentGroup', () => {
    it('should make a GET request to /accounts/{accountId}/paymentgroup/{paymentGroupId} with the correct parameters', async () => {
      const paymentGroupId = 'your-payment-group-id';
      const paymentId = 'your-payment-id';
      const externalId = 'your-external-id';
      const expectedParams = { paymentId, externalId };
      const responseData = paymentGroupResponse;
      mock
        .onGet(`/accounts/${accountId}/paymentgroup/${paymentGroupId}`)
        .reply(200, responseData);

      const mockAxiosGet = jest.spyOn(apiClient, 'get');
      const result = await paymentsApi.getPaymentGroup(
        paymentGroupId,
        paymentId,
        externalId,
      );

      expect(mockAxiosGet).toHaveBeenCalledWith(
        `/accounts/${accountId}/paymentgroup/${paymentGroupId}`,
        { params: expectedParams },
      );
      expect(result).toEqual(responseData);
    });
  });

  describe('listPayments', () => {
    it('should make a GET request to /accounts/{accountId}/payments with the correct parameters', async () => {
      const queryParams: PaymentQueryParams = {
        paymentId: 'your-payment-id',
        externalId: 'your-external-id',
        pageNumber: 1,
        pageSize: 10,
      };
      const responseData = paymentGroupResponse;
      mock
        .onGet(`/accounts/${accountId}/payments`, { params: queryParams })
        .reply(200, responseData);
      const mockAxiosGet = jest.spyOn(apiClient, 'get');
      const result = await paymentsApi.listPayments(queryParams);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `/accounts/${accountId}/payments`,
        { params: queryParams },
      );
      expect(result).toEqual(responseData);
    });
  });
});
