import { useState } from "react";
import CathegoryList from "./functions/CathegoryList";
import ProductList from "./functions/ProductList";

const HomePage = () => {
    return (
        <div className="Product-page-container">
                <CathegoryList title = "All Categories"/>
        </div>
    );
    
}

export default HomePage;