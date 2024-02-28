import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  //define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const navigate = useNavigate();

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();

        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('c_password', passwordConfirmation);

        //send data to server
        await axios.post('http://localhost:8000/api/register', formData)
        .then(() => {
            //redirect to login page
            navigate('/')
        })
        .catch((error) => {
            //assign error to state "validation"
            setValidation(error.response.data.data);
        })
    };

    return (
      <>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create and account
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={registerHandler}>
                      <div>
                          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                          <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" value={name} onChange={(e) => setName(e.target.value)} />
                          {
                          validation.name && (
                              <div className="text-red-500">
                                  {validation.name[0]}
                              </div>
                          )
                          }
                      </div>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
                          {
                          validation.email && (
                              <div className="text-red-500">
                                  {validation.email[0]}
                              </div>
                          )
                          }
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                          {
                          validation.password && (
                              <div className="text-red-500">
                                  {validation.password[0]}
                              </div>
                          )
                          }
                      </div>
                      <div>
                          <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                      </div>
                      <button type="submit" class="w-full text-white bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <Link to="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
      </>
    )
}

export default Register;