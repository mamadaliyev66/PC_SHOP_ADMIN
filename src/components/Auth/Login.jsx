import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc,Timestamp } from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";
export default function Login() {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    useEffect(() => {
        
      const Check= async ()=>{
        try {
          if(localStorage.getItem("login") && localStorage.getItem("password")){
            const collectionRef = firestore.collection('admin');
                const snapshot  = await collectionRef.get();
                const fetchedData = snapshot.docs.map(doc =>  ({
                  docID: doc.id,
                  ...doc.data()
                }));
                fetchedData.map((doc, key) =>{
                  if (doc.login === localStorage.getItem("login") && doc.password ===  localStorage.getItem("password")) {
                      console.log(window.location.pathname);
                  }else{
                    console.log(doc.login,doc.password,"Invalid Credentails ! ! ! ");
                    // localStorage.setItem('login', doc.email)
                    // localStorage.setItem('password',  doc.password)
                    alert('Your Login or Password is Not Valid ! ! ! ')
                    localStorage.removeItem('login')
                    localStorage.removeItem('password')
                   
                  }})

          }
        
        
          } catch (error) {
          console.log(error);
        }

      }
      Check()
    },[])


    const SignIn = async ()=>{
        try {
            console.log(email,password);
            if (email && password) {
                console.log('authenticating . . . .');
                const collectionRef = firestore.collection('admin');
                const snapshot  = await collectionRef.get();
                const fetchedData = snapshot.docs.map(doc =>  ({
                  docID: doc.id,
                  ...doc.data()
                }));
                console.log(fetchedData);
                fetchedData.map((doc, key) =>{
                  if (doc.login === email && doc.password ===  password) {
                    console.log(doc.docID);
                    localStorage.setItem('login', doc.login)
                    localStorage.setItem('password',  doc.password)
                    window.location.href = '/'
                  }else{
                    console.log(doc.login,doc.password,"Invalid Credentails ! ! ! ");
                    // localStorage.setItem('login', doc.email)
                    // localStorage.setItem('password',  doc.password)
                    alert('Your Login or Password is Not Valid ! ! ! ')
                  }
                })
            }else{
                alert('Please fill all the fields ! ! !')
            } 
        } catch (error) {
            console.log('Eror: ', error);
        }
        // finally{
        //     console.log(auth?.currentUser?.email);
        //     if (auth.currentUser.email) {
        //         localStorage.setItem('login', auth.currentUser.email)
        //         localStorage.setItem('password', password)
        //     }
        // }
       
    }





  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12" data-theme='light'>
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className=" animate-bounce transition-all ease-in-out duration-500 absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0  sm:rounded-3xl">
    <h1 className="text-center mt-9 text-2xl text-white ">Kompyuter UZ</h1>
    </div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input onChange={((e)=>{setEmail(e.target.value)})} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Login. . ." />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Login</label>
            </div>
            <div className="relative">
              <input onChange={((e)=>{setPassword(e.target.value)})} autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className="relative">
              <button onClick={(()=>{SignIn()})} className="bg-cyan-500 w-full text-white rounded-md px-2 py-1">Submit</button>
            </div>
          </div>
        </div>
      </div>

      

    </div>
  </div>
</div>
  )
}
