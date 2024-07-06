import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'



export default function Computer() {
    const id = useParams('id').id;
    const [computersData,setcomputersData]=useState()
    const [loading,setloading]=useState(true)

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
        const fetchComputersData = async () => {
            try {
              const collectionRef = firestore.collection('noutboklar').where('id','==',id);
              const snapshot  = await collectionRef.get();
              const fetchedData = snapshot.docs.map(doc => doc.data());
              setcomputersData(fetchedData);
              console.log(fetchedData);
              // console.log(fetchedData);
      
      
            } catch (error) {
              console.error('Error fetching data from Firestore:', error);
            }finally{
                setloading(false)
            }
          };
        fetchComputersData()
       
    
    
      }, []);
  return (
    
    <div>
        {loading?(<>
            <div className="text-center items-center md:mt-[25%] mt-[50%]">
                <span className="loading loading-dots loading-lg bg-primary  md:w-16 "></span>
            </div>
        </>):(
            <div>
                {computersData?(computersData.map((computer,i)=>{
                return(
                    
                              
                              <div className="hero min-h-screen my-16" key={i}>
                            <div className="hero-content flex-col lg:flex-row">

                                <div className="carousel w-full">
                                <div id="slide1" className="carousel-item relative w-full">
                                    <img src={computer.asosiy_rasm} className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a> 
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide1" className="carousel-item relative w-full">
                                    <img src={computer.r1} className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a> 
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide2" className="carousel-item relative w-full">
                                    <img src={computer.r2} className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" className="btn btn-circle">❮</a> 
                                    <a href="#slide3" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide3" className="carousel-item relative w-full">
                                    <img src={computer.r3} className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" className="btn btn-circle">❮</a> 
                                    <a href="#slide4" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide4" className="carousel-item relative w-full">
                                    <img src={computer.r4} className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide3" className="btn btn-circle">❮</a> 
                                    <a href="#slide1" className="btn btn-circle">❯</a>
                                    </div>
                                </div>
                                </div>
                                
                                <div className="">
                                    <h1 className="text-5xl font-bold">{computer.nomi}</h1>
                                    <p className="py-6"><span className="mx-1">CPU </span>: <span className="mx-1">{computer.cpu}</span></p>
                                    <p className="py-6"><span className="mx-1">GPU </span>: <span className="mx-1">{computer.gpu}</span></p>
                                    <p className="py-6"><span className="mx-1">Display </span>: <span className="mx-1">{computer.display}</span></p>
                                    <p className="py-6"><span className="mx-1">Plata </span>: <span className="mx-1">{computer.motherboard}</span></p>
                                    <p className="py-6"><span className="mx-1">RAM </span>: <span className="mx-1">{computer.ram}</span></p>
                                    <p className="py-6"><span className="mx-1">Xotira </span>: <span className="mx-1">{computer.xotira}</span></p>
                                    <p className="py-6"><span className="mx-1">Rangi </span>: <span className="mx-1">{computer.rangi}</span></p>
                                    <p className="py-6"><span className="mx-1">Yili </span>: <span className="mx-1">{computer.yil}</span></p>
                                    <p className="py-6"><span className="mx-1">Qo'shimcha malumotlar </span>: <span className="mx-1">{computer.description}</span></p>
                                   
                                    <div className="card-actions ">
                                        <div className="card-actions my-auto h-full">
                                            <div className="badge badge-outline h-full">Hozirda mavjud: {computer.mavjud}</div>  
                                            <div className="badge badge-outline h-full">Narxi: {computer.narxi}</div>  
                                        </div>
                                        <Link to={'/order/computer/'+String(computer.id)}><button  className="btn btn-primary">Buyurtma berish</button></Link>
                                        <Link to={'/edit/computer/'+String(computer.id)}><button  className="btn btn-ghost bg-yellow-600 text-white">O'zgartirish</button></Link>
                                        <Link to={'/delete/computer/'+String(computer.id)}><button  className="btn btn-ghost bg-rose-600 text-white">O'chirish</button></Link>

                                        
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
