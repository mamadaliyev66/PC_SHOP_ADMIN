
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";

export default function Others() {
  const [Akksessuardata,setAkksessuarData]=useState()
    const [results,setResults]=useState()
    const [searchTerm, setSearchTerm] = useState("");

    const [loading,setloading]=useState(true)
    const [searchbar,setsearchbar]=useState()
    useEffect(() => {
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
        
        fetchAkksessuarData();
    
    
      }, []);


      const Search=async(e)=>{
        const searchPhrase = e
        setSearchTerm(searchPhrase);
        console.log(e);

        try {
            setloading(true);
            let fetchedAkksessuarData = [];

            if (searchPhrase) {  
              Akksessuardata.map((aks,i)=>{
                if(aks.nomi.toLowerCase().includes(searchPhrase.toLowerCase())){
                  fetchedAkksessuarData.push(aks)
                }})
               
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
              <Link to={'/add/other'}><div className="btn btn-ghost bg-primary hover:bg-blue-600 w-full my-3   md:my-9  text-primary-content">Yangi Qo'shish</div></Link>

            </div>

            {/* /add/other */}
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
            <div className="md:mx-9 md:mt-9 sm:mx-6 sm:mt-6 mt-3 mx-3 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 space-y-6 ">
             
                           

                            {Akksessuardata?(Akksessuardata.map((other,i)=>{
                           return(
                            
                            <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto" key={i}>

                                    <Link to={'/other/'+other.id} key={i}> <figure><img className="" src={other.rasmi} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{other.nomi}</h2>
                                   <p>{other.tavsifi}</p>
                                        
                                    <div className="card-actions justify-end">
                                    <div className="card-actions my-auto h-full">
                                        <div className="badge badge-outline h-full">{other.narxi}</div> 
                                        
                                    </div>
                                    <Link to={'/order/others/'+String(other.id)}><button  className="btn btn-primary">Buyurtma berish</button></Link>
                                    <Link to={'/edit/computer/'+String(other.id)}><button  className="btn btn-ghost bg-yellow-600 text-white">O'zgartirish</button></Link>


                                        </div>
                                    </div>
                                    </Link>
                            </div>
                               
                            )})):(<></>)} 
                    
          </div>
        </div>
        )}
           

            
        {/* all products */}







    </div>
  )
}
