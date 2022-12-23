

/**
 * 
 * 
 *          VALIDATION FORM
 *  - Các dữ liệu bắt buộc phải được nhập
 *  
 *  - Name: phải từ 2 - 50 ký tự. 
 *  - Giá: không được có chữ và ký tự đặc biệt (chỉ số hoặc ĐANG CẬP NHẬT). 
 *  - Screen: chỉ nhập giá trị số KHÔNG có ký tự và ký tự đặc biệt. 
 *  - Back Camera: trong chuỗi phải có Số và MP (respectively). 
 *  - Front Camera: trong chuỗi phải có Số và MP (respectively). 
 *  - Img:  Phải nhập link đường dẫn trực tuyến. 
 *  - Desc: phải từ 2 - 50 ký tự. 
 *  - Type: phải từ  2 - 16 ký tự. 
 * 
 * 
*/



function requiredInput(prdValue, errorPrd) {
    if (prdValue.length > 0) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    }
    document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
    return false;
}

// check length

function checkLengthInput(prdValue, errorPrd) {
    if (prdValue.length < errorPrd.min || prdValue.length > errorPrd.max) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
        document.getElementById(errorPrd.errorId).style.display = 'block';
        document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
        return false;
    }
    document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
    return true;
}

///Check URL link
function isURL(prdValue, errorPrd) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    if (pattern.test(prdValue)) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    } else {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
        return false;
    }
};

function onlyNumbersOrUpdating(prdValue, errorPrd) {
    if (prdValue === "Đang cập nhật") {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    }
    if (/^[0-9]+$/.test(prdValue)) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    }
    else {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
        return false;
    };
};

function onlyNumbers(prdValue, errorPrd) {
    if (/^[0-9]+$/.test(prdValue)) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    }
    else {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
        return false;
    };
};

//Validation for BackCamera
function checkCameraUnitInString(prdValue, errorPrd) {
    var arrayMP = prdValue.match(/[0-9]+ (MP)+/g);
    var count = 0;
    if (arrayMP === null) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
        return false;
    }
    for (var i = 0; i < prdValue.length; i++) {
        if (prdValue.includes(arrayMP[i])) {
            count++;
        } else if (count === 0) {
            document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;;
            return false;
        };
    };
    document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
    return true;
};

//Validation for FrontCamera
function checkCameraUnit(prdValue, errorPrd) {

    var result = (/^[0-9]+ (MP)/g).test(prdValue);

    if (result) {
        document.getElementById(errorPrd.errorInputId).style.border = "1px solid grey";
        document.getElementById(errorPrd.errorId).style.display = 'none';
        return true;
    }
    document.getElementById(errorPrd.errorInputId).style.border = "1px solid red";
    document.getElementById(errorPrd.errorId).style.display = 'block';
    document.getElementById(errorPrd.errorId).innerHTML = `${errorPrd.errorScript}`;
    return false;
};


function validationForm(_name, _price, _screen, _backCamera, _frontCamera, _img, _desc, _type ) {
    var name = document.getElementById(_name).value.trim();
    var price = document.getElementById(_price).value.trim();
    var screen = document.getElementById(_screen).value.trim();
    var backCamera = document.getElementById(_backCamera).value.trim();
    var frontCamera = document.getElementById(_frontCamera).value.trim();
    var img = document.getElementById(_img).value.trim();
    var desc = document.getElementById(_desc).value.trim();
    var type = document.getElementById(_type).value.trim();


    var prdNameValid =
        requiredInput(name, { errorId: 'errorName',errorInputId: _name, errorScript: '*Nhập tên sản phẩm' }) &&
        checkLengthInput(name, { errorId: 'errorName', errorInputId: _name, min: 2, max: 50, errorScript: "*Tên sản phẩm phải từ 2-50 ký tự." });


    var prdPriceValid =
        requiredInput(price, { errorId: 'errorPrice',errorInputId: _price ,errorScript: '*Nhập giá sản phẩm' }) &&
        onlyNumbersOrUpdating(price, { errorId: 'errorPrice', errorInputId: _price ,errorScript: '*Phải nhập số và không chứa ký tự và ký tự đặc biệt @,#,!,$,%,...' });


    var prdScreenValid =
        requiredInput(screen, { errorId: 'errorScreen',errorInputId: _screen ,errorScript: '*Nhập thông số màn hình sản phẩm' }) &&
        onlyNumbers(screen, { errorId: 'errorScreen', errorInputId: _screen,errorScript: '*Nhập thông số màn hình và không chứa ký tự và ký tự đặc biệt @,#,!,$,%,...' });


    var prdBCamValid =
        requiredInput(backCamera, { errorId: 'errorBCam', errorInputId: _backCamera ,errorScript: '*Nhập thông số Camera sau của sản phẩm' }) &&
        checkCameraUnitInString(backCamera, { errorId: 'errorBCam', errorInputId: _backCamera ,errorScript: '*Dữ liệu nhập không có thông số của Camera sau, Ví dụ: 12 MP' });


    var prdFCamValid =
        requiredInput(frontCamera, { errorId: 'errorFCam', errorInputId: _frontCamera ,errorScript: '*Nhập thông số Camera trước của sản phẩm' }) &&
        checkLengthInput(frontCamera, { errorId: 'errorFCam',errorInputId: _frontCamera ,min: 1, max: 6, errorScript: "*Nội dung không hợp lệ" }) &&
        checkCameraUnit(frontCamera, { errorId: 'errorFCam', errorInputId: _frontCamera ,errorScript: '*Không phải thông số của Camera trước, Ví dụ: 12 MP' });


    var prdImgValid =
        requiredInput(img, { errorId: 'errorImg',errorInputId: _img ,errorScript: '*Nhập hình ảnh của sản phẩm' }) &&
        isURL(img, { errorId: 'errorImg', errorInputId: _img,errorScript: '*Chỉ nhận hình ảnh với đường dẫn trực tuyến' });


    var prdDescValid =
        requiredInput(desc, { errorId: 'errorDesc', errorInputId: _desc,errorScript: '*Nhập mô tả cho sản phẩm' }) &&
        checkLengthInput(desc, { errorId: 'errorDesc', errorInputId: _desc,min: 2, max: 50, errorScript: "*Mô tả phải từ 2-50 ký tự." });


    var prdTypeValid =
        requiredInput(type, { errorId: 'errorType', errorInputId: _type,errorScript: '*Nhập loại sản phẩm' }) &&
        checkLengthInput(type, { errorId: 'errorType', errorInputId: _type ,min: 2, max: 16, errorScript: "*Loại sản phẩm phải từ 2-16 ký tự." });



    // if (!prdNameValid) document.getElementById('nameProduct').style.border = "1px solid red";
    // else document.getElementById('nameProduct').style.border = "1px solid grey";

    // if (!prdPriceValid) document.getElementById('priceProduct').style.border = "1px solid red";
    // else document.getElementById('priceProduct').style.border = "1px solid grey";

    // if (!prdScreenValid) document.getElementById('screenProduct').style.border = "1px solid red";
    // else document.getElementById('screenProduct').style.border = "1px solid grey";

    // if (!prdBCamValid) document.getElementById('backCamera').style.border = "1px solid red";
    // else document.getElementById('backCamera').style.border = "1px solid grey";

    // if (!prdFCamValid) document.getElementById('frontCamera').style.border = "1px solid red";
    // else document.getElementById('frontCamera').style.border = "1px solid grey";

    // if (!prdImgValid) document.getElementById('imgProduct').style.border = "1px solid red";
    // else document.getElementById('imgProduct').style.border = "1px solid grey";

    // if (!prdDescValid) document.getElementById('descProduct').style.border = "1px solid red";
    // else document.getElementById('descProduct').style.border = "1px solid grey";

    // if (!prdTypeValid) document.getElementById('typeProduct').style.border = "1px solid red";
    // else document.getElementById('typeProduct').style.border = "1px solid grey";
    
    var isFormValid = prdNameValid && prdPriceValid && prdScreenValid
        && prdBCamValid && prdFCamValid && prdImgValid && prdDescValid && prdTypeValid;

    return isFormValid;
}