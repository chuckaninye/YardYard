import React, { useState, useEffect } from 'react';
import firebase from "firebase";

const ProductList = () => {
    const [prodList, setProdList] = useState();

    useEffect(() => {
        const prodRef = firebase.database().ref("Products")
        prodRef.on("value",(snapshot) => {
        const products = snapshot.val();
        const prodList = []
        for (let id in products){
            prodList.push(products[id])
        }
        console.log(prodList)
        setProdList(prodList);
        })
    },[])

    return (
        <div>
            {prodList ? prodList.map((prod) => (
                <div>
                    <h1>{prod.Title}</h1>
                    <h3>{prod.Description}</h3>
                    <h3>${prod.Price}</h3>
                    <img src={prod.Image}/>
                </div>
            )) : ""}
        </div>
    )
}

export default ProductList;
