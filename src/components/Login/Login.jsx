import Navbar from "../Navbar/Navbar"
import './register.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetData } from "../../Context"

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setError]=useState(false)

    const {handleLogin}=GetData()

    function verify(){

        let errDiv=document.getElementById('errDiv')

        if(email === ""){
            setError(true)
            errDiv.innerHTML="<p>Email cannot be empty!</p>"
            return false;
        }
        if(password.length < 6){
            setError(true)
            errDiv.innerHTML="<p>Password length should me more than 6!</p>"
            return false;
        }
        return true
    }


   async function handleBtn(e){
        setError(false)

        e.preventDefault()

        if(verify())
        {
            let data={
                email:email,
                password:password
            }
            let result =await handleLogin(data)
            console.log("result",result)

            if(result !== false){
                navigate(`/home/${result}`)
            }
            else{
                document.getElementById('errDiv').innerHTML='<p>Invalid Credentials</p>'
            }

        }        

    }


    return (
        <div >
            <Navbar content="Welcome back, Login to continue..." />
            <form >
                <div id="errDiv" style={err ? {display:"flex"}: {display:"none"}}></div>
                <section>
                <section className="section"  >Enter email</section>
                <input className="input" type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </section>
    
                <section>
                <section className="section"  >Enter password</section>
                <input className="input" type="password" placeholder="Confirm password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </section>
                
                <section className="section"  >Not Registered? <Link to='/register'  >Register</Link></section>
                <section className="section"  >Owner Login? <Link to='/owner'  >owner-login</Link></section>
                <button onClick={handleBtn}>Login</button>
            </form>
        </div>
      )
}

export default Login