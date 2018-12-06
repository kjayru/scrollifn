$(document).ready(function(){
    $(".loading").show();
    $window =  $(window);
    $("#edad").numeric();
    $("#edad").val("YYYY");

    $("#edad").focus(function(){

        if( $(this).val()=="YYYY"){
            $(this).val('');
        }
    });
    $("#edad").blur(function(){
       if($(this).val()==='' || $(this).val()==='YYYY'){
        $(this).val('YYYY');
       }
    });




$("#fr-edad").validate({
    rules: {
        edad:{
            required:true,
            valueNotEquals:'YYYY'
        }
    },
    messages: {
        edad: " Ingrese su fecha de nacimiento",
    }
});

$("#validarEdad").on('click',function(e){
    e.preventDefault();
    let edad = document.getElementById("edad").value;
    let recordar = document.getElementById("recordar").checked;

  if( $("#fr-edad").valid()===true){
        if(!localStorage.getItem('session')){

            let tuedad = 2018-edad;
            if(tuedad>18){
              if(recordar===true){

                fetch('https://api.ipify.org/?format=json')
                .then(res=>res.json())
                .then(response=>{
                    localStorage.setItem('session', response.ip);

                    window.location.href='/secciones';
                })

              }else{
                localStorage.setItem('remember',Math.floor(Math.random() * 10));
                window.location.href='/secciones';
              }

            }else{
                alert("eres menor de edad");
            }
        }
    }
});


    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z]+/.test( value );
      };
      $.validator.addMethod("valueNotEquals", function(value, element, arg){

        return arg !== value;
       }, "Value must not equal arg.");



});

$(window).on("load", function () {
    $(".loading").delay(650).fadeOut(700,'swing');

    if(localStorage.getItem('session')){
        if(window.location.pathname==='/'){
          window.location.href='/secciones';
        }

    }else
    {

        if(window.location.pathname!='/'){

            window.location.href='/';
        }

    }


});



/*PRELOADER*/

var $circles = $('.circle'),
    tl = new TimelineMax();;


TweenMax.set($circles, {scale: 0});

tl.insert(
  TweenMax.staggerTo($circles.toArray(), 1, {
    opacity: 1,
    scale: 1,
    ease: Power1.easeIn
  }, 0.2)
);

tl.insert(
  TweenMax.staggerTo($circles.toArray(), 0.5, {
    scale: 1.2,
    boxShadow: '0 25px 25px rgba(0, 0, 0, 0.4)',
    repeat: -1,
    yoyo: true,
    ease: Power1.easeOut
  }, 0.2), '-=0.4'
);




eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(2($){$.c.f=2(p){p=$.d({g:"!@#$%^&*()+=[]\\\\\\\';,/{}|\\":<>?~`.- ",4:"",9:""},p);7 3.b(2(){5(p.G)p.4+="Q";5(p.w)p.4+="n";s=p.9.z(\'\');x(i=0;i<s.y;i++)5(p.g.h(s[i])!=-1)s[i]="\\\\"+s[i];p.9=s.O(\'|\');6 l=N M(p.9,\'E\');6 a=p.g+p.4;a=a.H(l,\'\');$(3).J(2(e){5(!e.r)k=o.q(e.K);L k=o.q(e.r);5(a.h(k)!=-1)e.j();5(e.u&&k==\'v\')e.j()});$(3).B(\'D\',2(){7 F})})};$.c.I=2(p){6 8="n";8+=8.P();p=$.d({4:8},p);7 3.b(2(){$(3).f(p)})};$.c.t=2(p){6 m="A";p=$.d({4:m},p);7 3.b(2(){$(3).f(p)})}})(C);',53,53,'||function|this|nchars|if|var|return|az|allow|ch|each|fn|extend||alphanumeric|ichars|indexOf||preventDefault||reg|nm|abcdefghijklmnopqrstuvwxyz|String||fromCharCode|charCode||alpha|ctrlKey||allcaps|for|length|split|1234567890|bind|jQuery|contextmenu|gi|false|nocaps|replace|numeric|keypress|which|else|RegExp|new|join|toUpperCase|ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('|'),0,{}));
