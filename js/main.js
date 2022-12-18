// Variables
const array = new SanPhamService();

fetchListProducts();
function fetchListProducts() {
  array
    .getList()
    .then(function (result) {
      console.log(result.data);
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
console.log(array);

function setLocalStorage(mangSP) {
  localStorage.setItem("DSSP", JSON.stringify(mangSP));
}
function renderTable(mangSP) {
  var content = "";
  mangSP.map(function (sp,index) {
    content += `
            <div class="img-products">
                <img src='${sp.img}'/>
                <h4>${sp.name}</h4>
                <p class="price mt-2">$${sp.price}</p>
                <div class="overlay">
                <p class="description">${sp.desc}</p>
                <button class="atc-btn"> Add to cart </button>
                <button class="rm-btn"> More Info </button>
                </div>
                </div>
        `;
  });
  document.getElementById("products").innerHTML = content;
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
