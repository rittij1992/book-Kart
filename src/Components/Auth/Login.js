import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextApi/UserContext";
const Login = () => {
    const { userToken, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formSubmit = async (e) => {
        e.preventDefault();
        const loginData = { emailId: email, password };
        const response = await fetch('http://localhost:4000/user/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });
        const data = await response.json();
        console.log(data);
        setUserToken(data.token);
    };
    useEffect(() => {
        if (userToken) {
            navigate("/dashboard")
        }
    }, [userToken])


    return (
        <div className="container">
            {userToken}
            <div className="row">
                <div className="col-sm-6">
                    <form onSubmit={formSubmit}>
                        <div className="form-group">
                            <label >Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" name="email"></input>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" name="password"></input>
                        </div>

                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;