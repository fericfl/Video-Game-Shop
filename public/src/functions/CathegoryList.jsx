import { useState } from "react";

const CathegoryList = ({title}) => {
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
        <div className="cathegory-list">
            <h1 id="cathegory-title"> {title} </h1>

            {cathegory.map((cathegory) => (
                <div className="cathegory-preview" key={cathegory.id}>
                    <div className="cathegory-items-box">
                        <a className="cathegory-items" href={`/games-${cathegory.name.toLowerCase()}`}>{cathegory.name}</a>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default CathegoryList;
