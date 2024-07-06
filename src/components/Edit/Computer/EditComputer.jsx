import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db,firebase,firestore } from "../../../config/firebase"; // Adjust the import if necessary
import { useParams } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../config/firebase";
export default function EditComputer() {
    const { id } = useParams();

    const [computersData, setComputersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        asosiy_rasm: '',
        r1: '',
        r2: '',
        r3: '',
        r4: '',
        nomi: '',
        narxi: '',
        motherboard: '',
        mavjud: '',
        gpu: '',
        cpu: '',
        display: '',
        description: '',
        ram: '',
        rangi: '',
        xotira: '',
        yil: ''
    });
    const [nomi,setNomi]=useState('')
    const [cpu,setCpu]=useState('')
    const [gpu,setGpu]=useState('')
    const [ram,setRam]=useState('')
    const [rangi,setRangi]=useState('')
    const [yili,setYili]=useState('')
    const [xotira,setXotira]=useState('')
    const [motherboard,setMotherboard]=useState('')
    const [display,setDisplay]=useState('')
    const [mavjud,setMavjud]=useState('')
    const [narxi,setNnarxi]=useState('')
    const [description,setDescription]=useState('')
    const [success,setSuccess]=useState('alert alert-success absolute z-40 top-[10%] sm:w-[25%] sm:left-[40%] hidden')


    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [url, setUrl] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const handleImageChange = (e) => {  
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
        handleUpload()
      }
    };const handleImageChange1 = (e) => {  
        if (e.target.files[0]) {
            setImage1(e.target.files[0]);
            handleUpload1()
        }
    };const handleImageChange2 = (e) => {  
        if (e.target.files[0]) {
            setImage2(e.target.files[0]);
            handleUpload2()
        }
    };const handleImageChange3 = (e) => {  
        if (e.target.files[0]) {
            setImage3(e.target.files[0]);
            handleUpload3()
        }
    };const handleImageChange4 = (e) => {  
        if (e.target.files[0]) {
            setImage4(e.target.files[0]);
            handleUpload4()
        }
    };const handleUpload = () => {
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


    };const handleUpload1= () => {
        if (!image1) return;
    
        const storageRef = ref(storage, `images/${image1.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image1);
    
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
              setUrl1(downloadURL);
            });
          }
        );
  
    };const handleUpload2 = () => {
        if (!image2) return;
    
        const storageRef = ref(storage, `images/${image2.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image2);
    
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
              setUrl2(downloadURL);
            });
          }
        );
  
        
    }; const handleUpload3 = () => {
        if (!image3) return;
    
        const storageRef = ref(storage, `images/${image3.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image3);
    
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
              setUrl3(downloadURL);
            });
          }
        );
  
        
    };const handleUpload4 = () => {
        if (!image4) return;
    
        const storageRef = ref(storage, `images/${image4.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image4);
    
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
              setUrl4(downloadURL);
            });
          }
        );
  
        
    };const uploadAllImages = () => {handleUpload();handleUpload1();handleUpload2();handleUpload3();handleUpload4();}

            
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
                
                setComputersData(fetchedData);
                setFormData(fetchedData); // Populate form data
                
            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComputersData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const collectionRef = firestore.collection('noutboklar').where('id','==',id);
    //         const snapshot  = await collectionRef.get();
    //         if (!snapshot.empty) {
    //             const docRef = snapshot.docs[0].ref;
    //             await updateDoc(docRef, formData);
    //             console.log("Document successfully updated!");
    //         }
    //     } catch (error) {
    //         console.error("Error updating document: ", error);
    //     }
    // };
    // if (loading) {
    //     return (
    //         <div className="text-center items-center md:mt-[25%] mt-[50%]">
    //             <span className="loading loading-dots loading-lg bg-primary md:w-16"></span>
    //         </div>
    //     );
    // }



    const setNewPC=async () => {
        uploadAllImages()
        if (true) {
            try {
                const collectionRef = firestore.collection('noutboklar').where('id','==',id);
            const snapshot  = await collectionRef.get();
            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;
                await updateDoc(docRef, {
                    asosiy_rasm:url,
                      r1:url1,
                      r2:url2,
                      r3:url3,
                      r4:url4,
                      nomi: nomi,
                      narxi:narxi,
                      motherboard:motherboard,
                      mavjud:mavjud,
                      gpu:gpu,
                      cpu:cpu,
                      display:display,
                      description:description,
                      ram:ram,
                      rangi:rangi,
                      xotira:xotira,
                      yil:yili
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
            <h1>Edit Computer</h1>
            <div role="alert " className={success} >
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Your purchase has been confirmed!</span>
    </div>
<div className='mx-auto md:mx-9  my-9 space-y-6'>

<div className=" transition-all grid md:grid-cols-3 grid-cols-1 space-y-6  ease-in-out duration-300">
Asosiy Rasmi: 
<input onChange={handleImageChange} type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
<div><img className='w-32 mx-auto' src={url} alt="" /></div>
</div>


<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Nomi:
  <input onChange={((e)=>{setNomi(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="HP Victus SSD 256Gb RAM 16GB Intel Core i5" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  CPU:
  <input onChange={((e)=>{setCpu(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder=" Intel Core i5" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  GPU:
  <input onChange={((e)=>{setGpu(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="NVIDIA GeForce RTX 3050 4gb" />
</label>


<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  RAM:
  <input onChange={((e)=>{setRam(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="16GB" />
</label>


<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Rangi:
  <input onChange={((e)=>{setRangi(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="Qora" />
</label>



<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Yili:
  <input onChange={((e)=>{setYili(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="2023" />
</label>



<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Xotira:
  <input onChange={((e)=>{setXotira(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="256GB SSD" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Motherboard:
  <input onChange={((e)=>{setMotherboard(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="NEW M54836-601 For HP VICTUS 16-E DAG3MQMBAE0 Laptop Motherboard With AMD Ryzen 7 5800H RTX3050Ti GPU" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Display:
  <input onChange={((e)=>{setDisplay(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="144Hz" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Qo'shimcha Malumotlar:
  <input onChange={((e)=>{setDescription(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="144Hz" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Mavjud:
  <input onChange={((e)=>{setMavjud(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="10" />
</label>

<label className="input input-bordered flex items-center gap-2 transition-all ease-in-out duration-300">
  Narxi:
  <input onChange={((e)=>{setNnarxi(e.target.value)})} type="text" className="grow transition-all ease-in-out duration-300" placeholder="600$ || 6.000.000 som" />
</label>


<div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4'>
    <div className='mx-2 my-2'>
        1-Rasmi:<span className='mx-2'>  </span>
        <input onChange={handleImageChange1} type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
        <img className='w-32 mt-3 mx-auto' src={url1} alt="" />

    </div>

    <div className='mx-2 my-2'>
        2-Rasmi:<span className='mx-2'>  </span>
        <input onChange={handleImageChange2} type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
        <img className='w-32 mt-3 mx-auto' src={url2} alt="" />
    
    </div>

    <div className='mx-2 my-2'>
        3-Rasmi:<span className='mx-2'>  </span>
        <input onChange={handleImageChange3} type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
        <img className='w-32 mt-3 mx-auto' src={url3} alt="" />
  
    </div>

    <div className='mx-2 my-2'>
        4-Rasmi: <span className='mx-2'>  </span>
        <input onChange={handleImageChange4}  type="file" className="file-input  file-input-bordered file-input-info w-full max-w-xs transition-all ease-in-out duration-300" />
        <img className='w-32 mt-3 mx-auto' src={url4} alt="" />
    
    </div>
</div>


<button  className='btn btn-square w-full my-6 bg-primary text-primary-content hover:bg-blue-600 transition-all ease-in-out duration-300' onClick={(()=>{setNewPC()})}>Qo'shish</button>





</div>

        </div>
    );
}
