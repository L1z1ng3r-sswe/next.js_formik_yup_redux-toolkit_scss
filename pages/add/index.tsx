import React from "react";
import styles from "./AddPage.module.scss";
import { IAddProduct } from "@/features/types";
import { useAddProductMutation } from "@/features/crudAPI";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AddPage: React.FC = () => {
  const { replace } = useRouter();
  const [addProduct] = useAddProductMutation();

  const initialValues: any = {
    title: "",
    price: "",
    img: "",
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

  const handleSubmit = async (values: IAddProduct) => {
    try {
      await addProduct(values).unwrap();
      replace("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

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
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;
