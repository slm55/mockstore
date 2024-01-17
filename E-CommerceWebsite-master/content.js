import Product from "./Product.js";
import Cart from "./CartClass.js";
// console.clear();

let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "./contentDetails.html?id=" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("rs  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

Product.getAllProducts().then((products) => {
  console.log(products);
  addProductCards(products);
});

function addProductCards(products) {
  let cart = new Cart();
  if (cart.getCartSize() > 0) {
    document.getElementById("badge").innerHTML = cart.getCartSize();
  }
  for (let i = 0; i < products.length; i++) {
    if (products[i].isAccessory) {
      containerAccessories.appendChild(dynamicClothingSection(products[i]));
    } else {
      containerClothing.appendChild(dynamicClothingSection(products[i]));
    }
  }
}
