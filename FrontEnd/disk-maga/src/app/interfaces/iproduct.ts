import { Category } from "../enums/category";
import { UnityMeasure } from "../enums/unity-measure";

export interface IProduct {
    id?: number,
    productName: string,
    category: Category,
    costPrice: number,
    salePrice: number,
    quantity: number,
    unityMeasure: UnityMeasure
}
export interface IProductResponse {
    productId: number,  
    productName: string,
    category: Category,
    costPrice: number,
    salePrice: number,
    unityMeasure: UnityMeasure,
    quantity: number
}