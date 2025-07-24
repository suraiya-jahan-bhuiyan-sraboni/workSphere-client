import React from "react";
import Header from "../components/Home/Header";
import Solutions from "../components/Home/Solutions";
import Selection from "../components/Home/Selection";
import ClientSection from "../components/Home/ClientSection";
import Banner from "../components/Home/Banner";


const Home = () => {
  return (
    <div className=" w-11/12 mx-auto sm:p-4 ">
      <Header />
      <Solutions />
      <Selection />
      <ClientSection />
      <Banner />
    </div>
  );
};

export default Home;
