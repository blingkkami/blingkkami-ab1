export type ProjectStatus = '문의' | '견적' | '계약' | '작업 중' | '납품' | '완료';
export type PaymentStatus = '결제 대기' | '선입금 완료' | '중도금 완료' | '잔금 완료(완납)';

export interface Client {
  id: string;
  name: string;
  contact: string;
  channel: string;
  status: ProjectStatus;
  deadline: string; // YYYY-MM-DD
  price: number;
  paymentStatus: PaymentStatus;
  memo: string;
  createdAt: string;
}
