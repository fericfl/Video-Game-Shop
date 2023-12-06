import {Link} from 'react-router-dom'
import GetCurrentUser from './GetCurrentUser';
import React, { useEffect, useState } from "react";
import {query, getDocs, collection, orderBy, doc, deleteDoc,where} from "firebase/firestore";
import {db} from "./firebase"; // Import your Firebase configuration
import AddCategory from './AddCategory';
import { useHistory } from 'react-router-dom';

const CathegoryList = ({title}) => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    const loggeduser = GetCurrentUser();

    const [inputCategory, setInputCategory] = useState('');

    const fetchCategories = async () => {
        const categoryRef = collection(db, "categories");
        const q = query(categoryRef, orderBy("name")); // Sort categories alphabetically by name
    
        try {
          const querySnapshot = await getDocs(q);
          const categoriesData = querySnapshot.docs.map((doc) => doc.data());
          setCategories(categoriesData);
        } catch (error) {
          console.error("Error fetching categories: ", error);
        }
      };
    
      useEffect(() => {
        console.log("fetching cat");
        fetchCategories();
      }, []);

      const handleChooseCategory = (name) => {
        console.log(name);
        // Perform any necessary actions (e.g., form validation, data submission)
    
        // Navigate to a different page or component with the form data as state
        history.push({
          pathname: `/category/${name.toLowerCase()}`,
          state: { name }
        });
      };
    const handleAddCategory = (e) => {
        e.preventDefault();
        console.log(inputCategory);
        AddCategory({ category: inputCategory }); // Assuming your AddCategory function accepts an object with a 'name' property
        setInputCategory(''); // Clear the input field after adding the category
        fetchCategories();

    };
    const handleDeleteCategory = async (category) => {
        try {
          const q = query(collection(db, "categories"), where("name", "==", category.name));
          const querySnapshot = await getDocs(q);
      
          // Assuming there is only one category with the given name
          if (querySnapshot.size === 1) {
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(docToDelete.ref);
            console.log("Category deleted successfully");
            fetchCategories();

            // Optionally, you may want to refresh the category list or take other actions.
          } else {
            console.error("Error: Category not found or multiple categories with the same name");
          }
        } catch (error) {
          console.error("Error deleting category: ", error);
        }
      };
      
    return (  
        <div className="cathegory-list">
            <Link to="/games" className="cathegory-link">
              <h1 id="cathegory-title">{title}</h1>
            </Link>

            {categories.map((category) => (
            <div className="cathegory-preview" key={category.id}>
                <div className="cathegory-items-box">
                    <a className="cathegory-items" onClick={() => handleChooseCategory(category.name)}>
                        {category.name}
                        {loggeduser && loggeduser[0].email === "admin@email.com" ?
                        <button className='delete-button' onClick={() => handleDeleteCategory(category)}>🗑️</button> : <></>}
                    </a>
                
                </div>
            </div>
            ))}
            <div className="add-button">
                {loggeduser && loggeduser[0].email === "admin@email.com" ?
                    <form onSubmit={handleAddCategory}>
                        <input
                        className='input-category'
                        type="text"
                        name="item"
                        placeholder="Category name"
                        required
                        value={inputCategory}
                        onChange={(e) => setInputCategory(e.target.value)}
                        />
                        <button className='input-category-button' type="submit">Add category</button>
                </form>
                : <></>}
            </div>
        </div>
    );
}
 
export default CathegoryList;
