export default class Product {
    #id;
    #name;
    #description;
    #price;
    #images;

    constructor(id, name, description, price, images) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#images = images; 
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get price() {
        return this.#price;
    }

    get description() {
        return this.#description;
    }

    static async getAllProducts() {
        let url = 'https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/products';
        let response = await fetch(url);
        let products = await response.json();
        return products;
    }

    static async getProductById(id) {
        let url = 'https://659c067fd565feee2dac49a8.mockapi.io/shoplane/api/v1/products';
        let response = await fetch(url);
        let products = await response.json();
        return products.filter((products) => products.id == id)[0];
    }
}