'use sctrict';
$(document).ready(function(){
    //GET INPUT VALUES FROM FORM TO SEND TO FIREBASE DATABASE
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const addBtn = document.getElementById('addBtn');
    
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
        lastname: {
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
        lastname: {
          required: "Укажите свою фамилию",
          minlength: "Слишком короткая фамилия"
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
        email: {
          required: "Укажите свою электронную почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
    }
    $.mask.definitions['9'] = '';
    $.mask.definitions.d = '[0-9]';
    $('input[name=phone]').mask("+992 (dd) ddd-dd-dd");
    
    //CHECKING FORM BEFORE SEND TO FIREBASE
    addBtn.addEventListener('click',(e) => {
        const fnLen = firstName.value.length;
        const lnLen = lastName.value.length;
        const phLen = phone.value.length;
        const logLen = login.value.length;
        const passLen = password.value.length;
        const emLen = email.value.length;
        if(fnLen==0 || lnLen==0 || phLen==0 || logLen==0 || passLen==0 || emLen==0){
            validateForms('#registration form');
        }else {
            e.preventDefault();
            const autoId =rootRef.push().key;
            rootRef.child(autoId).set({
            first_name: firstName.value,
            last_name: lastName.value,
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
});