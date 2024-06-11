import { AxiosInstance } from 'axios';
import {
  TransferoPaymentGroupResponse,
  TransferoPaymentPreview,
  TransferoPixPayout,
} from './types';

export class PayoutAPI {
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
    data: TransferoPixPayout[],
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
}
