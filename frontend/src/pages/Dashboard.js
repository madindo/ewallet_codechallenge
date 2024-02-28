import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    //state user
      const [user, setUser] = useState({});

      //define history
      const navigate = useNavigate();

      //token
      const token = localStorage.getItem("token");
      //function "fetchData"
      const fetchData = async () => {

          //set axios header dengan type Authorization + Bearer token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          //fetch user from Rest API
          await axios.get('http://localhost:8000/api/user')
          .then((response) => {
              //set response user to state
              setUser(response.data);
          })
      }

      //hook useEffect
      useEffect(() => {
          //check token empty
          if(!token) {
              //redirect login page
              navigate('/');
          }
          //call function "fetchData"
          fetchData();
      }, []);

      //function logout
      const logoutHandler = async () => {

          //set axios header dengan type Authorization + Bearer token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          //fetch Rest API
          await axios.post('http://localhost:8000/api/logout')
          .then((response) => {
              //remove token from localStorage
              localStorage.removeItem("token");

              //redirect halaman login
              navigate('/');
          });
      };

    return (
      <>
        <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto">
            <div className="flex items-end text-4xl">
              <span>Welcome, {user.name} </span>
              <span className="flex-1 text-right">Rp. {user.balance}</span>
            </div>
            <center>
              <p className="mb-5">Pick your choice </p>
              <div className="flex gap-3 justify-center">
                <Link to="/deposit" className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Deposit</Link>
                <Link to="/transfer" className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Transfer</Link>
                <Link to="/transactions" className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Transactions</Link>
              </div>
            <br /><br />
            <span onClick={logoutHandler}>Logout</span>
            </center>
        </div>
      </>
    )
}

export default Dashboard;