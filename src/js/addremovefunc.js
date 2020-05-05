'use sctrict';
$(document).ready(function(){

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDSK4A6CxtLSoK-YcO8rGLhzdKs9XU7PLs",
    authDomain: "coupon-a7d51.firebaseapp.com",
    databaseURL: "https://coupon-a7d51.firebaseio.com",
    projectId: "coupon-a7d51",
    storageBucket: "coupon-a7d51.appspot.com",
    messagingSenderId: "972971074512",
    appId: "1:972971074512:web:6e8e33059b2bd59c128fd5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  //GET INPUT VALUES FROM FORM TO prepare SEND TO FIREBASE DATABASE
  
  let childData={};
  let key ={};

  const firstName = document.getElementById('firstName');
  const phone = document.getElementById('phone');
  const login = document.getElementById('login');
  const password = document.getElementById('password');
  const email = document.getElementById('email');
  const addBtn = document.getElementById('addBtn');
  const editBtn = document.getElementById('editBtn');
  
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

    $('[data-modal=registration]').on('click', () => {
      $('#registration form').trigger('reset');
      $('#mdsubtitle').text('Новый администратор');
      $('#repassword').show();
      $('#editBtn').hide();
      $('#addBtn').show();
      $('.overlay, #registration').fadeIn('slow');
    });
    
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
        statusIs: $("input:radio[name=checkbox]:checked").val(),
        phone: phone.value,
        login: login.value,
        password: password.value,
        email: email.value
      });
      $('#registration form').trigger('reset');
      $('#registration').fadeOut();
      $('.overlay, #editdone').fadeIn('slow');
      $('#donetext').text('Администратор добавлен');
      getdata();
      } 
    });
  //ADMIN BUTTON TIMEOUT FOR NEXT CLICK
    var click = function() {
      $("#firedata").click(function() {
          getdata();
          // Unbind the event
          $('#firedata').unbind();
          // Call the function after 2 second delay
          setTimeout(function() {
              click();
          }, 2000);
      });
      };
  click();
      
  //GET ADMINS DATA FROM FIREBASE AND PUT TO THE TABLE
  const table = $('#tableAdmins').DataTable({
    select: {
      style: 'single'
    },
    columns: [
      { data: 'key' },
      { data: 'first_name' },
      { data: 'statusIs' },
      { data: 'login' },
      { data: 'password' },
      { data: 'phone' },
      { data: 'email' }
    ]
    
  });
  // RETRIEVE DATA FROM SELECTED ROW OF THE TABLE
  let selectedUser = {};
  $('#tableAdmins tbody').on( 'click', 'tr', function () {
    selectedUser = table.row(this).data();
    $('#btnEdit').fadeIn('slow');
    $('#btnRemove').fadeIn('slow');
  } );
  // PUT SELECTED ROW DATA TO THE EDIT MODAL FORM 
  $("#btnEdit").click(function(event){
    event.preventDefault();
    $('#mdsubtitle').text('Изменить');
    $('#addBtn').hide();
    $('#editBtn').show();
    $('#repassword').hide();
    $('.overlay, #registration').fadeIn('slow');
    $('#firstName').val(selectedUser.first_name);
    $('#phone').val(selectedUser.phone);
    $('#login').val(selectedUser.login);
    $('#password').val(selectedUser.password);
    $('#email').val(selectedUser.email);
    $(".radiobutton").attr("checked", false);
    $(".radiobutton[value='"+selectedUser.statusIs+"']").attr("checked", true);
  });
 
  // UPDATE DATA TO FIREBASE
    editBtn.addEventListener('click',(e) => {
      if (!validateForms('#registration form').valid()){
        validateForms('#registration form');
    }else {
      e.preventDefault();
    const newData = {
      first_name: firstName.value,
      statusIs: $("input:radio[name=checkbox]:checked").val(),
      phone: phone.value,
      login: login.value,
      password: password.value,
      email: email.value
    };
    const admkey = selectedUser.key;
    rootRef.child(admkey).update(newData);
    $('#registration').fadeOut();
    $('.overlay, #editdone').fadeIn('slow');
    $('#donetext').text('Изменения внесены');
    $('#registration form').trigger('reset');
    getdata();
    }
  });

  //REMOVE DATA FROM FIREBASE
  $('#btnRemove').click(function(){
    $('.overlay, #editdone').fadeIn('slow');
    $('#donetext').text('Подтвердите удаление');
    $('#yesBtn').show();
    $('#noBtn').show();
  });
    $('#yesBtn').click(function(){
      const remadmkey = selectedUser.key;
      rootRef.child(remadmkey).remove();
      $('#donetext').text('Администратор удален');
      $('#yesBtn').hide();
      $('#noBtn').hide();
      getdata();
    });

  //FUNCTION TO RETRIVE DATA FROM FIREBASE TO THE TABLE
  function getdata() {
    table.clear().draw();
    $('.tableInfo').empty();
    const userDataRef = firebase.database().ref("admins").orderByKey();
    userDataRef.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        key = childSnapshot.key;
        childData = childSnapshot.val();
        childData.key = key;
        table.row.add(childData);
      });
      table.draw();
    });
  }
});