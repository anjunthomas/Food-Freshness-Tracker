import '../styles/Signup.css'

function Signup() {
    return (
        <div className='signup-container'>
            <div className='form-container'>
                <form action="#">
                    {/* Title */}
                    <div className='form_title'>
                        <h1>Sign up!</h1>
                    </div>

                    {/* Form body */}
                    
                    <div class="user_name">
                        <input type="text" class="form-control" placeholder="Name" name="name" aria-label="Name"/>
                    </div>

                    <div class="user_email">
                        <input type="email" class="form-control" name="email" placeholder="Email"/> 
                    </div>

                    <div class="password">
                        <input type="password" class="form-control" placeholder="Password"/>
                    </div>

                    <div class="c-password">
                        <input type="password" class="form-control" placeholder="Confirm Password"/>
                    </div>

                    <div class="register">
                        <a href="#">
                            <button type="button" class="form-control form_button">Register</button>
                        </a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup