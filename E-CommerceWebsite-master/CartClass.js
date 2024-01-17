class Cart {
    #products;

    constructor() {
        let products = localStorage.getItem("cart");
        this.#products = products ? JSON.parse(products) : [];
    }

    getTotalPrice() {
        return this.#products.reduce((acc, productItem) => {
            return productItem.product.price * productItem.quantity + acc;
        }, 0);
    }

    get products() {
        return this.#products;
    }

    addToCart(product) {
        for (let i = 0; i < this.#products.length; i++) {
            if (this.#products[i].product.id == product.id) {
                this.#products[i].quantity++;
                this.#save();
                return;
            }
        }
        this.#products.push({
            "product": product,
            "quantity": 1
        });
        this.#save();
    }

    clearCart () {
        this.#products = [];
        this.#save();
    }

    getCartSize() {
        console.log("size", this.#products)
        return this.#products.reduce((size, product) => { return size + product.quantity }, 0);
    }

    #save() {
        localStorage.setItem("cart", JSON.stringify(this.#products));
    }

    toJSON(){
        return {
            products: this.#products
        };
    }
}

export default Cart;