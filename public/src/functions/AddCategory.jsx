import { where, query, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firebase configuration

const AddCategory = ({ category }) => {
  // Check if the category is already in the database
  console.log("the category is " + category);

  console.log("trying to add category");
  const categoryRef = collection(db, "categories");
  const q = query(categoryRef, where("name", "==", category));

  getDocs(q)
    .then((querySnapshot) => {
      // If the category is not in the database, add it
      if (querySnapshot.empty) {
        addDoc(categoryRef, {
          name: category, // Corrected property name to 'name'
        })
          .then(() => {
            console.log("added category");
          })
          .catch((error) => {
            console.error("Error adding category: ", error);
          });
      } else {
        alert("Category already exists");
      }
    })
    .catch((error) => {
      console.error("Error checking category existence: ", error);
    });
};

export default AddCategory;
