export interface purchasesQueryParams {
  email: string,
  limit?: number,
  offset?: number
  }

export interface lastPurchaseDto{
  user: string
  amount: number,
}