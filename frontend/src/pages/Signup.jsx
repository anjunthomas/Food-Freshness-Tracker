import React, { useState } from 'react';
import '../styles/Signup.css';
import axios from 'axios';

function Signup() {
    // Sign up state
    const [name, setName] = useState('');
    const [username, setUsername] = useState(''); // new username field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handlers
    const handleNameChange = (e) => setName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !username || !email || !password || !confirmPassword) {
            alert("All fields must be filled!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords must match!");
            return;
        }

        console.log("Form submitted with: ", { name, username, email, password });

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/registerUser", {
                firstName: name,
                username,
                email,
                password
            });

            console.log("Signup successful:", response.data);
            alert("Account created successfully!");
            window.location.href = '/login';

        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            if (error.response && error.response.data?.missing) {
                alert("Missing fields: " + error.response.data.missing.join(", "));
            } else if (error.response && error.response.status === 409) {
                alert("Email already exists.");
            } else {
                alert("Signup failed. Check console for details.");
            }
        }
    };

    const handleCancel = () => {
        setName('');
        setUsername('');
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
                        <input type="text" className="form-control" placeholder="Name" name="name" aria-label="Name" value={name} onChange={handleNameChange}/>
                    </div>

                    <div className="user_username">
                        <input type="text" className="form-control" placeholder="Username" name="username" aria-label="Username" value={username} onChange={handleUsernameChange}/>
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

                    <div className="button-row">
                        <div className="register">
                            <button type="submit" className="form-control form_button form_button_register">Register</button>
                        </div>

                        <div className="cancel">
                            <button type="button" className="form-control form_button form_button_cancel" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
