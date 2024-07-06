

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";
import { db ,firestore} from "../config/firebase";
import { Link } from "react-router-dom";
export default function All() {
    const [Akksessuardata,setAkksessuarData]=useState()
    const [computersData,setcomputersData]=useState()
    const [results,setResults]=useState()
    const [searchTerm, setSearchTerm] = useState("");

    const [loading,setloading]=useState(true)
    const [searchbar,setsearchbar]=useState()
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
                    window.location.href = '/login'
                  }})

          }else{
            window.location.href = '/login'

          }
        
        
          } catch (error) {
          console.log(error);
        }

      }
      Check()
        const fetchAkksessuarData = async () => {
          try {
            const collectionRef = firestore.collection('aksessuarlar');
            const snapshot  = await collectionRef.get();
            const fetchedData = snapshot.docs.map(doc => doc.data());
            setAkksessuarData(fetchedData);
            console.log(fetchedData);
            // console.log(fetchedData);
    
    
          } catch (error) {
            console.error('Error fetching data from Firestore:', error);
          } finally{
            setloading(false)
          }
        };
        const fetchComputersData = async () => {
            try {
              const collectionRef = firestore.collection('noutboklar');
              const snapshot  = await collectionRef.get();
              const fetchedData = snapshot.docs.map(doc => doc.data());
              setcomputersData(fetchedData);
              console.log(fetchedData);
              // console.log(fetchedData);
      
      
            } catch (error) {
              console.error('Error fetching data from Firestore:', error);
            } finally{
              setloading(false)
            }
          };
        fetchComputersData()
        fetchAkksessuarData();
    
    
      }, []);


      const Search=async(e)=>{
        const searchPhrase = e
        setSearchTerm(searchPhrase);
        console.log(e);

        try {
            setloading(true);
            let fetchedComputersData = [];
            let fetchedAkksessuarData = [];

            if (searchPhrase) {  
              Akksessuardata.map((aks,i)=>{
                if(aks.nomi.toLowerCase().includes(searchPhrase.toLowerCase())){
                  fetchedAkksessuarData.push(aks)
                }})
                computersData.map((comp,i)=>{
                  if(comp.nomi.toLowerCase().includes(searchPhrase.toLowerCase())){
                    fetchedComputersData.push(comp)
                  }
                })
                setcomputersData(fetchedComputersData);
                setAkksessuarData(fetchedAkksessuarData);
              } else {
               
                const fetchAkksessuarData = async () => {
                  try {
                    const collectionRef = firestore.collection('aksessuarlar');
                    const snapshot  = await collectionRef.get();
                    const fetchedData = snapshot.docs.map(doc => doc.data());
                    setAkksessuarData(fetchedData);
                    console.log(fetchedData);
                    // console.log(fetchedData);
            
            
                  } catch (error) {
                    console.error('Error fetching data from Firestore:', error);
                  } finally{
                    setloading(false)
                  }
                };
                const fetchComputersData = async () => {
                    try {
                      const collectionRef = firestore.collection('noutboklar');
                      const snapshot  = await collectionRef.get();
                      const fetchedData = snapshot.docs.map(doc => doc.data());
                      setcomputersData(fetchedData);
                      console.log(fetchedData);
                      // console.log(fetchedData);
              
              
                    } catch (error) {
                      console.error('Error fetching data from Firestore:', error);
                    } finally{
                      setloading(false)
                    }
                  };
                fetchComputersData()
                fetchAkksessuarData();
            }

           
        } catch (error) {
            console.error('Error fetching data from Firestore:', error);
        } finally {
          setloading(false);
        }

      }



  return (
    <div>
        {/* searchbar */}
            <div className="md:mx-9 md:mt-9 sm:mx-6 sm:mt-6 mt-3 mx-3">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" id="searchbar" className="grow" placeholder="Search" onChange={((e)=>{Search(e.target.value)})}/>
                    <svg onClick={((e)=>{Search(document.getElementById('searchbar').value)})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
        {/* searchbar */}
        
        {/* all products */}
      {/* {computersData==' '?(<>Loading</>):(<></>)} */}
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
         
           
         
        ):(
          <div>
            <div className="md:mx-9 md:mt-9 sm:mx-6 sm:mt-6 mt-3 items-baseline mx-3 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 space-y-6 ">
             {computersData?(computersData.map((computer,i)=>{
                return(
                    
                              
                               <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto" key={i}>
                                  
                                <Link to={'/computer/'+computer.id} key={i}> 
                                  <figure><img className="" src={computer.asosiy_rasm} alt="Shoes" /></figure>
                                </Link>
                                  <div className="card-body">
                                <Link to={'/computer/'+computer.id} key={i}> 
                                      <h2 className="card-title">{computer.nomi}</h2>
                                  </Link>
                                  <div className="card-actions justify-end">
                                  <div className="card-actions my-auto h-full">
                                      <div className="badge badge-outline h-full">{computer.narxi}</div> 
                                      
                                  </div>
                                      <Link to={'/order/computer/'+String(computer.id)}><button  className="btn btn-primary">Buyurtma berish</button></Link>
                                      <Link to={'/edit/computer/'+String(computer.id)}><button  className="btn btn-ghost bg-yellow-600 text-white">O'zgartirish</button></Link>

                                      </div>
                                  </div>

                                  
                              </div>
                               
                            )})):(<></>)}   
                            
                           

                            {Akksessuardata?(Akksessuardata.map((other,i)=>{
                           return(
                            
                            <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto" key={i}>

                                    <Link to={'/other/'+other.id} key={i}> 
                                    <figure><img className="" src={other.rasmi} alt="Shoes" /></figure>
                                    </Link>

                                    <div className="card-body">
                                      <Link to={'/other/'+other.id} key={i}> 
                                              <h2 className="card-title">{other.nomi}</h2>
                                              <p>{other.tavsifi}</p>
                                    </Link>                          
                                    <div className="card-actions justify-end">
                                    <div className="card-actions my-auto h-full">
                                        <div className="badge badge-outline h-full">{other.narxi}</div> 
                                        
                                    </div>
                                        <Link to={'/order/others/'+String(other.id)}><button  className="btn btn-primary">Buyurtma berish</button></Link>
                                        <Link to={'/edit/others/'+String(other.id)}><button  className="btn btn-ghost bg-yellow-600 text-white">O'zgartirish</button></Link>
                                        
                                        </div>
                                    </div>
                            </div>
                               
                            )})):(<></>)} 
                    
          </div>
        </div>
        )}
           

            
        {/* all products */}







    </div>
  )
}
