import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt} from 'firebase/firestore';
import {db, auth} from "./firebase"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

function GetCurrentUser(){
    const [user, setUser] = useState("");
    const authInstance = getAuth();
      onAuthStateChanged(authInstance, (userlogged) => {
        if(userlogged){
          setUser(userlogged);
        }else {
          setUser(null);
        }
      })
    return user;
  }

  export default GetCurrentUser;