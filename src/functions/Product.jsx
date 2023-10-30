class Product{
    // constructor(description, genre, name, popularity, price, publisher){
    //     this.description = description;
    //     this.genre = genre;
    //     this.name = name;
    //     this.popularity = popularity;
    //     this.price = price;
    //     this.publisher = publisher;
    // }
    constructor(name, id){
             this.name = name;
             this.id = id;
     }
    toString(){
        return this.name + this.id;
    }
}

const productConverter = {
    toFirestore: (product) => {
        return {
            name: product.name,
            id: product.id
            // description: product.description,
            // genre: product.genre,
            // popularity: product.popularity,
            // price: product.price,
            // publisher: product.publisher
        };
    },
    fromFirestore: (snapshot, options) =>{
        const data = snapshot.data(options);
       // return new Product(data.name, data.description, data.genre, data.popularity, data.price, data.publisher)
        return new Product(data.name, data.id)
    }
};

export default productConverter;