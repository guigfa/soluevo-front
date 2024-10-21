import { Review } from "./review";
import { Specification } from "./specification";

export interface Product {
    name: string;
    id: number;
    price: number;
    veryShortDescription: string;
    longDescription: string;
    shortDescription: string;
    sizes: string[];
    sku: string;
    category: string;
    tags: string[];
    reviews: Review[];
    specifications: Specification[];
    colors: string[];
    additionalInformation: string;
    images: string[];
    relatedProducts: number[];
    promotion: number;
    isNew: boolean;
}