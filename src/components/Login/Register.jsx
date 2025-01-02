import Navbar from "../Navbar/Navbar"
import './register.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate=useNavigate()
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [mob,setMob]=useState("")
    const [password,setPassword]=useState("")
    const [cpassword,setCpassword]=useState("")
    const [err,setError]=useState(false)

    function verify(){

        let errDiv=document.getElementById('errDiv')
        if(userName === ""){
            setError(true)
            errDiv.innerHTML="<p>Username cannot be empty!</p>"
            return false;
        }
        if(email === ""){
            setError(true)
            errDiv.innerHTML="<p>Email cannot be empty!</p>"
            return false;
        }
        if(mob.length !== 10){
            setError(true)
            errDiv.innerHTML="<p>incorrect mobile no!</p>"
            return false;
        }
        if(password.length < 6){
            setError(true)
            errDiv.innerHTML="<p>Password length should me more than 6!</p>"
            return false;
        }
        if(password !== cpassword){
            setError(true)
            errDiv.innerHTML="<p>Password and confirm password do not match!</p>"
            return false;
        }
        return true
    }


   async function handleRegister(e){
        setError(false)

        e.preventDefault()

        let data={
            username:userName,
            mob:mob,
            email:email,
            password:password
        }

        if(verify()){
            let result= await axios.post('http://localhost:5000/register',data)
            
            if(result.data.registered === "yes"){
                navigate('/login')
            }
        }


    }


    

  return (
    <div >
        <Navbar content="Hello, Register to continue..." />
        <form >
            <div id="errDiv" style={err ? {display:"flex"}: {display:"none"}}>error!</div>
            <section>
            <section className="section"  >Enter name</section>
            <input className="input" type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter name"/>
            </section>
            <section>
            <section className="section"  >Enter email</section>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
            </section>
            <section>
            <section className="section"  >Enter mobile no</section>
            <input className="input" type="number" value={mob} onChange={(e)=>{setMob(e.target.value)}} placeholder="Enter mobile number"/>
            </section>
            <section>
            <section className="section"  >Set password</section>
            <input className="input" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Set password"/>
            </section>

            <section>
            <section className="section"  >Confirm password</section>
            <input className="input" type="password" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} placeholder="Confirm password"/>
            </section>

            <section className="section"  >Already registered? <Link to='/login'  >Login</Link></section>
            <button onClick={handleRegister} >Register</button>
        </form>
    </div>
  )
}

export default Register