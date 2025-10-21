import { Category } from "../enums/category";
import { UnityMeasure } from "../enums/unity-measure";

export interface IProduct {
    productName: string,
    category: Category,
    costPrice: number,
    salePrice: number,
    quantity: number,
    unityMeasure: UnityMeasure
}

export interface IProductResponse extends IProduct {
    productId: number
}
