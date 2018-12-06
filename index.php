<?php
require 'vendor/autoload.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
        <link rel="stylesheet" href="/css/vendor/bootstrap.min.css" >
        <link rel="stylesheet" href="/css/vendor/jquery.mCustomScrollbar.css">
       
</head>
<style>


body {
  font-family: sans-serif;
  line-height: 1.4;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid__col-sizer,
.photo-item {
  width: 32%;
}

.grid__gutter-sizer {
  width: 2%;
}

.grid__item {
  margin-bottom: 10px;
  float: left;
}

.grid__item__image {
  display: block;
  max-width: 100%;
}

.grid__item__caption {
  position: absolute;
  left: 10px;
  bottom: 10px;
  margin: 0;
}

.grid__item__caption a {
  color: white;
  font-size: 0.8em;
  text-decoration: none;
}

.page-load-status {
  display: none; /* hidden by default */
  padding-top: 20px;
  border-top: 1px solid #DDD;
  text-align: center;
  color: #777;
}
</style>
<body>

 
                <div id="grid" class="grid" >
                    <div class="grid-sizer"></div>
                    <div class="gutter-sizer"></div>


                   
                </div>

                <div class="page-load-status">
                    <div class="loader-ellips infinite-scroll-request">
                        <span class="loader-ellips__dot"></span>
                        <span class="loader-ellips__dot"></span>
                        <span class="loader-ellips__dot"></span>
                        <span class="loader-ellips__dot"></span>
                    </div>
                    <p class="infinite-scroll-last">End of content</p>
                    <p class="infinite-scroll-error">No more pages to load</p>
                </div>
 






<script type="text/html" id="photo-item-template">

  <div class="grid__item grid__item--height2 ">
        <div class="box">
            <video controls="" poster="/images/fondo1.png">
                <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

            </video>
        </div>
    </div>
</script>
<script type="text/html" id="photo-item-template2">

  <div class="grid__item grid__item--width2  ">
        <div class="box">
            <video controls="" poster="/images/fondo2.png">
                <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

            </video>
        </div>
    </div>
</script>

<script type="text/html" id="photo-item-template3">

<div class="grid__item grid__item--height2  ">
      <div class="box">
          <video controls="" poster="/images/fondo4.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>


<script type="text/html" id="photo-item-template4">

<div class="grid__item grid__item--width2  ">
      <div class="box">
          <video controls="" poster="/images/fondo2.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template5">

<div class="grid__item grid__item--height2  ">
      <div class="box">
          <video controls="" poster="/images/fondo3.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template6">

<div class="grid__item grid__item--width2  ">
      <div class="box">
          <video controls="" poster="/images/fondo1.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template7">

<div class="grid__item grid__item--height2  ">
      <div class="box">
          <video controls="" poster="/images/fondo2.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template8">

<div class="grid__item grid__item--width2  ">
      <div class="box">
          <video controls="" poster="/images/fondo4.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template9">

<div class="grid__item grid__item--height2  ">
      <div class="box">
          <video controls="" poster="/images/fondo3.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>

<script type="text/html" id="photo-item-template10">

<div class="grid__item grid__item--width2  ">
      <div class="box">
          <video controls="" poster="/images/fondo1.png">
              <source src="https://s3.amazonaws.com/arquea-absolute-dev/output/{{valor.idStr}}.mp4" type="video/mp4">

          </video>
      </div>
  </div>
</script>


<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>


<script src="/js/vendor/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="https://unpkg.com/infinite-scroll@3/dist/infinite-scroll.pkgd.min.js"></script>
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
<script src="js/main.js"></script>
</body>
</html>
