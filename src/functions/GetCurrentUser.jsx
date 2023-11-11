import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt} from 'firebase/firestore';
import {db, auth} from "./firebase"; 

function GetCurrentUser(){
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      // Call the fetchProducts function when the component mounts
      auth.onAuthStateChanged(userlogged => {
        if(userlogged){
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
          };
          getUsers();
        }else {
          setUser(null);
        }
      })
      }, [])
      return user;
  }

  export default GetCurrentUser;