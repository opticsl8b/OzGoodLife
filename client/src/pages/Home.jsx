import React from "react";
import Annoucement from "../components/Annoucement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
