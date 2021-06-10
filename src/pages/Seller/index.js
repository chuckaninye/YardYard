import React, { useState } from "react";
import AuthWrapper from "./../../components/AuthWrapper";
import FormInput from "./../../components/forms/FormInput";
import Button from "./../../components/forms/Button";
import ProductList from "./../../components/ProductList";
import firebase from "firebase";
import "./styles.scss";

const Seller = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState(null);


  const configAuthWrapper = {
    headline: "Post Item",
  };


  const resetForm = () => {
    setTitle("");
    setDesc("");
    setPrice("");
    setFileUrl(null)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(title, desc, price);

    try {
      const firestore = firebase.database().ref("/Products");
      let data = {
        Title: title,
        Description: desc,
        Price: price,
        Image: fileUrl,
      };
      firestore.push(data);
      resetForm();
    } catch (error) {
      // console.log(error)
    }
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
              name="title"
              value={title}
              placeholder="Title"
              handleChange={(e) => setTitle(e.target.value)}
            />

            <FormInput
              type="text"
              name="desc"
              value={desc}
              placeholder="Description"
              handleChange={(e) => setDesc(e.target.value)}
            />

            <FormInput
              type="text"
              name="price"
              value={price}
              placeholder="Price"
              handleChange={(e) => setPrice(e.target.value)}
            />

            <FormInput type="file" name="file" handleChange={onFileChange} />

            <Button type="submit">Post Item</Button>
          </form>
        </div>
      </AuthWrapper>
      <ProductList/>
    </div>
      
      );
};

export default Seller;
