import React from "react";
import styles from "./ProductList.module.scss";
import ProductsItem from "../ProductItem";

const ProductList = () => {
  return (
    <div className={styles.list}>
      <ProductsItem />
    </div>
  );
};

export default ProductList;
