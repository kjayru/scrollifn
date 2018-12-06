
   
    var msnry = new Masonry( '.grid', {
        itemSelector: '.grid__item',
        columnWidth: '.grid__col-sizer',
        gutter: '.grid__gutter-sizer',
        percentPosition: true,
        stagger: 30,
        // nicer reveal transition
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
      });


      var infScroll = new InfiniteScroll( '.grid', {
        path: function() {
            console.log( this.pageIndex);
          return 'http://absolute.test/getdata?page=' + this.pageIndex;
        },
        // load response as flat text
        responseType: 'text',
        outlayer: msnry,
        status: '.page-load-status',
        history: false,
      });

      // use element to turn HTML string into elements
var proxyElem = document.createElement('div');

infScroll.on( 'load', function( response ) {
  // parse response into JSON data
  var data = JSON.parse( response );
  // compile data into HTML
  var itemsHTML = data.map( getItemHTML ).join('');
  // convert HTML string into elements
  proxyElem.innerHTML = itemsHTML;
  // append item elements
  var items = proxyElem.querySelectorAll('.grid__item');
  imagesLoaded( items, function() {
    infScroll.appendItems( items );
    msnry.appended( items );
  });
});
   
infScroll.loadNextPage();
 

  /*  $(".content").mCustomScrollbar({
        scrollInertia:0,
		setTop: 0,
		setHeight: 1000,
        callbacks: {
            onCreate: function(){

            },
            advanced:{

                updateOnContentResize: true
            },
            onBeforeUpdate: function(){

            },
            onTotalScroll: function(){
               /* $grid.infiniteScroll( 'option', {
                  loadOnScroll: true,
                  outlayer: msnry,
                  history: false
                });*/

               // $grid.infiniteScroll('loadNextPage');
               // msnry.reloadItems();
               // msnry.layout();
    /*        }

        }
    });*/



function getItemHTML( photo ) {
    var rn = Math.floor((Math.random() * 10) + 1);
switch (rn) {
    case 1:

    var itemTemplateSrc = $('#photo-item-template').html();
    break;
    case 2:

    var itemTemplateSrc = $('#photo-item-template2').html();
    break;
    case 3:

    var itemTemplateSrc = $('#photo-item-template3').html();
    break;
    case 4:

    var itemTemplateSrc = $('#photo-item-template4').html();
    break;

    case 5:

    var itemTemplateSrc = $('#photo-item-template5').html();
    break;

    case 6:

    var itemTemplateSrc = $('#photo-item-template6').html();
    break;
    case 7:

    var itemTemplateSrc = $('#photo-item-template7').html();
    break;
    case 8:
    var itemTemplateSrc = $('#photo-item-template8').html();
    break;
    case 9:

    var itemTemplateSrc = $('#photo-item-template9').html();
    break;
    case 10:

    var itemTemplateSrc = $('#photo-item-template10').html();
    break;
    }

    return microTemplate( itemTemplateSrc, photo );

}


function microTemplate( src, data ) {


  return src.replace( /\{\{([\w\-_\.]+)\}\}/gi, function( match, key ) {
    var value = data;

    value = data.idStr;


    return value;
  });
}


