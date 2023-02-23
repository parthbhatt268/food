import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {connect} from "react-redux"
import {
    postRegister
} from "../../Store/AsyncThunk"



const Register = (props) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        console.log(user)
        if( name && email && password && (password === reEnterPassword)){
            props.postRegister(user)
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.message)
                console.log(res)
                navigate("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }



    return (
        <div className="register_wrap">
        <div className="register">
            {console.log("User", user)}
            <h1 style={{ color:"white"}}>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div style={{ color:"white"}}>or</div>
            <div className="button" onClick={() => navigate("/Login")}>Login</div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    postRegister,
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
 