var APP = APP || {};

var main = (function(APP, win, $, undefined) {
  "use strict";

  var st = {
    list1: '#list1',
    list2: '#list2',
    list3: '#list3',
    cities: 'cities__element',
    countdown: '#countdown',
    dia_digito1: '#dia_digito1',
    dia_digito2: '#dia_digito2',
    hora_digito1: '#hora_digito1',
    hora_digito2: '#hora_digito2',
    minuto_digito1: '#minuto_digito1',
    minuto_digito2: '#minuto_digito2',
    segundo_digito1: '#segundo_digito1',
    segundo_digito2: '#segundo_digito2',
    questions: '.questions__list ul li h3',
    considerations: '.considerations__subtitle'
  };

  var dom = {};

  var page;

  var catchDom = function() {

    dom.cities = Array.apply(null, document.querySelectorAll(st.cities));

    dom.countdown = document.querySelector(st.countdown);

    dom.dia_digito1 = document.querySelector(st.dia_digito1);
    dom.dia_digito2 = document.querySelector(st.dia_digito2);
    dom.hora_digito1 = document.querySelector(st.hora_digito1);
    dom.hora_digito2 = document.querySelector(st.hora_digito2);
    dom.minuto_digito1 = document.querySelector(st.minuto_digito1);
    dom.minuto_digito2 = document.querySelector(st.minuto_digito2);
    dom.segundo_digito1 = document.querySelector(st.segundo_digito1);
    dom.segundo_digito2 = document.querySelector(st.segundo_digito2);

  };

  var suscribeEvents = function() {

    if(page == "page2"){
      
      win.addEventListener('resize', events.eResize);

    }

    dom.questions.filter(function (element, index) {
      element.addEventListener("click", events.eOpenQuestions);
    })

    dom.considerations.addEventListener("click", events.eOpenConsiderations);

  };

  var plugins = {
    slick: function(){

      dom.slick1 = $(st.list1).slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        //centerMode: true,
        //centerPadding: '40px',
        responsive: [
          {
              //breakpoint: 9999,
              //settings: "unslick"
          },
          {

            breakpoint: 426,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: true
            }

          }
        ]
      });
      dom.slick2 = $(st.list2).slick({
        arrows: true,
        dots: false,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '40px',
        responsive: [
          {
              //breakpoint: 9999,
              //settings: "unslick"
          },
          {

            breakpoint: 426,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: false
            }

          }
        ]
      });
      dom.slick3 = $(st.list3).slick({
        arrows: true,
        dots: false,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '40px',
        responsive: [
          {
              //breakpoint: 9999,
              //settings: "unslick"
          },
          {

            breakpoint: 426,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: false
            }

          }
        ]
      });
    },
    gallery: function(){
      $(st.list2).lightGallery({
        share: false,
        facebook: false,
        twitter: false,
        googlePlus: false,
        pinterest: false
      });
      $(st.list3).lightGallery({
        share: false,
        facebook: false,
        twitter: false,
        googlePlus: false,
        pinterest: false
      });
    }
  }

  var methods = {
    
  }

  var events = {
    eResize: function(e){
      dom.slick1.slick('resize');
    },
    eOpenQuestions: function(e){

      var buttonClass = this.parentNode.classList;

      if(buttonClass.contains("active")){
        buttonClass.remove("active");
      }else{
        buttonClass.add("active");
      }

      var panel = this.nextElementSibling;

      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 

    },
    eOpenConsiderations: function(){
      var buttonClass = event.target.parentNode.parentNode.children[0].classList;

      if(buttonClass.contains("active")){
        buttonClass.remove("active");
      }else{
        buttonClass.add("active");
      }

      var panel = this.nextElementSibling;

      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    }
  };

  return {
    init: function(x){
      page = x;

      catchDom();
      
      plugins.gallery();
      plugins.slick();

    }
  }

})(APP, window, jQuery);