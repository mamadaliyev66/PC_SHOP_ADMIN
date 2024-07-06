import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'


export default function Other() {
    const id = useParams('id').id;
    const [Akksessuardata,setAkksessuarData]=useState()
    const [loading,setloading]=useState(true)

    useEffect(() => {
        const fetchAkksessuarData = async () => {
            try {
              const collectionRef = firestore.collection('aksessuarlar').where('id','==',id);
              const snapshot  = await collectionRef.get();
              const fetchedData = snapshot.docs.map(doc => doc.data());
              setAkksessuarData(fetchedData);
              console.log(fetchedData);
              // console.log(fetchedData);
      
      
            } catch (error) {
              console.error('Error fetching data from Firestore:', error);
            }finally{
                setloading(false)
            }
          };
          fetchAkksessuarData()
    
      }, []);
  return (
    <div>
       {loading?(<>
            <div className="text-center items-center md:mt-[25%] mt-[50%]">
                <span className="loading loading-dots loading-lg bg-primary  md:w-16 "></span>
            </div>
        </>):(
          <div>
 {Akksessuardata?(Akksessuardata.map((other,i)=>{
                return(
                    
                              
                              <div className="hero min-h-screen my-16" key={i}>
                            <div className="hero-content flex-col lg:flex-row">
                            <img src={other.rasmi} className="max-w-sm rounded-lg shadow-2xl" />

                                
                                <div className="">
                                    <h1 className="text-5xl font-bold">{other.nomi}</h1>
                                  
                                    <p className="py-6"><span className="mx-1">Qo'shimcha malumotlar </span>: <span className="mx-1">{other.tavsifi}</span></p>
                                   
                                    <div className="card-actions ">
                                        <div className="card-actions my-auto h-full">
                                            <div className="badge badge-outline h-full">Hozirda mavjud: {other.mavjud}</div>  
                                            <div className="badge badge-outline h-full">Narxi: {other.narxi}</div>  
                                        </div>
                                        <Link to={'/order/others/'+String(other.id)}><button  className="btn btn-primary">Buyurtma berish</button></Link>
                                        <Link to={'/edit/others/'+String(other.id)}><button  className="btn btn-ghost bg-yellow-600 text-white">O'zgartirish</button></Link>
                                        <Link to={'/delete/others/'+String(other.id)}><button  className="btn btn-ghost bg-rose-600 text-white">O'chirish</button></Link>


                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                        
                               
                            )})):(<></>)}   
          </div>
         )}
       
        {/* {id} */}
         
    </div>
  )
}
