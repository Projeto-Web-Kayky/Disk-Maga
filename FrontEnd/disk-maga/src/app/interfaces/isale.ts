import { Payment } from "../enums/payment";
import { IProduct } from "./iproduct";

export interface ISale {
    productIds: number[],
    quantities: number[],
    clientId: number,
    payment: Payment
}

export interface ISaleResponse extends ISale {
    products: IProduct[],
    date: string,
    subtotal: number
}
