import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EditPage.module.scss";
import { useRouter } from "next/router";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useGetOneProductQuery,
} from "@/features/crudAPI";
import { IEditProduct } from "@/features/types";

export default function Edit() {
  const { pathname, push, replace } = useRouter();
  const { data, isLoading, error, isError } = useGetOneProductQuery({
    id: "1", // Replace with your actual product ID
  });
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const initialValues = {
    title: data?.title || "",
    price: data?.price || "",
    img: data?.img || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("It is necessary field")
      .max(50, "Too much")
      .min(6, "Too low"),
    price: Yup.number()
      .required("It is necessary field")
      .positive("Price must be a positive number"),
    img: Yup.string().required("It is necessary field"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const obj: IEditProduct = {
        editedProduct: {
          title: values.title,
          price: Number(values.price),
          img: values.img,
        },
        id: 1,
      };
      await editProduct(obj).unwrap();
      replace("/");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className={styles.pidor}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Title Input */}
            <div className={styles.formGroup}>
              <label
                htmlFor="title"
                className={touched.title && errors.title ? styles.error : ""}
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className={
                  touched.title && errors.title ? styles.errorInput : ""
                }
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Price Input */}
            <div className={styles.formGroup}>
              <label
                className={touched.price && errors.price ? styles.error : ""}
                htmlFor="price"
              >
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className={
                  touched.price && errors.price ? styles.errorInput : ""
                }
              />
              <ErrorMessage
                name="price"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Image URL Input */}
            <div className={styles.formGroup}>
              <label
                className={touched.img && errors.img ? styles.error : ""}
                htmlFor="img"
              >
                Image URL
              </label>
              <Field
                type="text"
                id="img"
                name="img"
                placeholder="Image URL"
                className={touched.img && errors.img ? styles.errorInput : ""}
              />
              <ErrorMessage
                name="img"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.button}>
              edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
