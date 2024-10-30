// import React, { useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('/login', { "username" : username, "password" : password });
            
//             localStorage.setItem('token', response.data.access_token);
//             // navigate('/dashboard');

//             // Decode the token to get user information
//             const decodedToken = jwtDecode(response.data.access_token);

//             const role = decodedToken.sub['role'];
//             // Check user role and navigate accordingly
//             if (role === 'admin') {
//                 navigate('/admin/dashboard'); // Redirect to admin dashboard
//             } else if (role === 'user') {
//                 navigate('/user/dashboard'); // Redirect to user dashboard
//             } else {
//                 alert('Unknown role');
//             }

//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Invalid username or password');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LaptopMinimal } from "lucide-react";
import api from "../api";
import "../output.css"
// import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("token", response.data.access_token);

      const decodedToken = jwtDecode(response.data.access_token);
      const role = decodedToken.sub["role"];

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <LaptopMinimal className="w-8 h-8 text-indigo-600" />
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-pink-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-center text-gray-600">
            Not a member?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

