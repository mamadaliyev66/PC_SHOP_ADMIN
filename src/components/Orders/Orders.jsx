
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc,Timestamp } from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";
import { categorizeOrderDate } from "./dateCategory";
import { deleteDoc } from "firebase/firestore";

import darkicon from '../../assets/icons8-date-64.png'
import lighticon from '../../assets/time.png'
import trash from '../../assets/icons8-trash-30.png'
import done from '../../assets/icons8-done-50.png'
import cross from '../../assets/icons8-cross-30.png'
export default function Orders() {
    const [loading,setloading]=useState(true)
    const [orderedProduct,setOrderedProduct]=useState()
    const [orders,SetOrders]=useState()
    const [computersData,setComputersData]=useState()
    const [Akksessuardata,setAkksessuarData]=useState()
    const [isNew,setIsNew]=useState(true)
    const [isFinished,setIsFinished]=useState(false)
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
        const fetchOrdersData = async () => {
            try {
              const collectionRef = firestore.collection('orders').where('finished','==','false').orderBy('date', 'desc');
              const snapshot  = await collectionRef.get();
              const fetchedData = snapshot.docs.map(doc =>  ({
                docID: doc.id,
                ...doc.data()
              }));
              SetOrders(fetchedData);
              console.log(fetchedData);
              // console.log(fetchedData);
      
      
            } catch (error) {
              console.error('Error fetching data from Firestore:', error);
            } finally{
              setloading(false)
            }
          };
        fetchOrdersData()
        

        const fetchComputersData = async () => {
          try {
            const collectionRef = firestore.collection('noutboklar');
            const snapshot  = await collectionRef.get();
            const fetchedData = snapshot.docs.map(doc => doc.data());
            setComputersData(fetchedData);
            console.log(fetchedData);
            // console.log(fetchedData);
    
    
          } catch (error) {
            console.error('Error fetching data from Firestore:', error);
          } finally{
            setloading(false)
          }
        };
      fetchComputersData()
      
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
    fetchAkksessuarData()
    

  
    
      }, []);

     

    const getNewOrders = async () => {
      if (isFinished==true && isNew==false) {
        setIsNew(true)
        setIsFinished(false)
        const fetchOrdersData = async () => {
          try {
            const collectionRef = firestore.collection('orders').where('finished','==','false').orderBy('date', 'desc');
            const snapshot  = await collectionRef.get();
            const fetchedData = snapshot.docs.map(doc =>  ({
              docID: doc.id,
              ...doc.data()
            }));
            SetOrders(fetchedData);
            console.log(fetchedData);
            // console.log(fetchedData);
    
    
          } catch (error) {
            console.error('Error fetching data from Firestore:', error);
          } finally{
            setloading(false)
          }
        };
      fetchOrdersData()
      

      const fetchComputersData = async () => {
        try {
          const collectionRef = firestore.collection('noutboklar');
          const snapshot  = await collectionRef.get();
          const fetchedData = snapshot.docs.map(doc => doc.data());
          setComputersData(fetchedData);
          console.log(fetchedData);
          // console.log(fetchedData);
  
  
        } catch (error) {
          console.error('Error fetching data from Firestore:', error);
        } finally{
          setloading(false)
        }
      };
    fetchComputersData()
    
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
  fetchAkksessuarData()
  
      }
    }

    const getFinishedOrders = async () => {
      if (isNew==true && isFinished==false) {
        setIsNew(false)
        setIsFinished(true)

// 

const fetchOrdersData = async () => {
  try {
    const collectionRef = firestore.collection('orders').where('finished','==','true').orderBy('date', 'desc');
    const snapshot  = await collectionRef.get();
    const fetchedData = snapshot.docs.map(doc =>  ({
      docID: doc.id,
      ...doc.data()
    }));
    SetOrders(fetchedData);
    console.log(fetchedData);
    // console.log(fetchedData);


  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  } finally{
    setloading(false)
  }
};
fetchOrdersData()


const fetchComputersData = async () => {
try {
  const collectionRef = firestore.collection('noutboklar');
  const snapshot  = await collectionRef.get();
  const fetchedData = snapshot.docs.map(doc => doc.data());
  setComputersData(fetchedData);
  console.log(fetchedData);
  // console.log(fetchedData);


} catch (error) {
  console.error('Error fetching data from Firestore:', error);
} finally{
  setloading(false)
}
};
fetchComputersData()

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
fetchAkksessuarData()

// 
      }
    }

    const Search=async(e)=>{
      const Item =e
      let fetchedOrdersData = [];
      
      try {
              setloading(true)
             if (e) {
              orders.map((order,i)=>{
                console.log(order);
                if(order.order_person.toLowerCase().includes(e.toLowerCase())){
                  fetchedOrdersData.push(order)
                }})
                SetOrders(fetchedOrdersData)
             }else{
              const fetchOrdersData = async () => {
                
                const collectionRef = firestore.collection('orders').where('finished','==',isNew).orderBy('date', 'desc');
                const snapshot  = await collectionRef.get();
                const fetchedData = snapshot.docs.map(doc =>  ({
                  docID: doc.id,
                  ...doc.data()
                }));
                SetOrders(fetchedData);

            }

             fetchOrdersData()
            }
             
      

            } catch (error) {
              console.error('Error fetching data from Firestore:', error);
            } finally{
              setloading(false)
            }
          
    }


    const sortByDate=async(data)=>{
      try {
        const collectionRef = firestore.collection('orders').where('finished','==',String(!isNew)).orderBy('date', 'desc');
        const snapshot  = await collectionRef.get();
        const fetchedData = snapshot.docs.map(doc => doc.data());
      
         let fetchedOrdersData = [];

        fetchedData.map((order,i)=>{
            console.log(data);
            const a = categorizeOrderDate(order.date)
            if(a==data){
              fetchedOrdersData.push(order)
            }
            // fetchedOrdersData.push(order)
                
            console.log(a);
          })
          SetOrders(fetchedOrdersData)
        } catch (error) {
          console.log(error);
        }
    } 

    const deleteDocument = async (docId) => {
      try {
        
        const docRef = doc(firestore, 'orders', docId);
        await deleteDoc(docRef);
        if (isNew==true) {
          getFinishedOrders()
        }else{
          getNewOrders()
        }
        console.log(`Document with ID ${docId} deleted successfully.`);
        SetOrders((prevOrders) => prevOrders.filter(order => order.id !== docId)); // Update the state to remove the deleted order
        alert('Order deleted successfully ! ! ! ')
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    };

    const markOrderAsFinished = async (docId) => {
      try {
        const docRef = firestore.collection('orders').doc(docId);
        await docRef.update({ finished: 'true' });
        console.log(`Document with ID ${docId} marked as finished.`);
        // Update the state to reflect the change
        if (isNew==true) {
          getFinishedOrders()
        }else{
          getNewOrders()
        }
        alert('Order marked as finished !')
        SetOrders((prevOrders) => 
          prevOrders.map(order => 
            order.id === docId ? { ...order, finished: 'true' } : order
          )
        );
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
    const markOrderAsUnFinished = async (docId) => {
      try {
        const docRef = firestore.collection('orders').doc(docId);
        await docRef.update({ finished: 'false' });
        console.log(`Document with ID ${docId} marked as finished.`);
        // Update the state to reflect the change
        alert('Order marked as unfinished !')
        if (isNew==true) {
          getFinishedOrders()
        }else{
          getNewOrders()
        }
        SetOrders((prevOrders) => 
          prevOrders.map(order => 
            order.id === docId ? { ...order, finished: 'false' } : order
          )
        );
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
  
  return (
    <div>

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
           <div className="grid grid-cols-2 text-center mt-9 mb-9 ">

              <div onClick={(()=>{getNewOrders()})} className={isNew?("cursor-pointer hover:border-b-8 transition-all duration-300 ease-in-out border-info border-b-2"):("cursor-pointer hover:border-b-8 transition-all duration-300 ease-in-out ")}>
                    Yangilar 
              </div>
              <div onClick={(()=>{getFinishedOrders()})} className={isFinished?("cursor-pointer hover:border-b-8 transition-all duration-300 ease-in-out border-info border-b-2"):("cursor-pointer hover:border-b-8 transition-all duration-300 ease-in-out ")}>
                    Tugallanganlar
              </div>
                  {/* searchbar */}
            <div className="md:mx-9 md:mt-9 sm:mx-6 sm:mt-6 mt-3 mx-3 col-span-2 ">
                <label className="input input-bordered flex items-center gap-2"> Buyurtachini qidirish:
                    <input type="text" id="searchbar" className="grow" placeholder="Search" onChange={((e)=>{Search(e.target.value)})}/>
                    <svg onClick={((e)=>{Search(document.getElementById('searchbar').value)})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
        {/* searchbar */}
        <div className="col-span-2 font-bold my-3  grid grid-cols-2">
          <div className="">Sanasi bo'yicha filter:</div>
          <div>
          <details className="dropdown">
          <summary className="m-1 btn">
            { window.document.getElementById('12312').getAttribute('data-theme')=='black'?(<img src={darkicon} className="w-6" alt=".." />):(<img src={lighticon} className="w-6" alt=".." />)}
            
            Sanani Tanlash</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li onClick={(()=>{sortByDate('Bugun')})}><a>Bugun</a></li>
            <li onClick={(()=>{sortByDate('Kecha')})}><a>Kecha</a></li>
            <li onClick={(()=>{sortByDate('Shu hafta ichida')})}><a>Shu haftada</a></li>
            <li onClick={(()=>{sortByDate('O`tkan haftada')})}><a>O'tgan haftada</a></li>
            <li onClick={(()=>{sortByDate('Shu oyda')})}><a>Shu oyda</a></li>
            <li onClick={(()=>{sortByDate('Older')})}><a>1 oy oldin</a></li>
         
          </ul>
        </details>
          </div>
        </div>
        
           </div>
           <hr />
           <div className="overflow-x-auto w-3/4 mx-auto mt-9">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Rasmi/Nomi</th>
                    <th>Buyurtmachi</th>
                    <th>Telefon Raqami/@Telegram</th>
                    <th>Viloyat/Tuman</th>
                    <th>Buyurtma Sanasi</th>
                    <th></th>
                    <th>O'zgartirish</th>
                  </tr>
                </thead>
                <tbody>
           {orders?(orders.map((order,i)=>{
            let  orderDate=''

            if (order.date instanceof Timestamp) {
              console.log(order.date.toDate())
              orderDate=String(order.date.toDate())
            } else {
              console.warn("Provided value is not a Firestore Timestamp");
              
            }

            // console.log(order.date);
            let tempProduct ={}
           
            console.log(tempProduct);
            return(
                    
              
                <tr className="hover">
             
              
                      <th>{i+1}</th>
                            {
                        order.order_ctg=='noutboklar'?(
                        computersData?.map((comp,i)=>{
                          if (comp.id==order.order_id) {
                            return(
                              
                              <td className="align-baseline w-96">
                                     <Link to={'/computer/'+comp.id} ><td><img className="sm:w-56 w-16" src={comp.asosiy_rasm} alt=""/></td></Link>
                                     <Link to={'/computer/'+comp.id} className="justify-center self-baseline font-bold" >  <td>{comp.nomi}</td>  </Link>
                              </td>
                              
                            )
                          }
                        })):(
                          Akksessuardata?.map((akks,i)=>{
                            if (akks.id==order.order_id) {
                              return(
                                
                                <td className="align-baseline">
                                       <Link to={'/other/'+akks.id} ><td><img className="sm:w-56 w-16" src={akks.rasmi} alt=""/></td></Link>
                                       <Link to={'/other/'+akks.id} className="justify-center self-baseline font-bold" >  <td>{akks.nomi}</td>  </Link>
                                </td>
                                
                              )
                            }
                          })
                        )

                      }

                      <td>{order.order_person}</td>
                      <td>{order.phone_number}/ <span className="btn btn-ghost">{order.telegram}</span></td>
                      <td>{order.viloyat}/ <span>{order.tuman}</span></td>
                      <td>{orderDate}</td>
                      <td>{categorizeOrderDate(order.date)}</td>
                        {order.finished=='false'?(
                      <td className="space-y-2">

                          <div onClick={(()=>{
                            deleteDocument(order.docID)
                          })} title="O'chirib yuborish" className="btn btn-ghost bg-rose-600 hover:bg-red-950"><img className="w-6" src={trash} alt="" /></div>
                          <div onClick={(()=>{markOrderAsFinished(order.docID)})} title="Buyurtmani Yakunlash" className="btn btn-ghost bg-success "><img className="w-6" src={done} alt="" /></div>
                      </td>
                        
                        ):(<td className="space-y-2">
                          <div onClick={(()=>{
                            deleteDocument(order.docID)
                          })} title="O'chirib yuborish" className="btn btn-ghost bg-rose-600 hover:bg-red-950"><img className="w-6" src={trash} alt="" /></div>
                          <div onClick={(()=>{markOrderAsUnFinished(order.docID)})} title="Buyurtmani tugallanmagan deb belgilash" className="btn btn-ghost bg-success "><img className="w-6" src={cross} alt="" /></div>

                        </td>)}
                </tr>
                               
                            )
                            })):(<></>)}   
           </tbody>
  </table>
</div>
        </div>
        )}
           


    </div>
  )
}
