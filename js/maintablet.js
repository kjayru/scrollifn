$(document).ready(function(){
    $(".loading").show().delay(650).fadeOut(1200,'swing').promise().done(function(){
        $("#iniciomob").show();
        $("#conocemob").hide();
        $("#miramob").hide();
    });
    $('.carousel').carousel({
        interval: 0
      })
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
    //dimensiones

    $(".cuadro input.form-control").each(function(){
        let holder = $(this).data('rel');

        $(this).val(holder);
    });
    $(".cuadro input.form-control").focus(function(){
        let holder = $(this).data('rel');
        if( $(this).val()==holder){
            $(this).val('');
        }
    });
    $(".cuadro input.form-control").blur(function(){
        let holder = $(this).data('rel');
        if($(this).val()==='' || $(this).val()===holder){
            $(this).val(holder);
           }
    });

try {
    const ps = new PerfectScrollbar('#resultado', {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
      });
} catch (error) {
   console.log("no iniciado");
}


$("#fr-edad").validate({
    rules: {
        edad:{
            required:true,
            valueNotEquals:'YYYY'
        }
    },
    messages: {
        edad: "Ingrese su fecha de nacimiento",
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



    $("#cambio").change(function(){
        $(".fondoactivo").fadeIn(350,'swing');
        $(".p2 span").addClass("check-activo");
        $(".p1 span").addClass("check-activo");
    });
    $("#cambio2").change(function(){
        $(".fondoactivo").fadeOut(350,'swing');
        $("#cambio").prop(':checked',false);
        $(".p2 span").removeClass("check-activo");
        $(".p1 span").removeClass("check-activo");

    });



    $("#lugares2").on('change',function(){
        let lugar = $(this).val();

        let tienda="";
        fetch('/address.json')
        .then(res =>res.json())
        .catch(error => console.error('error: ', error))
        .then(data =>{
            //this.setState({tiendas:data});

        for(let i=0; i<data.length; i++){
            if(data[i].tienda===lugar){

                $.each(data[i].distrito,function(i,e){

                    tienda += `<address>
                    <strong> ${e.dist}</strong>: <span>${ e.address }</span>

                </address>`;
                if(e.address2!=""){
                    tienda += `<address>
                    <strong> ${e.dist}</strong>: <span>${ e.address2 }</span>
                 </address>`;
                }
                });
            }

        }

        $(".resultado").html(tienda);

        })

    });

    $(".close").on('click',function(e){
        e.preventDefault();

        $(".boxmodal").removeClass('active');
            stopVideo();

    });



    $("a.closechild").on('click',function(e){
        e.preventDefault();
        $(".modalform").fadeOut(350,'swing',function(){
            reset();
        });
    });

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z]+/.test( value );
      };
      $.validator.addMethod("valueNotEquals", function(value, element, arg){

        return arg !== value;
       }, "Value must not equal arg.");




    /**send mobile */

    $("#formdata2").validate({
        rules: {
            nombres2:{
                required:true,
                valueNotEquals:'Nombre y apellido'
            } ,

            email2: {
                required: true,
                email: true,
                valueNotEquals:'Correo electrónico'
            },

            terminos2: "required"


        },
        messages: {
            nombres2: "Ingrese su nombre",

            email2: "Ingrese un correo válido",
            terminos2: "Acepte los términos y condiciones"


        }
    });

    $(".btn-sendata2").on('click',function(e){
        e.preventDefault();
        let nombres = document.getElementById("nombres2").value;
        let email = document.getElementById('email2').value;
        let suscripcion = document.getElementById('suscripcion2').value;
        let terminos = document.getElementById('terminos2').value;
        let method = document.querySelector("input[name$='_method']").value;
        let token = document.querySelector("input[name$='_token']").value;


        datos = ({'_method':method,'_token':token,'nombres':nombres,'email':email,'suscripcion':suscripcion,'terminos':terminos});
        let url = `/savedata`;
				 if($("#formdata2").valid()===true){

                    fetch(url,{
                        method:'POST',
                        body:JSON.stringify(datos),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    }).then(res => res.json())
                        .catch(error => console.error('error: ', error))
                        .then(response => {
                            if(response.rpta ==='ok'){
                            $(".boxchild p.text-center").html(`Gracias por compartir tus datos, ${nombres}.<br>
                            Muy pronto recibirás novedades de nosotros.`);
                            $(".modalform").fadeIn(350,'swing');
                            }else{
                                alert("error de envio");
                            }
                        });

                 }else{
                     return false;
                 }

    });

    $(document).on('click touchstart tap','.btnInicio',function(e){
        e.preventDefault();
        $("#iniciomob").show();
        $("#conocemob").hide();
        $("#miramob").hide();
        $(".navbar-toggler").trigger('click');
    });
    $(document).on('click touchstart tap','.btnConoce',function(e){
        e.preventDefault();
        $("#iniciomob").hide();
        $("#conocemob").show();
        $("#miramob").hide();
        $(".navbar-toggler").trigger('click');
    });
    $(document).on('click touchstart tap','.btnMira',function(e){
        e.preventDefault();
        $("#iniciomob").hide();
        $("#conocemob").hide();
        $("#miramob").show();
        $(".navbar-toggler").trigger('click');
    });

    $(document).on('click touchstart tap','.mbslide1',function(e){
        e.preventDefault();
        $("#iniciomob").hide();
        $("#conocemob").hide();
        $("#miramob").show();

    });

    $(document).on('click touchstart tap','.mbslide2',function(e){
        e.preventDefault();
        $("#iniciomob").hide();
        $("#conocemob").show();
        $("#miramob").hide();
    });



});

$(window).on("load", function () {
    $(".loading").fadeOut(700,'swing');
    var state=false;
    $("#iniciomob").show();
    $("#conocemob").hide();
    $("#miramob").hide();
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



//api youtube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'sZSXVanDd_k',
    playerVars: {'showinfo':0, 'controls': 0,'modestbranding':0,'playsinline':0,'rel':0,'iv_load_policy': 3 },
  });
}
function onPlayerReady() {
    player.playVideo();
  }
  var done = false;

  function stopVideo() {
    player.stopVideo();
  }


  //modal

$(document).on("click touchstart tap", ".modal-trigger", function (e){
    e.preventDefault();
    onPlayerReady();
});

  var _createClass = function () {
      function defineProperties(target, props)
      {
          for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);}}
              return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) defineProperties(Constructor, staticProps);
                  return Constructor;};}();function _classCallCheck(instance, Constructor) {
                      if (!(instance instanceof Constructor)) {
                          throw new TypeError("Cannot call a class as a function");
                        }}
                        var RippleModal = function () {

    function RippleModal() {var _this = this;var triggerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'modal-trigger';var modalClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';_classCallCheck(this, RippleModal);
      this.triggerClass = triggerClass;
      var $body = document.body;

      var $rippleContainer = document.createElement('div');
      this.ripple = document.createElement('div');

      $rippleContainer.classList.add('ripple-container');
      this.ripple.classList.add('ripple');

      $rippleContainer.appendChild(this.ripple);
      $body.appendChild($rippleContainer);

      this.modals = [].slice.call(document.querySelectorAll('.' + modalClass));

      this.animationStart = 0;
      this.activeModal = null;

      this.modals.map(function (modal) {
        var close = document.createElement('button');
        close.innerHTML = 'close';
        close.classList.add('close');
        modal.appendChild(close);
        close.addEventListener('click', function (evt) {return _this._closeModal(evt, modal);}, false);
      });

      this._setRippleSize();
      this._initEvents();
    }_createClass(RippleModal, [{ key: '_setRippleSize', value: function _setRippleSize()

      {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var s = w > h ? w * 2 : h * 2;

        this.ripple.style.width = s + 'px';
        this.ripple.style.height = s + 'px';
      } }, { key: '_initEvents', value: function _initEvents()

      {var _this2 = this;
        window.addEventListener('resize', function () {return _this2._setRippleSize();}, false);
        document.body.addEventListener('click', function (evt) {return _this2._handleClicks(evt);}, false);
      } }, { key: '_handleClicks', value: function _handleClicks(

      evt) {
        var target = evt.target;
        this.animationStart = 0;

        if (target.classList.contains(this.triggerClass)) {
          var modalId = target.dataset.modal.substr(1);
          this.activeModal = document.getElementById(modalId);

          var clickTop = evt.clientY;
          var clickLeft = evt.clientX;

          this.ripple.style.left = clickLeft + 'px';
          this.ripple.style.top = clickTop + 'px';
          this.ripple.classList.add('is-animating');

          window.requestAnimationFrame(this._triggerAnimation.bind(this));
        }
      } }, { key: '_triggerAnimation', value: function _triggerAnimation(

      timestamp) {
        if (!this.animationStart) {
          this.animationStart = timestamp;
        }

        var progress = timestamp - this.animationStart;
        if (progress > 1000) {
          this.ripple.classList.remove('is-animating');
          return true;
        } else if (progress > 500) {
          this.activeModal.classList.add('active');
        }

        window.requestAnimationFrame(this._triggerAnimation.bind(this));
      } }, { key: '_closeModal', value: function _closeModal(

      evt, modal) {
        evt.preventDefault();
        modal.classList.remove('active');
      } }]);return RippleModal;}();


  (function () {
    new RippleModal();
  })();


  (function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {callback(currTime + timeToCall);},
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  })();

  /**360**/


$(document).ready(function () {

	var ready = false,

			dragging = false,

			pointerStartPosX = 0,

			pointerEndPosX = 0,

			pointerDistance = 0,


			monitorStartTime = 0,

			monitorInt = 10,

			ticker = 0,

			speedMultiplier = 10,

			spinner,


			totalFrames = 60,

			currentFrame = 0,

			frames = [],

			endFrame = 0,

			loadedImages = 0,


			$document = $(document),
			$container = $('.threesixty'),
			$images = $('.threesixty_images'),


			demoMode = false,
			fakePointer = {
				x: 0,
				speed: 4
			},
			fakePointerTimer = 0;


	function addSpinner () {
		spinner = new CanvasLoader("spinner");
		spinner.setShape("spiral");
		spinner.setDiameter(90);
		spinner.setDensity(90);
		spinner.setRange(1);
		spinner.setSpeed(4);
		spinner.setColor("#ffffff");

		spinner.show();

		$("#spinner").fadeIn("slow");
	};


	function loadImage() {

		var li = document.createElement("li");

		var imageName = "/images/src/botella" + (loadedImages) + ".png";

		var image = $('<img>').attr('src', imageName).addClass("previous-image").appendTo(li);

		frames.push(image);

		$images.append(li);

		$(image).load(function() {
			imageLoaded();
		});
	};


	function imageLoaded() {

		loadedImages++;

		$("#spinner span").text(Math.floor(loadedImages / totalFrames * 100) + "%");

		if (loadedImages == totalFrames) {

			frames[0].removeClass("previous-image").addClass("current-image");

			$("#spinner").fadeOut("slow", function(){
				spinner.hide();
				showThreesixty();
			});
		} else {

			loadImage();
		}
	};

	function showThreesixty () {

		$images.fadeIn("slow");

		ready = true;

		endFrame = -720;

		if(!demoMode) {
			refresh();
		} else {
			fakePointerTimer = window.setInterval(moveFakePointer, 100);
		}
	};


	function moveFakePointer () {
		fakePointer.x += fakePointer.speed;
		trackPointer();
	};

	function quitDemoMode() {
		window.clearInterval(fakePointerTimer);
		demoMode = false;
	};


	addSpinner();

	loadImage();

	function render () {

		if(currentFrame !== endFrame)
		{

			var frameEasing = endFrame < currentFrame ? Math.floor((endFrame - currentFrame) * 0.1) : Math.ceil((endFrame - currentFrame) * 0.1);

			hidePreviousFrame();

			currentFrame += frameEasing;

			showCurrentFrame();
		} else {

			window.clearInterval(ticker);
			ticker = 0;
		}
	};


	function refresh () {

		if (ticker === 0) {

			ticker = self.setInterval(render, Math.round(1000 / 60));
		}
	};


	function hidePreviousFrame() {

		frames[getNormalizedCurrentFrame()].removeClass("current-image").addClass("previous-image");
	};

	function showCurrentFrame() {

		frames[getNormalizedCurrentFrame()].removeClass("previous-image").addClass("current-image");
	};

	function getNormalizedCurrentFrame() {
		var c = -Math.ceil(currentFrame % totalFrames);
		if (c < 0) c += (totalFrames - 1);
		return c;
	};

	function getPointerEvent(event) {
		return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
	};

	$container.on("mousedown", function (event) {
		quitDemoMode();


		event.preventDefault();

		pointerStartPosX = getPointerEvent(event).pageX;

		dragging = true;
	});


	$document.on("mouseup", function (event){

		event.preventDefault();

		dragging = false;
	});


	$document.on("mousemove", function (event){
		if(demoMode) {
			return;
		}


		event.preventDefault();

		trackPointer(event);
	});


	$container.on("touchstart", function (event) {
		quitDemoMode();


		event.preventDefault();

		pointerStartPosX = getPointerEvent(event).pageX;

		dragging = true;
	});


	$container.on("touchmove", function (event) {

		event.preventDefault();

		trackPointer(event);
	});


	$container.on("touchend", function (event) {

		event.preventDefault();

		dragging = false;
	});

	function trackPointer(event) {
		var userDragging = ready && dragging ? true : false;
		var demoDragging = demoMode;

		if(userDragging || demoDragging) {


			pointerEndPosX = userDragging ? getPointerEvent(event).pageX : fakePointer.x;


			if(monitorStartTime < new Date().getTime() - monitorInt) {

				pointerDistance = pointerEndPosX - pointerStartPosX;

				endFrame = currentFrame + Math.ceil((totalFrames - 1) * speedMultiplier * (pointerDistance / $container.width()));

				refresh();

				monitorStartTime = new Date().getTime();


				pointerStartPosX = userDragging ? getPointerEvent(event).pageX : fakePointer.x;
			}
		} else {
			return;
		}
	};
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

$(document).ready(function(){
    $('#parallax').parallax({
        invertX: true,
        invertY: true,
        scalarX: 10,
         frictionY: .1
    });


});

function reset(){
    let rel1 = $("#nombres2").data('rel');
    $("#nombres2").val(rel1);
    let rel2 = $("#email2").data('rel');
    $("#email2").val(rel2);
    $("#suscripcion2").prop("checked",false);
    $("#terminos2").prop("checked",false);
}



eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(2($){$.c.f=2(p){p=$.d({g:"!@#$%^&*()+=[]\\\\\\\';,/{}|\\":<>?~`.- ",4:"",9:""},p);7 3.b(2(){5(p.G)p.4+="Q";5(p.w)p.4+="n";s=p.9.z(\'\');x(i=0;i<s.y;i++)5(p.g.h(s[i])!=-1)s[i]="\\\\"+s[i];p.9=s.O(\'|\');6 l=N M(p.9,\'E\');6 a=p.g+p.4;a=a.H(l,\'\');$(3).J(2(e){5(!e.r)k=o.q(e.K);L k=o.q(e.r);5(a.h(k)!=-1)e.j();5(e.u&&k==\'v\')e.j()});$(3).B(\'D\',2(){7 F})})};$.c.I=2(p){6 8="n";8+=8.P();p=$.d({4:8},p);7 3.b(2(){$(3).f(p)})};$.c.t=2(p){6 m="A";p=$.d({4:m},p);7 3.b(2(){$(3).f(p)})}})(C);',53,53,'||function|this|nchars|if|var|return|az|allow|ch|each|fn|extend||alphanumeric|ichars|indexOf||preventDefault||reg|nm|abcdefghijklmnopqrstuvwxyz|String||fromCharCode|charCode||alpha|ctrlKey||allcaps|for|length|split|1234567890|bind|jQuery|contextmenu|gi|false|nocaps|replace|numeric|keypress|which|else|RegExp|new|join|toUpperCase|ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('|'),0,{}));
