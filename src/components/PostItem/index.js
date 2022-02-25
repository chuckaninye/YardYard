import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import firebase from "firebase";
import {
  addProductStart,
  fetchProductsStart,
} from "./../../redux/Products/products.actions";
import "./styles.scss";

const PostItem = (props) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [fileUrl, setFileUrl] = useState();
  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const configAuthWrapper = {
    headline: "Post Item",
  };

  const resetForm = () => {
    setProductName("");
    setProductDesc("");
    setProductPrice(0);
    setFileUrl("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addProductStart({
        productName,
        productDesc,
        productPrice,
        productImage: fileUrl,
      })
    );
    inputRef.current.value = null;
    resetForm();
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  return (
    <div>
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="productName"
              value={productName}
              placeholder="Title"
              handleChange={(e) => setProductName(e.target.value)}
            />

            <textarea
              rows="5"
              cols="37"
              className="product-desc"
              name="productDesc"
              placeholder="Description"
              handleChange={(e) => setProductDesc(e.target.value)}
            >
              {productDesc}
            </textarea>

            <FormInput
              type="text"
              name="productPrice"
              value={productPrice}
              placeholder="Price"
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <input
              className="file-input"
              type="file"
              name="fileupload"
              id="fileupload"
              ref={inputRef}
              onChange={onFileChange}
            />
            <label for="fileupload">Upload Photo</label>

            <Button type="submit">Post Item</Button>
          </form>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default PostItem;
