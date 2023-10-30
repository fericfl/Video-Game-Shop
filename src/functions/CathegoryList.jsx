const CathegoryList = ({cathegories, title}) => {
    return (  
        <div className="cathegory-list">
            <h1 id="cathegory-title"> {title} </h1>

            {cathegories.map((cathegory) => (
                <div className="cathegory-preview" key={cathegory.id}>
                    <h2>
                        {cathegory.name}
                    </h2>
                </div>
            ))}
        </div>
    );
}
 
export default CathegoryList;