import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const Context = createContext();

export const DataProvider = ({ children }) => {
  const [userdata, setUserdata] = useState();
  const [bill,setBill]=useState([])

  async function handleLogin(data) {
    try {
      let result = await axios.get("http://localhost:5000/login", {
        params: {
          email: data.email,
          password: data.password,
        },
      });
      console.log("in context:", data.email, data.password);
      if (result.data.data === "Not found") {
        return false;
      } else {
          console.log(result.data.data);
        setUserdata(result.data.data);
        return result.data.data._id;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function updateBill(data){
    console.log(data)

    setBill((prev)=>[...prev,data])
  }

  function calculateTotal(){

    let totalSum=bill.reduce((sum,item)=>sum+item.total,0)
    console.log(totalSum)
    return totalSum

  }

  return (
    <Context.Provider
      value={{
        handleLogin,
        userdata,
        updateBill,
        bill,
        calculateTotal
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const GetData = () => useContext(Context);
