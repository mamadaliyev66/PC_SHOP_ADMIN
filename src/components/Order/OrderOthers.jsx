import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";
import { db ,firestore} from "../../config/firebase";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'


export default function OrderOthers() {
    const id= useParams('id').id;

    const [Akksessuardata,setAkksessuarData]=useState()
    const [loading,setloading]=useState(true)

    const [fullName,setFullName]=useState()
    const [phoneNumber,setPhoneNumber]=useState()
    const [telegram,setTelegram]=useState()
    const [viloyat,setViloyat]=useState()
    const [tuman,setTuman]=useState()
    const [success,setSuccess]=useState('alert alert-success absolute z-40 top-[10%] sm:w-[25%] sm:left-[40%] hidden')

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


      const setOrder=async (e) => {
        e.preventDefault()
        try {
          const collectionRef = firestore.collection('orders');
          const newDocRef = doc(collectionRef); // Creates a new document reference with an auto-generated ID
          const docId = newDocRef.id; // Get the generated ID
          const docRef = await collectionRef.add({
            order_person:fullName,
            phone_number:phoneNumber,
            telegram:telegram,
            viloyat:viloyat,
            tuman:tuman,
            date: new Date(),
            order_ctg:'aksessuarlar',
            order_id:id,
            id:docId,
            finished:'false'

          });
          setFullName('')
          setPhoneNumber('')
          setTelegram('')
          setViloyat('')
          setTuman('')
          try {
            setSuccess("alert alert-success absolute z-40 top-[10%] sm:w-[25%] sm:left-[40%]")
            setTimeout(() => {
              setSuccess("alert alert-success absolute z-40 top-[10%] sm:w-[25%] sm:left-[40%] hidden")
            }, 5000);
            
          } catch (error) {
            
          }
        } catch (error) {
          console.error('Error adding document: ', error);
          alert('Something went wrong! Please Try again later !')
          window.location.href='/'
        }
      }

     
    return (
      <>
      <div role="alert " className={success} >
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Your purchase has been confirmed!</span>
      </div>
    <div className="md:flex ">


{loading?(<>
            <div className="text-center items-center md:mt-[25%] mt-[50%]">
                <span className="loading loading-dots loading-lg bg-primary  md:w-16 "></span>
            </div>
        </>):(
          <div className="w-full mt-9 sm:px-9 px-2 ">
 {Akksessuardata?(Akksessuardata.map((other,i)=>{
                return(
                    
                              
                  <div className="collapse collapse-arrow bg-base-200  " key={i}>
                  <input type="checkbox" className="peer" /> 
                  <div className="collapse-title bg-primary text-center  text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex items-center">
                  <img src={other.rasmi} className="max-w-sm sm:block hidden rounded-lg shadow-2xl w-20" />

                    <div className="mx-auto sm:text-xl">{other.nomi}</div>
                    
                  </div>
                 
                  <div className="collapse-content bg-primar  light:peer-checked:border text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                  <p className="py-6"><span className="mx-1">Qo'shimcha malumotlar </span>: <span className="mx-1">{other.tavsifi}</span></p>
                  <p className="py-6"><span className="mx-1">Narxi </span>: <span className="mx-1">{other.narxi}</span></p>
                  <img src={other.rasmi} className="max-w-sm sm:hidden block rounded-lg shadow-2xl w-32" />


                  </div>
                </div>
                
                        
                               
                            )})):(<></>)}   
          </div>
         )}

{/* <hr className="my-3 h-3"/> */}
<div className="hero w-full mt-9">
  <div className="hero-content  w-full ">
    
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={setOrder}>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Ism va Familya:</span>
          </label>
          <input onChange={((e)=>{setFullName(e.target.value)})} type="text" placeholder="Ism Familya" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Telefon raqam (To'liq: +998 01 234 56 78):</span>
          </label>
          <input onChange={((e)=>{setPhoneNumber(e.target.value)})} type="text" placeholder="+998 9X XXX XX XX" className="input input-bordered" required />
          
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Telegram (foydalanuvchi nomingiz yoki telefon raqamingiz):</span>
          </label>
          <input onChange={((e)=>{setTelegram(e.target.value)})} type="text" placeholder="@telegram yoki +998 9X XXX XX XX" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Viloyat:</span>
          </label>
          <input onChange={((e)=>{setViloyat(e.target.value)})} type="text" placeholder="e.x : Far'gona" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Tuman yoki Shahr:</span>
          </label>
          <input onChange={((e)=>{setTuman(e.target.value)})} type="text" placeholder="e.x : Rishton tumani" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Buyurtma berish</button>
        </div>
      </form>
    </div>
  </div>
</div>



    </div>
    </>
  )
}
