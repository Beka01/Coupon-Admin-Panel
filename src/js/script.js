'use strict';

$(document).ready(function(){
    //USERS CATEGORY DROP DOWN EFFECT
//  $('.admin-btn').click(function() {
//     $('nav ul .admin-show').toggleClass("show");
//     $('nav ul .first').toggleClass("rotate");
//  });
//  $('.sell-btn').click(function() {
//     $('nav ul .sell-show').toggleClass("show1");
//     $('nav ul .second').toggleClass("rotate");
//  });
//  $('.buy-btn').click(function() {
//     $('nav ul .buy-show').toggleClass("show2");
//     $('nav ul .third').toggleClass("rotate");
//  });
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
 //REGISTRATION BLOCK
 $('[data-modal=registration]').on('click', () => {
   $('.overlay, #registration').fadeIn('slow');
 });
 //EDIT BLOCK
 $('[data-modal=edit]').on('click', () => {
   $('.overlay, #editModal').fadeIn('slow');
 });
 //MODAL CLOSE BUTTON
 $('.modal__close').on('click', () => {
   $('.overlay, #registration').fadeOut('fast');
   $(this).find('.dialog-form').trigger('reset');
   $(this).find('label.error').hide();
   $(".error").removeClass("error");
 }); 
 $('.modal__close').on('click', () => {
   $('.overlay, #editdone').fadeOut('fast');
   $(this).find('.dialog-form').trigger('reset');
   $(this).find('label.error').hide();
   $(".error").removeClass("error");
 }); 
});
