import { ProductItem } from '../admin/products/product-types';

export const checkProductInStorage = (item: ProductItem): ProductItem =>{
  const productsInStorage: ProductItem[]= JSON.parse(localStorage.getItem('productsOrders')) || [];
  return productsInStorage.find((productInStorage)=>{
    return productInStorage.id === item.id;
  });
};