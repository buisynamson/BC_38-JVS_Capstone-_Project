function SanPhamService() {
    this.getList = function () {
        //GET: lấy dữ liệu từ data
        var promise = axios({
            method: 'get',
            url: 'https://6390231465ff4183110a1697.mockapi.io/Products'
            
        });

        return promise;
    }
    this.themSP = function (sp) {
        //POST: Thêm mới dữ liệu
        //data: dữ liệu cần thêm vào Cơ sở dữ liệu
        var promise = axios({
            method: 'post',
            url: 'https://6390231465ff4183110a1697.mockapi.io/Products',
            data: sp
        });

        return promise;
    }
    this.xoaSanPham = function (id) {
        //DELETE: xóa data dựa vào id
        var promise = axios({
            method: 'delete',
            url: `https://6390231465ff4183110a1697.mockapi.io/Products/${id}`
        });

        return promise;
    }
    this.xemSanPham = function (id) {
        //GET: lấy data cua 1 sản phẩm dựa vào id
        var promise = axios({
            method: 'get',
            url: `https://6390231465ff4183110a1697.mockapi.io/Products/${id}`
        });

        return promise;
    }
    this.capNhatSanPham = function (id, sp) {
        //PUT: cập nhật data của 1 sản phẩm dựa vào id
        var promise = axios({
            method: 'put',
            url: `https://6390231465ff4183110a1697.mockapi.io/Products/${id}`,
            data: sp
        });

        return promise;
    }


    this.timKiemSP = function(mangSP, chuoiTK){

        var mangTK = [];
       mangTK = mangSP.filter(function(sp){
            return sp.name.toLowerCase().indexOf(chuoiTK.toLowerCase()) >= 0;
        });
        return mangTK;
    }


}