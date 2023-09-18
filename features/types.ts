export interface IProduct {
  title: string;
  price: number;
  img: string;
  id: number;
}
export interface IAddProduct {
  title?: string;
  price?: number;
  img?: string;
}
export interface IEditProduct {
  id: number;
  editedProduct: IAddProduct;
}
export interface IQuery {
  limit?: null | string | number;
}
