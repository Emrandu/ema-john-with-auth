import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const SignUp = () => {
    const [error, setError] = useState('');

    const {createUser} = useContext(AuthContext)

    const handleSignUp = event =>{
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        const confirmPassword = from.confirm.value;
        console.log(email,password,confirmPassword)
        
        setError('')
        if(password !== confirmPassword){
            setError('Your password did not match')
            return
        }
        else if(password.length < 6){
            setError('password must be 6 characters ')
            return
        }

        createUser(email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(error=>{
            console.log(error)
            setError(error.message)
        })
    }
    return (
        <>
            <div className="form-container">
            <h2 className='form-title'>SignUp</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='confirm' required />
                </div>

                <input className='btn-submit' type="submit" value="SignUp" />
            </form>
            <p><small>Already have an account ? <Link to='/login'>Login</Link>  </small></p>
            <p className='text-error'>{error}</p>
        </div>  
        </>
    );
};

export default SignUp;