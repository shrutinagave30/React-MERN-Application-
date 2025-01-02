import { useState } from "react";
import { GetData } from "./Context";
import Navbar from "./components/Navbar/Navbar";
import BillComponent from "./components/billComponent/BillComponent";
import "./components/billComponent/bill.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Bill() {
  const { bill,calculateTotal,userdata } = GetData(); // Access bill directly from context
    const [total,setTotal]=useState(0)

    useEffect(()=>{
        let x=calculateTotal()
        setTotal(x)

    },[calculateTotal,setTotal])
  

  return (
    <div>
        <Navbar content="Total Bill screen...."/>
      {bill && bill.length > 0 ? (
        <div>
          <div id="title">
            <p style={{ paddingLeft: "1rem" }}>Food</p>
            <p>Price (in ₹)</p>
            <p>Quantity</p>
            <p style={{ paddingRight: "1rem" }}>Total (in ₹)</p>
          </div>

          {bill.map((item, index) => (
            <BillComponent
              key={index}
              food={item.food}
              price={item.price}
              quantity={item.quantity}
              total={item.total}
            />
          ))}

          <div id="title" style={{borderTop:"3px solid black",marginTop:"3rem"}}>
            <p style={{ paddingLeft: "1rem" }}>Total</p>
            <div style={{ paddingRight: "1rem" ,display:"flex",flexDirection:"row",gap:"0.5rem"}}>
            <p >Total (in ₹)</p>
            <p >{total}</p>

            </div>

          </div>
            <Link id="title" style={{marginTop:"3rem"}} to={`/home/${userdata?._id}`}>Home</Link>
        </div>
      ) : (
        <div>No bill</div>
      )}
    </div>
  );
}

export default Bill;
