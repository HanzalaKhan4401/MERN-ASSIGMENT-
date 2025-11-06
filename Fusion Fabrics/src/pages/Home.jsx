// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';



const Home = () => {
  const [products,setProducts]= useState([])
// api - call to fetch all products
 

const   getProducts=async ()=>{
  try {
const response= await axios.get("http://localhost:5000/product");
console.log(response.data)
setProducts(response.data.products)
    
  } catch (error) { 
    console.log("Something went wrong",error)
  }
}


useEffect(()=>{
  getProducts();
},[])

  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products allproducts={products} />
      <Footer />
    </div>
  );
};

export default Home;
