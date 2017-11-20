
export interface IProductList {
    items: IProductDTO[];
    links: ILink[];
}

export interface IProductDTO {
    data: IProduct;
    links: ILink[];
}

export interface IProduct {
    id: string;
    name: string;
    category: string;
    price: number;
}

export interface ILink {
    rel: string;
    href: string;
}
export { };
