import '../styles/Login.css'

function Login() {
    return (
        <div className="login-container">
            <div className="white-box">
            <h1>Sign In!</h1>

            <form>
                <input type="email" placeholder=" Email" class="field"/>
                <br /><br />
                <input type="password" placeholder=" Password" class="field" />
                <br /><br />
                <input type="submit" value="Login" className="login-btn" />
                <br /><br />
                <button type="reset">Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default Login