var productSer = new SanPhamService();

getListProducts();
function getListProducts() {
  productSer
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
function setLocalStorage(mangSP) {
  localStorage.setItem("DSSP", JSON.stringify(mangSP));
}

//Gắn sự kiện click cho button search
document.getElementById("search").addEventListener("click", function () {
  var mangSP = getLocalStorage();
  var mangTK = [];
  console.log(mangSP);

  var chuoiTK = document.getElementById("inputTK").value;

  mangTK = productSer.timKiemSP(mangSP, chuoiTK);

  console.log(mangTK);
  renderTable(mangTK);
});

function getLocalStorage() {
  var mangKQ = JSON.parse(localStorage.getItem("DSSP"));
  return mangKQ;
}

document.getElementById ("btnThemSP").addEventListener("click", function () {
  var footerEle = document.querySelector(".modal-footer");
  footerEle.innerHTML = `
        <button onclick="addProducts()" class="btn btn-success">Thêm sản phẩm</button>
        <button
        id="btnDong"
        type="button"
        class="btn btn-danger"
        data-dismiss="modal"
        >
        Đóng
        </button>
    `;
});



function renderTable(mangSP) {
  var content = "";
  var count = 1;
  mangSP.map(function (sp, index) {
    content += `
            <tr>
                <td>${count}</td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>${sp.img}</td>
                <td>${sp.desc}</td>
                <td>${sp.type}</td>
                <td>
                    <button 
                    onclick="xoaSP('${sp.id}')"
                    class="btn btn-danger">
                     <i class="fa fa-trash-o" aria-hidden="true"></i>
                     </button>

                    <button 
                    onclick="xemSP('${sp.id}')"
                    class="btn btn-info mt-2"> 
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    count++;
  });
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function addProducts() {
  //B1: Lấy thông tin(info) từ form
  // data, info
  if (!validateForm()) return;
  var id = document.getElementById("id").value;
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("manHinh").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;
  var type = document.getElementById("loai").value;

  var sp = new SanPham(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  console.log(sp);

  //B2: lưu info xuống database(cơ sở dữ liệu)
  productSer
    .themSP(sp)
    .then(function (result) {
      //Load lại danh sách sau khi thêm thành công
      getListProducts();

      //gọi sự kiên click có sẵn của close button
      //Để tắt modal khi thêm thành công
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function xoaSP(id) {
  productSer.xoaSanPham(id);
  Swal.fire({
    title: "Bạn vẫn tiếp tục xóa?",
    text: "Bạn sẽ không thể khôi phục lại!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Tiếp tục xóa!",
  })
    .then(function (result) {
    
      if (result.isConfirmed) {
       
      }
      Swal.fire({
        title: "Đã xóa!",
        timer: 2000,
        text: "Dữ liệu đã được xóa!",
        icon: "success",
      });
  //Load lại danh sách sau khi xóa thành công
      getListProducts();

    })
    .catch(function (error) {
      console.log(error);
    });
}

function xemSP(id) {
  productSer
    .xemSanPham(id)
    .then(function (result) {
      console.log(result.data);
      //Mở modal
      $("#myModal").modal("show");
      //Điền thông tin lên form
     document.getElementById("id").value = result.data.id;
     document.getElementById("TenSP").value = result.data.name;
     document.getElementById("GiaSP").value = result.data.price;
     document.getElementById("manHinh").value = result.data.screen;
     document.getElementById("backCamera").value = result.data.backCamera;
     document.getElementById("HinhSP").value = result.data.img;
     document.getElementById("MoTa").value = result.data.desc;
     document.getElementById("loai").value = result.data.type;

      //Thêm button cập nhật cho form
      var footerEle = document.querySelector(".modal-footer");
      footerEle.innerHTML = `
            <button onclick="capNhatSP('${result.data.id}')" class="btn btn-success">Cập nhật</button>
            <button
            id="btnDongCapNhat"
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Đóng
          </button>
        `;
        document.getElementById("myModal").reset();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capNhatSP(id) {
  //B1: Lấy thông tin(info) từ form
  if (!validateForm()) return;
  var id = document.getElementById("id").value;
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("manHinh").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;
  var type = document.getElementById("loai").value;

  var sp = new SanPham(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  console.log(sp);

  //B2: Cập nhật thông tin mới xuống DB
  productSer
    .capNhatSanPham(id, sp)
    .then(function (result) {
      console.log(result.data);
      //Load lại danh sách sau khi cập nhật thành công
      getListProducts();

      //gọi sự kiên click có sẵn của close button
      //Để tắt modal khi cập nhật thành công
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function required(val, config) {
  if (val.length > 0) {
    document.getElementById(config.errorCode).style.display = "none";
    return true;
  }
  document.getElementById(config.errorCode).innerHTML =
    "* Vui lòng nhập thông tin!";
  document.getElementById(config.errorCode).style.display = "block";
  return false;
}







// validation

function validateForm() {
  //B1: Lấy thông tin(info) từ form
  // var id = getELE("id").value;
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("manHinh").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;
  var type = document.getElementById("loai").value;

  var nameValid =
    required(name, { errorCode: "tbTenSP" });


    var priceValid =
    required(price, { errorCode: "tbGiaSP" });


    var screenValid =
    required(screen, { errorCode: "tbmanHinh" });


    
    var backCameraValid =
    required(backCamera, { errorCode: "tbBackCamera" });



    var frontCameraValid =
    required(frontCamera, { errorCode: "tbFrontCamera" });


    var frontCameraValid =
    required(frontCamera, { errorCode: "tbFrontCamera" });


    var imgValid =
    required(img, { errorCode: "tbHinhSP" });


    var isFormValid = nameValid
    && priceValid
    && screenValid
    && backCameraValid 
    && frontCameraValid
    && imgValid
    ;
    return isFormValid;


}