import { useState } from "react";
import CathegoryList from "./functions/CathegoryList";
import ProductList from "./functions/ProductList";

const HomePage = () => {
    const [cathegory, setCathegory] = useState([
        {name: 'Action', id:1},
        {name: 'Shooter', id:2},
        {name: 'Story', id:3},
        {name: 'Simulation', id:4},
        {name: 'Adventure', id:5},
        {name: 'Racing', id:6},
        {name: 'Puzzle', id:7},
    ])
    return (
        <div className="homePage-container">
            <div className = "homePage">
                <CathegoryList cathegories = {cathegory} title = "All cathegories"/>
            </div>
            <div className = "recommendedGames">
                <ProductList/>
            </div>
        </div>
    );
    
}

export default HomePage;