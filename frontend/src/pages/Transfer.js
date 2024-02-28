import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Transfer() {
    const [amount, setAmount] = useState("");
    const [user, setUser] = useState({});
    const [to_user_id, setToUserId] = useState("");
    const [validation, setValidation] = useState([]);
    const navigate = useNavigate();
    //token
    const token = localStorage.getItem("token");

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

    const depositHandler = async (e) => {
        e.preventDefault();

        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('amount', amount);
        formData.append('user_id', user.id);
        formData.append('to_user_id', to_user_id);

        //send data to server
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/transfer', formData)
        .then(() => {
            //redirect to login page
            navigate('/dashboard')
        })
        .catch((error) => {
            //assign error to state "validation"
            setValidation(error.response.data.data);
        })
    };

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

      return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Transfer
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={depositHandler}>
                      <div>
                          <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Transfer</label>
                          <input type="number" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100000" required="" value={amount} onChange={(e) => setAmount(e.target.value)} />
                          {
                          validation.amount && (
                              <div className="text-red-500">
                                  {validation.amount[0]}
                              </div>
                          )
                          }
                      </div>
                      <div>
                          <label for="to_user_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
                          <input type="number" name="to_user_id" id="to_user_id" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" required="" value={to_user_id} onChange={(e) => setToUserId(e.target.value)} />
                          {
                          validation.to_user_id && (
                              <div className="text-red-500">
                                  {validation.to_user_id[0]}
                              </div>
                          )
                          }
                      </div>
                      <button type="submit" class="w-full text-white bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Deposit</button>
                  </form>
                  <Link to="/dashboard" className="mt-10 block">Back to dashboard</Link>
              </div>
          </div>
      </div>
    </>
  )
}

export default Transfer;