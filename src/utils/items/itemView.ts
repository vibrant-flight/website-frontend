export interface ItemView {
    itemId:string,
    name: string;
    size: {
        S: number;
        M: number;
        L: number;
        XL: number;
        XXL: number;
        XXXL: number;
    };
    price: number;
    actualPrice: number;
    description:string;
    image: string;
    image1: string;
    image2: string;
    image3: string;
    category: "tshirts" | "shirts" | "sweatshirts" | "hoodies" | "overtees";
    fabric: string;
    errorMessage?: string;
}
