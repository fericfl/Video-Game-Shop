import { useState } from "react";
import CathegoryList from "./functions/CathegoryList";

const HomePage = () => {
    const [cathegory, setCathegory] = useState([
        {name: 'Action', id:1},
        {name: 'Strategy', id:2},
        {name: 'RPG', id:3},
        {name: 'Simulation', id:4},
        {name: 'Horror', id:5},
        {name: 'Racing', id:6},
        {name: 'Multiplayer', id:7},
    ])
    return (
        <div className = "homePage">
            <CathegoryList cathegories = {cathegory} title = "All cathegories"/>
        </div>
    );
    
}

export default HomePage;