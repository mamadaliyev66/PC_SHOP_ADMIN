import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar, Button } from 'daisyui';
import pcicon from '../public/computer_11152872 (1).png';
import pcicon2 from '../public/computer_11152968.png';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'; // For routing (replace with your routing library)
import pciconlight from '../public/icons8-computer-64.png'
import Pages from './components/Pages';
import { BrowserRouter  } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  // const [count, setCount] = useState(01)
  const [theme, setTheme] = useState('black')
  // const [ip,setIp]=useState(Date())
  // const [place,setPlace] = useState()

  const [loading,setLoading] = useState(true)
  useEffect(() =>{
    setLoading(true)
    if (localStorage.getItem('theme')) {
      document.getElementById('12312').setAttribute('data-theme',localStorage.getItem('theme'));
    }
   
    try {
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
                    window.location.href = '/login'
                  }})

          }else{
            
          }
        
        
          } catch (error) {
          console.log(error);
        }

      }
      Check()
    } catch (error) {
      console.log('error:',error);
    }finally{
      setLoading(false)
    }

    
    // getIp();
  },[])



  const themeChanger=(e)=>{
    console.log();
    localStorage.setItem('theme',e)
    window.document.getElementById('12312').setAttribute('data-theme',e)
    setTheme(e)
  }


  // const getIp=async()=>{
  //   fetch('https://api.ipify.org?format=json')
  //   .then(response => response.json())
  //   .then(data => {
  //       console.log(data.ip);
  //       setIp(data.ip)
  //   })
  //   .catch(error => {
        
  //   });
  //   fetch('https://ipinfo.io/94.158.59.56/json?token=33a05b6e9390cf')
  //   .then(function (response) {
  //       return response.json();
  //   })
  //   .then(function (payload) {
  //       setPlace(payload.timezone)
  //   });
  // }
    


  {/* black /// light mode  */}
                       
  {/* black /// light mode  */}
  
  
  return (
    <>
    <BrowserRouter>
      {loading?(
        <div className="md:mx-9 md:mt-9  sm:mx-6 sm:mt-6 mt-3 mx-3 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-16 ">
        <div className=" space-y-3 card card-compact gap-4 w-52  mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className=" space-y-3 card card-compact gap-4 w-52 mx-auto">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        
  </div>
 
   
      ):(<div>
{window.location.pathname!='/login'?(
<div>
  
{/* navbar */}
<div className="navbar bg-base-100 border-b-2 border-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact  dropdown-content mt-3 p-2 shadow  z-40 bg-primary text-primary-content rounded-box w-52">
          <li>      <Link to={'/'}>Barchasi</Link>            </li>
            <li> <Link to={'/computers'}>Kompyuterlar</Link></li>
            <li><Link to={'/others'}>Boshqalar</Link></li>
            <li><Link to={'/orders'}>Buyurtmalar</Link></li>
          </ul>
        </div>


        <Link to={'/'} className="btn btn-ghost justify-end text-xl">
                      <img className='  transition ease-in-out duration-1000 w-9' src={document.getElementById('12312').getAttribute('data-theme')=='black'?(pcicon):(pciconlight)} alt="pciconhere"  />
                      KOMPYUTER UZ</Link>
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal uppercase px-1 text-xl">
          <li className=''>
            <a>
            {/* IP: {ip} § <span>{place}</span> */}
            
            </a>
            </li>
            <li>      <Link to={'/'}>Barchasi</Link>            </li>
            <li> <Link to={'/computers'}>Kompyuterlar</Link></li>
            <li><Link to={'/others'}>Boshqalar</Link></li>
            <li><Link to={'/orders'}>Buyurtmalar</Link></li>

          
        </ul>
      </div>
      <div className="navbar-end sm:pr-4">
      {/* <button className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button> */}
        <label className="swap swap-rotate ">
                  
              <input type="checkbox" />
              {/* // moon icon */}
              <svg onClick={(()=>{themeChanger('light')})} className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
              
              {/* // sun icon */}
              <svg onClick={(()=>{themeChanger('black')})} className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              
    
        </label> 
      </div>
    </div>
    {/* navbar */}

</div>
):(<></>)}


          {/* main */}

         < Pages/>

        {/* main */}
      </div>)}


      

         </BrowserRouter>
    </>
  )
}

export default App
