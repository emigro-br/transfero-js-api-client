import { AxiosInstance } from 'axios';
import {
  TransferoPaymentRequest,
  TransferoPaymentGroupResponse,
  TransferoPaymentPreview,
  PaymentQueryParams,
  TransferoPaymentResponse,
} from './types';

export class PaymentsAPI {
  private readonly accountId: string;
  private readonly apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance, accountId: string) {
    this.apiClient = apiClient;
    this.accountId = accountId;
  }

  // POST https://openbanking.bit.one/api/v{version}/accounts/{accountId}/paymentpreview
  async paymentPreview(brcode: string): Promise<TransferoPaymentPreview> {
    const data = { id: brcode };
    const response = await this.apiClient.post(
      `/accounts/${this.accountId}/paymentpreview`,
      data,
    );
    return response.data;
  }

  // POST https://openbanking.bit.one/api/v{version}/accounts/{accountId}/paymentgroup
  async createPaymentGroup(
    data: TransferoPaymentRequest,
  ): Promise<TransferoPaymentGroupResponse> {
    const response = await this.apiClient.post(
      `/accounts/${this.accountId}/paymentgroup`,
      data,
    );
    return response.data;
  }

  // GET https://openbanking.bit.one/api/v{version}/accounts/{accountId}/paymentgroup/{paymentGroupId}[?paymentId][&externalId]
  async getPaymentGroup(
    paymentGroupId: string,
    paymentId?: string,
    externalId?: string,
  ): Promise<TransferoPaymentGroupResponse> {
    const params = { paymentId, externalId };
    const response = await this.apiClient.get(
      `/accounts/${this.accountId}/paymentgroup/${paymentGroupId}`,
      { params },
    );
    return response.data;
  }

  // GET https://openbanking.bit.one/api/v{version}/accounts/{accountId}/payments[?paymentId][&externalId][&pageNumber][&pageSize]
  async listPayments(
    queryParams: PaymentQueryParams,
  ): Promise<TransferoPaymentResponse[]> {
    const response = await this.apiClient.get(
      `/accounts/${this.accountId}/payments`,
      { params: queryParams },
    );
    return response.data;
  }
}
