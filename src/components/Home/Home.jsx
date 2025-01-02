import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetData } from "../../Context";
import Navbar from "../Navbar/Navbar";
import "./home.css";
import axios from "axios";
import { useState } from "react";
import veg from "./veg.jpeg";
import nonveg from "./non-veg.jpeg";
import snacks from "./snacks.jpeg";
import bevarage from "./beverages.jpg";
import desserts from "./desserts.webp";
import soup from "./soup.jpeg";

function Home() {
  const { userdata } = GetData();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const categories = [
    "Veg",
    "Non-Veg",
    "Snacks",
    "Beverages",
    "Desserts",
    "Soups",
  ];

  async function getData() {
    let response = await axios.get(`http://localhost:5000/data/${id}`);
    console.log(response.data);
    setUser(response.data);
  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <Navbar content={`Hello ${user && user?.username}`} />
      <section className="head-menu">Food menu</section>
      <div className="menu">
        <Link to="/veg" className="menu-item">
          <img src={veg} />
          <section>veg</section>
        </Link>
        <Link to="/nonveg" className="menu-item">
          <img src={nonveg} />
          <section>Non-veg</section>
        </Link>
        <Link to="/snacks" className="menu-item">
          <img src={snacks} />
          <section>Snacks</section>
        </Link>
        <Link to="/bevarage" className="menu-item">
          <img src={bevarage} />
          <section>Beverages</section>
        </Link>
        <Link to="/desserts" className="menu-item">
          <img src={desserts} />
          <section>Desserts</section>
        </Link>
        <Link to="/soup" className="menu-item">
          <img src={soup} />
          <section>Soups</section>
        </Link>
      </div>
      <section className="bottom">Select Any category to select food</section>
    </div>
  );
}

export default Home;
