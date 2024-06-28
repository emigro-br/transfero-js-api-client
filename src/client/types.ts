// BRL, ARS, XLM, ETH, BTC etc
// type TransferoCurrency = 'BRL' | 'ARS' | 'XLM' | 'ETH' | 'BTC';

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
type TransferoPaymentRequestBase = {
  amount: number;
  externalId?: string | null;
  currency: string; // BRL, ARS, XLM, ETH, BTC etc
  name: string;
  taxIdCountry: TransferoTaxIdCountry;
  taxId: string;
};

// Brazil - transfer using a Pix key
export type TransferoPixTransferRequest = TransferoPaymentRequestBase & {
  pixKey: string;
};

// Brazil - pyament using a Pix brcode
export type TransferoBrCodePaymentRequest = TransferoPaymentRequestBase & {
  qrCode: string;
};

// Brazil - transfer using account info
export type TransferoBrazilBankTransferRequest = TransferoPaymentRequestBase & {
  bankAccount: string;
  bankBranch: string;
  bankCode: string;
};

// Crypto payout
export type TransferoCryptoPaymentRequest = TransferoPaymentRequestBase & {
  wallet: string;
  tag?: string | null;
  blockchain: string;
  blockchainFeeId?: string;
};

export type TransferoPaymentRequest = (
  | TransferoPixTransferRequest
  | TransferoBrCodePaymentRequest
  | TransferoBrazilBankTransferRequest
  | TransferoCryptoPaymentRequest
)[];

export type TransferoPaymentResponseBase = {
  paymentId: string;
  amountNet?: number;
  paymentStatus: TransferoPaymentStatus;
  transactionId: string | null;
  transactionIdFromPaymentReversal: string | null;
  reasonsForPaymentRejection: string | null;
};

export type TransferoPixTransferResponse = TransferoPaymentResponseBase &
  TransferoPixTransferRequest;
export type TransferoBrCodePaymentResponse = TransferoPaymentResponseBase &
  TransferoBrCodePaymentRequest;
export type TransferoBrazilBankTransferResponse = TransferoPaymentResponseBase &
  TransferoBrazilBankTransferRequest;
export type TransferoCryptoPaymentResponse = TransferoPaymentResponseBase &
  TransferoCryptoPaymentRequest;

export type TransferoPaymentResponse =
  | TransferoPixTransferResponse
  | TransferoBrCodePaymentResponse
  | TransferoBrazilBankTransferResponse
  | TransferoCryptoPaymentResponse;

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

export type PaymentQueryParams = {
  paymentId?: string;
  externalId?: string;
  pageNumber?: number;
  pageSize?: number;
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
