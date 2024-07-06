import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db,firebase,firestore } from "../../../config/firebase"; // Adjust the import if necessary
import { useParams } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../config/firebase";
export default function EditOthers() {
    const id = useParams('id').id;
    const [nomi,setNomi] = useState('')
    const [description,setDescription] = useState('')
    const [available,setAvailable] = useState('')
    const [price,setPrice] = useState('')
    const [success,setSuccess]=useState('alert alert-success absolute z-40 top-[10%] sm:w-[25%] sm:left-[40%] hidden')


    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

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
    const handleImageChange = (e) => {  
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
          handleUpload()
        }
      }; const handleUpload = () => {
        if (!image) return;
    
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: Monitor upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Upload error:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setUrl(downloadURL);
            });
          }
        );
  
  
      };




      

    const setNewItem=async () => {
      handleUpload()
      if (url) {
        try {
            const collectionRef = firestore.collection('aksessuarlar').where('id','==',id);
        const snapshot  = await collectionRef.get();
        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            await updateDoc(docRef, {
              rasmi:url,
              nomi: nomi,
              narxi:price,
              mavjud:available,
              tavsifi:description,
              });
            console.log("Document successfully updated!");
        }
        
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
            // window.location.href='/'
          }finally{
            window.location.href='/computers'

          }
    }else{
        alert("Iltimos Hamma Kerakli Ma'lumotlarni to'ldiring")
    }
      



    }



  return (
    <div> 
         <div>
            <div role="alert " className={success} >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Your purchase has been confirmed!</span>
            </div>
            <div className='mx-auto md:mx-9  my-9 space-y-6'>

                        <div className=" transition-all grid md:grid-cols-3 grid-cols-1 space-y-6  ease-in-out duration-300">
                        Rasmi: 
                        <input onChange={handleImageChange} type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
                        <div><img className='w-32 mx-auto' src={url} alt="" /></div>
                        </div>
                        
                        <label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
                          Nomi:
                          <input onChange={((e)=>{setNomi(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="......" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
                          Narxi:
                        <input onChange={((e)=>{setPrice(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="50$ // 550.000 so'm " />
                      </label>
                      <label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
                          Tavfsifi:
                        <input onChange={((e)=>{setDescription(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="Simli USB o'yin klaviaturasi va sichqonchasi RGB VIPBEN" />
                      </label>
                      <label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
                          Mavjud:
                        <input onChange={((e)=>{setAvailable(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="1" />
                      </label>

            </div>

        </div>
    
    <div>


<button  className='btn btn-square w-full my-6 bg-primary text-primary-content hover:bg-blue-600 transition-all ease-in-out duration-300' onClick={(()=>{setNewItem()})}>Qo'shish</button>





</div>

    </div>
   
  )
}
