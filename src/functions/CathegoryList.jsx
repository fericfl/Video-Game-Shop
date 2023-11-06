const CathegoryList = ({cathegories, title}) => {
    return (  
        <div className="cathegory-list">
            <h1 id="cathegory-title"> {title} </h1>

            {cathegories.map((cathegory) => (
                <div className="cathegory-preview" key={cathegory.id}>
                    <div className="cathegory-items-box">
                        <a className="cathegory-items" href={`/${cathegory.name}`}>{cathegory.name}</a>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default CathegoryList;
