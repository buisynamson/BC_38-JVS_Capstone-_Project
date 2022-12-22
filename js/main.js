// Variables
const array = new SanPhamService();

fetchListProducts();
function fetchListProducts() {
  array
    .getList()
    .then(function (result) {
      console.log(result.data);
      renderTable(result.data);
      // clearCart(result.data);
      addCart(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setLocalStorage(product) {
  localStorage.setItem("SP", JSON.stringify(product));
}

function getLocalStorage() {
  var arr = JSON.parse(localStorage.getItem("SP"));
  return arr;
}

function renderTable(product) {
  var content = "";
  product.map(function (sp,index) {
    content += `
            <div class="img-products">
                <img class="img-prd" src='${sp.img}'/>
                <h4 class="product-name" style="margin-top:5px; font-size: 18px">${sp.name}</h4>
                <p class="price" style="margin-top:5px">${sp.price} $</p>
                <div class="overlay">
                <p class="description">${sp.desc}</p>
                <button class="atc-btn" data-name="${sp.name}" data-price="${sp.price}"> Add to cart </button>
                <button class="rm-btn"> More Info </button>
                </div>
                </div>
        `;
  });
  document.getElementById("products").innerHTML = content;
}

var modal = document.getElementById("cart");
var btn = document.getElementById("basket");
var close = document.getElementsByClassName("close")[0];
// // [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
// // Nếu có 2 cái component cùng class thì khi [0] nó sẽ hiển thị component 1 còn [1] thì nó sẽ hiển thị component 2.
// // var clear_btn = document.getElementsByClassName("clear-cart")[0];
var order = document.getElementsByClassName("order")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
order.onclick = function () {
  // alert("Bạn đã thanh toán thành công!")
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Thanh toán thành công!',
    showConfirmButton: false,
    timer: 1500
  })
  modal.style.display = "block";
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  updateCart()
}
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
}



function clearCart() {
  var items = document.getElementsByClassName("cart-items")[0];
  while (items.hasChildNodes()) {
    items.removeChild(items.firstChild);
  }
  updateCart();
  getLocalStorage();
  }

// function renderToCart(mangSP) {
//   var item = "";
//   mangSP.map(function (sp,index) {
//     item += `
//     <div class="cart-row">
//     <div class="cart-item cart-column">
//             <img class="cart-item-image" src='${sp.img}'width="100" height="100">
//                 <span class="cart-item-title">${sp.name}</span>
//                 </div>
//                 <span class="cart-price cart-column">${sp.price}</span>
//                 <div class="cart-quantity cart-column">
//                     <input class="cart-quantity-input" type="number" value="1">
//                     <button class="btn btn-danger" type="button">Xóa</button>
//                 </div>
//             </div>

//         `;
//   });
//   document.getElementById("showItem").innerHTML = item;
// }





// var remove_cart = document.getElementsByClassName("btn-danger");
// for (var i = 0; i < remove_cart.length; i++) {
//   var button = remove_cart[i]
//   button.addEventListener("click", function () {
//     var button_remove = event.target
//     button_remove.parentElement.parentElement.remove()
//   })
//   updateCart();
// }


// update cart 


function updateCart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  var quantityInCart=0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName("cart-price")[0]
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
    var quantity = quantity_item.value // lấy giá trị trong thẻ input
   
    total = total + (price * quantity)
    quantityInCart = quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
  document.getElementsByClassName("total-count")[0].innerText = quantityInCart;
}
  
// Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].

 // thay số lượng sản phẩm

//  var quantity_input = document.getElementsByClassName("cart-quantity-input");
//  for (var i = 0; i < quantity_input.length; i++) {
//    var input = quantity_input[i];
//    input.addEventListener("change", function (event) {
//      var input = event.target
//      if (isNaN(input.value) || input.value <= 0) {
//        input.value = 1;
//      }
//      updateCart()
//    })
//  }
 
 
 // Thêm vào giỏ


 function addCart() {
 var add_cart = document.getElementsByClassName("atc-btn");
 for (var i = 0; i < add_cart.length; i++) {
   var add = add_cart[i];
   add.addEventListener("click", function (event) {
 
     var button = event.target;
     var product = button.parentElement.parentElement;
     var img = product.getElementsByClassName("img-prd")[0].src
     var title = product.getElementsByClassName("product-name")[0].innerText
     var price = product.getElementsByClassName("price")[0].innerText
     addItemToCart(title, price, img)
     // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    //  modal.style.display = "block"
    
     updateCart()
   })
 }
}


 
 function addItemToCart(title, price, img) {
   var cartRow = document.createElement('div')
   cartRow.classList.add('cart-row')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   var cart_title = cartItems.getElementsByClassName('cart-item-title')
 //   Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
   for (var i = 0; i < cart_title.length; i++) {

     if (cart_title[i].innerText == title) {
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

  

   var cartRowContents =`
   <div class="cart-item cart-column">
       <img class="cart-item-image" src="${img}" width="100" height="100">
       <span class="cart-item-title">${title}</span>
   </div>
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
       <input class="cart-quantity-input" type="number" value="1">
       <button class="btn btn-danger" type="button">Xóa</button>
   </div>`
   cartRow.innerHTML = cartRowContents
  
   cartItems.append(cartRow)
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
     var button_remove = event.target
     button_remove.parentElement.parentElement.remove()
     updateCart()
   })


   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
     var input = event.target
     if (isNaN(input.value) || input.value <= 0) {
       input.value = 1;
     }
     updateCart()
   })
  }
 






// Function for mobile menu
const hamburgerMenu = () => {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};
