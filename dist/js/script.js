'use strict';
 
$(document).ready(function(){
  
 //USERS CATEGORY DROP DOWN EFFECT
 $('.couponsell-btn').click(function() {
    $('nav ul .couponsell-show').toggleClass("show3");
    $('nav ul .fourth').toggleClass("rotate");
 });
 $('.couponbuy-btn').click(function() {
    $('nav ul .couponbuy-show').toggleClass("show4");
    $('nav ul .fifth').toggleClass("rotate");
 });
 //WEBSITE CATEGORY DROP DOWN EFFECT
 $('.shapka-btn').click(function() {
    $('nav ul .shapka-show').toggleClass("show5");
    $('nav ul .sixth').toggleClass("rotate");
 });
 $('.sidenav-btn').click(function() {
    $('nav ul .sidenav-show').toggleClass("show6");
    $('nav ul .seventh').toggleClass("rotate");
 });
 $('.coupondev-btn').click(function() {
    $('nav ul .coupondev-show').toggleClass("show7");
    $('nav ul .eighth').toggleClass("rotate");
 });
 //MODAL
 
});
//REGISTRATION BLOCK

 //MODAL CLOSE BUTTON
 $('.modal__close').on('click', () => {
   $('.overlay, #registration, #editdone').fadeOut('fast');
   $('#yesBtn').fadeOut('fast');
   $('#noBtn').fadeOut('fast');
   $(this).find('.dialog-form').trigger('reset');
   $('input:checkbox').removeAttr('checked');
   $(this).find('label.error').hide();
   $(".error").removeClass("error");
 }); 