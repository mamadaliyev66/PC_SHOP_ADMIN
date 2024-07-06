import React from 'react'
import { useEffect } from 'react'


export default function NoPage() {
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
              },[])
  return (
    <div>

            <div className='mx-auto'>
                    <div>
                            <img className='mx-auto sm:mt-20 mt-9 transition-all ease-in-out duration-500' src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg" alt="" />
                    </div>
                    <div>
                        <h1 className='text-center md:text-3xl text-2xl transition-all ease-in-out duration-500 text-sky-600 font-bold'>404 Not Found</h1>
                        <h1 className='text-center md:text-4xl text-3xl transition-all ease-in-out duration-500 font-semibold mt-3'>Whoops! That page doesn’t exist.</h1>
                    </div>
            </div>        
            
    </div>
  )
}
