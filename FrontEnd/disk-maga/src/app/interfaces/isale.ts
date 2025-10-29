import { Payment } from "../enums/payment";
import { IProduct } from "./iproduct";

export interface ISale {
    productIds: number[],
    quantities: number[],
    clientId: number | null,
    payment: Payment
}

export interface ISaleResponse extends ISale {
    products: IProduct[],
    saleDate: string,
    subtotal: number,
    quantities: number[],
    payment: Payment,
    clientName: string | null
}
