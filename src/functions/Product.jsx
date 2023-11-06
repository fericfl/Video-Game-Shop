import { getStorage, ref, getDownloadURL} from "firebase/storage";
class Product{
     constructor(id, genre, name, popularity, price, publisher){
         this.genre = genre;
         this.name = name;
         this.popularity = popularity;
         this.price = price;
         this.publisher = publisher;
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
            id: product.id,
            // description: product.description,
            genre: product.genre,
            popularity: product.popularity,
            price: product.price,
            publisher: product.publisher
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Product(data.id, data.genre, data.name, data.popularity, data.price, data.publisher);
    }
};

export default productConverter;