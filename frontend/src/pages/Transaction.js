import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Transaction() {
    const [transaction, setTransaction] = useState([]);
    const navigate = useNavigate();
    //token
    const token = localStorage.getItem("token");

    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/transactions')
        .then((response) => {
            //set response user to state
            setTransaction(response.data);
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
    return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Transactions
                  </h1>
                  { transaction && transaction.map((trx) =>
                    <div key={trx.id} className="flex gap-3">
                      <button className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-black active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{trx.type}</button>
                      {trx.amount}
                    </div>
                  )}

                  <Link to="/dashboard" className="mt-10 block">Back to dashboard</Link>
              </div>
          </div>
      </div>
    </>
  )
}

export default Transaction;