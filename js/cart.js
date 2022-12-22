// Variables
let ShoppingCart = document.getElementById("showItem");
let label = document.getElementById("label");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("DSSP")) || [];

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("basket");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

let generateCartItems = () => {
    if (basket.length !== 0) {
      return (ShoppingCart.innerHTML = basket
        .map((x) => {
          let {id} = x;
          let search = SanPham.find((x) => x.id === id) || [];
          let { img, price, name } = search;
          return `
              <div class="cart-row">
              <div class="cart-item cart-column">
                      <img class="cart-item-image" src='${img}'width="100" height="100">
                          <span class="cart-item-title">${name}</span>
                          </div>
                          <span class="cart-price cart-column">${price}</span>
                          <div class="cart-quantity cart-column">
                              <input class="cart-quantity-input" type="number" value="1">
                              <button class="btn btn-danger" type="button">Xóa</button>
                          </div>
                      </div>
                  `;
        })
        .join(""));
    } else {
      ShoppingCart.innerHTML = "";
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      `;
    }
  };
  
  generateCartItems();


  
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };
  
  /**
   * ! Used to remove 1 selected product card from basket
   * ! using the X [cross] button
   */
  
  let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    calculation();
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  };


  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { id, item } = x;
          let filterData = SanPham.find((x) => x.id === id);
          return filterData.price * item;
        })
        .reduce((x, y) => x + y, 0);
  
      return (label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `);
    } else return;
  };
  
  TotalAmount();
  
  /**
   * ! Used to clear cart, and remove everything from local storage
   */
  
  let clearCart = () => {
    basket = [];
    console.log(basket);
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  

//    Thêm vào giỏ


 function addCart() {
 var add_cart = document.getElementsByClassName("atc-btn");
 for (var i = 0; i < add_cart.length; i++) {
   var add = add_cart[i];
   add.addEventListener("click", function (event) {
 
     var button = event.target;
     var product = button.parentElement.parentElement;
     var img = product.getElementsByClassName("img-prd")[0].src
     var name = product.getElementsByClassName("product-name")[0].innerText
     var price = product.getElementsByClassName("price")[0].innerText
     addItemToCart(name, price, img)
     // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    //  modal.style.display = "block"
    
     updateCart()
   })
 }
}


 function addItemToCart(name, price, img) {
   var cartRow = document.createElement('div')
   cartRow.classList.add('cart-row')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   var cart_title = cartItems.getElementsByClassName('cart-item-title')
 //   Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
   for (var i = 0; i < cart_title.length; i++) {

     if (cart_title[i].innerText == name) {
      //  alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
       Swal.fire({
        icon: 'error',
        text: 'Sản Phẩm Đã Có Trong Giỏ Hàng!'
      })
       return
     } else {
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đã Thêm Vào Giỏ Hàng!',
      showConfirmButton: false,
      timer: 1200
    })
  }
   }
}