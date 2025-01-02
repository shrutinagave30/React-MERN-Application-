import React from "react";
import Component from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import './page.css'
import { GetData } from "../Context";
import { Link } from "react-router-dom";

function Veg() {
  const [data, setData] = useState([]);
  let {userdata}=GetData()

  console.log(userdata?._id)
    console.log(userdata)

  useEffect(() => {
    async function fetchData() {
        try {
            let response = await axios.get("http://localhost:5000/getitems", {
              params: {
                type: "Veg",
              },
            });
                    console.log("Fetched data:", response.data.response); // Debug response
            setData(response.data.response);
            
        } catch (e) {
            console.error(e)
        }
    }
    fetchData();
  }, []);

  

  return (
    <div >
        <Navbar content="Veg dishes"/>
        <div id="bill">
      <Link id="bill-btn" to='/bill'>Proceed to Bill</Link>
        </div>

        <div className="menu">
      {
        data && data.map((e)=>(
            <Component name={e.Name} key={e._id} price={e.price}  />
        ))
      }
        </div>
    </div>
  );
}

export default Veg;
