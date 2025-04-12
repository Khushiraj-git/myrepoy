Frontend (React)
npx create-react-app frontend       // Install Dependencies
cd frontend
npm install axios react-router-dom

//  Create src /App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import StoreList from './StoreList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={StoreList} />
      </Switch>
    </Router>
  );
}

export default App;

//  Create src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '' });
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/register', formData);
    alert('User registered!');
  };

  return (
<form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="address" onChange={handleChange} placeholder="Address" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
// Create src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/login', formData);
    localStorage.setItem('token', response.data.token);
    alert('Logged in!');
  };
return (
// javascript
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;


// Create src/StoreList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function StoreList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await axios.get('http://localhost:5000/stores');
      setStores(response.data);
    };
    fetchStores();
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map(store => (
          <li key={store.id}>{store.name} - {store.address}</li>
        ))}
      </ul>
    </div>
  );
}
export default StoreList;
