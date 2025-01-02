import Navbar from "../Navbar/Navbar"
import '../Login/register.css'
import { useState } from "react"
import axios from "axios"

function Dashboard() {
    const [food,setFood]=useState("")
    const [category,setCategory]=useState("")
    const [price,setPrice]=useState(0)
    const [err,setError]=useState(false)
    const [added,setAdded]=useState(false)



    function verify(){

        let errDiv=document.getElementById('errDiv')
        

        if(food === ""){
            setError(true)
            errDiv.innerHTML="<p>Food name cannot be empty!</p>"
            return false;
        }
        if(price === 0){
            setError(true)
            errDiv.innerHTML="<p>price should me more than 0!</p>"
            return false;
        }
        if(category === ""){
            setError(true)
            errDiv.innerHTML="<p>category name cannot be empty!</p>"
            return false;
        }
        return true
    }
    const categories = [
        'Veg',
        'Non-Veg',
        'Snacks',
        'Beverages',
        'Desserts',
        'Soups',
      ];
    
      // Handle change of selected option
      const handleCategoryChange = (e) => {
        setCategory(e.target.value);
      };


   async function handleBtn(e){
        setError(false)

        e.preventDefault()

        if(verify())
        {
            let data={
                Name:food,
                price:price,
                category:category
            }
            let result =await axios.post('http://localhost:5000/additem',data)
            console.log("result",result)

            if(result.data.registered){
                setAdded(true)
                document.getElementById('statusDiv').innerHTML='<p>Food item added successfully!</p>'
            }
            else{
                setAdded(false)
                document.getElementById('statusDiv').innerHTML='<p>Not added successfully!</p>'
            }

        }        

    }


    return (
        <div >
            <Navbar content="Owners Dashboard....." />
            <form >
                <div id="errDiv" style={err ? {display:"flex"}: {display:"none"}}></div>
                <div id="statusDiv" style={added ? {display:"flex"}: {display:"none"}}></div>
                <section>
                <section className="section"  >Enter Food name</section>
                <input className="input" type="text" placeholder="Enter food name" value={food} onChange={(e)=>{setFood(e.target.value);setError(false)}} />
                </section>
    
                <section>
                <section className="section"  >Enter price</section>
                <input className="input" type="number" placeholder="Confirm password" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                </section>
                <div>
      <label className="input" htmlFor="category-select">Select a Category:</label>
      <br></br>
      <select
        id="category-select"
        className="input"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">--Please choose an option--</option>
        {categories.map((categoryItem, index) => (
          <option key={index} className="input" value={categoryItem}>
            {categoryItem}
          </option>
        ))}
      </select>
      </div>

                <button onClick={handleBtn}>Add item</button>
            </form>
        </div>
      )
}

export default Dashboard