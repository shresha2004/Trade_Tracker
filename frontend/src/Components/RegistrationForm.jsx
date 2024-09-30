import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ closeRegisterForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
 const [isLoading,setisLoading] = useState(false)
  const handleSubmit = async (e) => {
    setisLoading(true)
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:4501/register', { email, password });

      setMessage(response.data);
    } catch (error) {
      setMessage('Error in registration');
      console.error('Error in registration', error);
    }
    setisLoading(false)
  };

  return (
    <div style={formContainerStyle} className="d-flex align-items-center justify-content-center">
      <div className="card p-4" style={formStyle}>
        <h2 className="card-title text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-3 col-form-label mb-3">Email:</label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='name@gmail.com'
              />
            </div>
          </div>
          {isLoading ? (<>
                        <div className='position-relative'>
                        <div className="position-absolute top-50 start-50 translate-middle mt-3">
                            <div className="spinner-border text-success align-item-center" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                                </div>
                                </div></>):(<></>)}
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-4 col-form-label">Password:</label>
            <div className="col-sm-8">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='********'
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3">Register</button>
         
        </form>
        <button type="button" onClick={closeRegisterForm} className="btn btn-secondary btn-block mt-3">Close</button>
        {message && <p className="mt-3">{message}</p>}
       
      </div>
     
    </div>
  );
};

const formContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  zIndex:1000
};

const formStyle = {
  width: '400px',
  textAlign: 'center',
  borderRadius: '10px',
};

export default RegistrationForm;
