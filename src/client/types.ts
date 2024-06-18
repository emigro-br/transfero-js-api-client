// BRL, ARS, XLM, ETH, BTC etc
type TransferoCurrency = 'BRL' | 'ARS' | 'XLM' | 'ETH' | 'BTC';

/*
taxIdCountry
76 - Brazil
32 - Argentina
*/
export enum TransferoTaxIdCountry {
  Argentina = 32,
  Brazil = 76,
}

export type TransferoAuthResponse = {
  token_type: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
};

export type TransferoPaymentPreview = {
  id: string;
  type: string;
  status: string;
  name: string;
  taxId: string;
  amount: number;
  interestAmount: number;
  fineAmount: number;
  discountAmount: number;
  brCode: {
    bankCode: string;
    accountType: string;
    reconciliationId: string;
    description: string;
    keyId: string;
    nominalAmount: number;
    reductionAmount: number;
  };
  scheduled: string | null;
};

// Payout
type TransferoPaymentRequest = {
  id?: string;
  amount: number;
  currency: TransferoCurrency;
  name: string;
  taxIdCountry: TransferoTaxIdCountry;
  taxId: string;
};

// Brazil - transfer using a Pix key
export type TransferoPixPaymentRequest = TransferoPaymentRequest & {
  pixKey: string;
  QrCode?: string;
};

// Brazil - transfer using account info
export type TransferoBankAccountPaymentRequest = TransferoPaymentRequest & {
  bankAccount: string;
  bankBranch: string;
  bankCode: string;
};

// Crypto payout
export type TransferoCryptoPaymentRequest = TransferoPaymentRequest & {
  wallet: string;
  tag?: string | null;
  blockchain: string;
};

export type TransferoPaymentGroupRequest = (
  | TransferoPixPaymentRequest
  | TransferoBankAccountPaymentRequest
  | TransferoCryptoPaymentRequest
)[];

export type TransferoPaymentGroupResponse = {
  paymentGroupId: string;
  totalAmount: number;
  totalAmountPaymentsCompletedWithSuccess: number;
  numberOfPayments: number;
  numberOfPaymentsPending: number;
  numberOfPaymentsProcessing: number;
  numberOfPaymentsCompletedWithSuccess: number;
  numberOfPaymentsCompletedWithError: number;
  createdAt: string;
  payments: TransferoPaymentResponse[];
};

export type TransferoPaymentResponse = {
  paymentId: string;
  amount: number;
  amountNet: number;
  externalId: string;
  currency: string;
  name: string;
  taxId: string;
  taxIdCountry: TransferoTaxIdCountry;
  bankAccount: string;
  bankBranch: string;
  bankCode: string;
  cbuCvu: string | null;
  pixKey: string | null;
  alias: string | null;
  paymentStatus: TransferoPaymentStatus;
  transactionId: string;
  transactionIdFromPaymentReversal: string | null;
  reasonsForPaymentRejection: string | null;
  wallet: string | null;
  tag: string | null;
  blockchain: number;
};

/*
Pending - payment is being prepared by transfero
Processing - payment has been sent to the bank and is being processed
CompletedWithError - payment was rejected
CompletedWithSuccess - payment was settled
*/
export type TransferoPaymentStatus =
  | 'Pending'
  | 'Processing'
  | 'CompletedWithError'
  | 'CompletedWithSuccess';
