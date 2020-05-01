'use sctrict';
$(document).ready(function(){
  let admStatus={};
  let childData={};
  let key ={};
  //GET INPUT VALUES FROM FORM TO prepare SEND TO FIREBASE DATABASE
  const firstName = document.getElementsByClassName('firstName');
  $(".radiobutton").click(function(){
    admStatus = $("input:radio[name=checkbox]:checked").val();
    console.log(admStatus);
  });
  const phone = document.getElementById('phone');
  const login = document.getElementById('login');
  const password = document.getElementById('password');
  const email = document.getElementById('email');
  const addBtn = document.getElementById('addBtn');
  const editDoneBtn = document.getElementById('editdoneBtn');
  const adminBtn = document.getElementById('firedata');
  
  const database = firebase.database();
  const rootRef = database.ref('admins');
    
  // FORMS VALIDATION
  function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        login: {
          required: true,
          minlength: 2
          
        },
        phone: {
          required: true,
          minlength: 19,
          maxlength: 19
        },
        password: {
          required: true,
          minlength: 6
        },
        repassword: {
          required: true,
          equalTo: "#password"
        },
        
        checkbox: "required",
        email:{
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Укажите свое имя",
          minlength: "Слишком короткое имя"
        },
        login: {
          required: "Укажите имя пользователя",
          minlength: "Слишком короткое имя"
        },
        phone: {
          required: "Укажите свой номер телефона",
          minlength: "Телефон должен состоять из 12 цифр",
          maxlength: "Телефон должен состоять из 12 цифр"
        },
        password: {
          required: "Введите пароль",
          minlength:"Пароль должен быть не менее 6 символов"
        },
        repassword: {
          required: "Повторите введенный пароль",
          equalTo: "Пароли не совпадают"
        },
        checkbox:"*",
        email: {
          required: "Укажите свою электронную почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
    return $(form);
    }
    $.mask.definitions['9'] = '';
    $.mask.definitions.d = '[0-9]';
    $('input[name=phone]').mask("+992 (dd) ddd-dd-dd");
    
    //CHECKING FORM BEFORE SEND TO FIREBASE
    addBtn.addEventListener('click',(e) => {
        if (!validateForms('#registration form').valid()){
            validateForms('#registration form');
        }else {
          //WRITE DATA TO FIREBASE
            e.preventDefault();
            const autoId = rootRef.push().key;
            rootRef.child(autoId).set({
            first_name: firstName.value,
            statusIs: admStatus,
            phone: phone.value,
            login: login.value,
            password: password.value,
            email: email.value
        });
        
        $('#registration').fadeOut();
        $('.overlay, #editdone').fadeIn('slow');
        $('#registration').trigger('reset');
        } 
    });
    $("#btnEdit").hide();
    adminBtn.addEventListener('click', (e) =>{
      $("#btnEdit").fadeIn("slow");
      getdata();
    });
    //GET ADMINS DATA FROM FIREBASE AND PUT TO THE TABLE
    function getdata() {
      $(".tbody").empty();
      const userDataRef = firebase.database().ref("admins").orderByKey();
      userDataRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      key = childSnapshot.key;
      childData = childSnapshot.val(); 
      
      $(".tbody").append(`
        <tr>
          <td ><input type="radio" data-adminid="${key}" data-fname="${childData.first_name}" 
          data-status="${childData.statusIs}" data-login="${childData.login}"
          data-password="${childData.password}" data-phone="${childData.phone}" 
          data-email="${childData.email}" name="adminselected" class="checkbox" checked></td>
          <td ><span>${key}</span></td>
          <td><div class="admfirstname">${childData.first_name}</div></td>
          <td><div class="adminStatus">${childData.statusIs}</div></td>
          <td><div class="adminlogin">${childData.login}</div></td>
          <td><div class="admpsw">${childData.password}</div></td>
          <td><div class="admtel">${childData.phone}</div></td>
          <td><div class="admemail">${childData.email}</div></td>
        </tr>
      `);
      
      });
    });
  }
  //PUT DATA TO THE EDITOR MODAL
  $("#btnEdit").click(function(event){
    event.preventDefault();
    const getData = $(".tbody .checkbox:checked");
    getData.data("adminid");
    $('#edtfirstName').val($('#edtfirstName').val() + getData.data('fname'));
    $('#edtphone').val($('#edtphone').val() + getData.data('phone'));
    $('#edtlogin').val($('#edtlogin').val() + getData.data('login'));
    $('#edtpassword').val($('#edtpassword').val() + getData.data('password'));
    $('#edtemail').val($('#edtemail').val() + getData.data('email'));
    $(".radiobutton").attr("checked", false);
    $(".radiobutton[value='"+getData.data('status')+"']").attr("checked", true);
  });
  //UPDATE DATA TO FIREBASE
  editDoneBtn.addEventListener('click',(e) => {
    const edtfirstName = document.getElementById('edtfirstName');
    const edtphone = document.getElementById('edtphone');
    const edtlogin = document.getElementById('edtlogin');
    const edtpassword = document.getElementById('edtpassword');
    const edtemail = document.getElementById('edtemail');
    e.preventDefault();
    const newData = {
    first_name: edtfirstName.value,
    statusIs: admStatus,
    phone: edtphone.value,
    login: edtlogin.value,
    password: edtpassword.value,
    email: edtemail.value
    };
    const admkey = $(".tbody .checkbox:checked").data('adminid');
    rootRef.child(admkey).update(newData);
    $('#editModal').fadeOut();
    $('.overlay, #editdone').fadeIn('slow');
    $('#donetext').text('Изменения внесены');
    $('#editModal').trigger('reset');
    getdata();
});
});