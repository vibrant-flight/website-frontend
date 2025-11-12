export interface CartItemView {
    itemId: string;
    name: string;
    selectedSize: 'S' | 'S' | 'L' | 'XL' | 'XXL' | 'XXXL';
    image:string,
    price:number,
    quantity: number;
}
export interface CartView {
    email: string;
    items: CartItemView[];
}
