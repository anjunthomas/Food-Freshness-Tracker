import React, {useState} from 'react'
import '../styles/Signup.css'
import axios from 'axios'

function Signup() {
    //Sign up functions:
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //onChange Handlers
    const handleNameChange = (e) => { 
        setName(e.target.value); 
    };

    const handleEmailChange = (e) => { 
        setEmail(e.target.value); 
    };

    const handlePassword = (e) => { 
        setPassword(e.target.value); 
    };

    const handleConfirmPassword = (e) => { 
        setConfirmPassword(e.target.value); 
    };

    //Submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevents the page from refreshing

        //Validation check
        if(!name || !email || !password || !confirmPassword)
        {
            alert("All fields must be filled!");
            return;
        }

        if(password.length < 8)
        {
            alert("The password must be at least 8 characters long!");
            return;
        }
            
        if (password !== confirmPassword)
        {
            alert("Passwords must match!");
            return;
        }

        console.log("Form submitted with: ", {name, email, password});
        try {
        const response = await axios.post("http://localhost:5000/api/registerUser", {
            name: name,
            email: email,
            password: password
        });

        console.log("Signup successful:", response.data);
        alert("Account created successfully!");

        window.location.href = '/login';

    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        alert("Signup failed. Check console for details.");
    }
};

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className='signup-container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className='form_title'>
                        <h1>Sign up!</h1>
                    </div>

                    {/* Form body */}

                    <div className="user_name">
                        <input type="text" className="form-control" placeholder="Name" name="name" aria-label="Name" value ={name} onChange={handleNameChange}/>
                    </div>

                    <div className="user_email">
                        <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
                    </div>

                    <div className="password">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword}/>
                    </div>

                    <div className="c-password">
                        <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword}/>
                    </div>

                    <div className='login'>
                        <p>Already have an account? <a href="/login">Log in</a></p>
                    </div>

                    <div className="button-row">
                        <div className="cancel">
                            <button type="button" className="form-control form_button form_button_cancel" onClick={handleCancel}>Cancel</button>
                        </div>
                        
                        <div class="register">
                            <button type="submit" className="form-control form_button form_button_register" onClick={handleSubmit}>Register</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup;