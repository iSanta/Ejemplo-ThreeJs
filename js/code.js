$(document).ready(function() {
  var rotating = false;
  var keyRotatingX = 0;
  var keyRotatingY = 0;


  var scene = new THREE.Scene();
  var loader = new THREE.TextureLoader();

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;


  var render = new THREE.WebGLRenderer({ alpha: true });
  render.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvasContainer").appendChild(render.domElement);
  loader.setCrossOrigin ( '' ) // habilita el uso de imagenes en el mismo servidor
  render.setClearColor( 0xffffff, 0 ); // color del fondo del render, el segundo parametro es la opacidad, si y solo si al crear el objeto se define alpha: true

  loader.load('img/woodBox.jpg', function (texture){
    scene.background = new THREE.Color( 0xff0000 );
  }, undefined, function ( err ) {console.error( 'An error happened.' );})

  var cube;

  loader.load('img/woodBox.jpg', function (texture){
    console.log("supuesto Loaded");
    var geometry = new THREE.BoxGeometry(4,4,4);
    var material = new THREE.MeshBasicMaterial({map: texture});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    render.render(scene, camera);


  }, undefined, function ( err ) {console.error( 'An error happened.' );})



  var documentWidht = $(document).width();
  var documentHeight = $(document).height();

  $('body').mousemove((pointer)=>{
    //console.log("Eje X: " + pointer.pageX + " Eje Y: " + pointer.pageY + " Alto de la pantalla: " + documentHeight + " Estado de la rotacion: " + rotating);

    //camera.rotation.y = -(documentWidht / 192) + (pointer.pageX/1000);
    //camera.rotation.x = -(documentHeight / 95) + (pointer.pageY/500);
    camera.rotation.y = ((documentWidht/2) - pointer.pageX)/1000;
    camera.rotation.x = ((documentHeight/2) - pointer.pageY)/500;

    $(".backImage").css({'left': (pointer.pageX / 10), 'top': pointer.pageY / 10})
    render.render(scene, camera);
  })

  $('body').mousedown(()=>{
    rotating = true;
  })
  $('body').mouseup(()=>{
    rotating = false;
  })

  $('body').keydown((keyCode)=>{
    console.log("tecla: " + keyCode.which);
    if(keyCode.which == 38){
      keyRotatingY = -0.04;
    }
    else if (keyCode.which == 40){
      keyRotatingY = 0.04;
    }
    else if (keyCode.which == 39) {
      keyRotatingX = 0.04;
    }
    else if (keyCode.which == 37) {
      keyRotatingX = -0.04;
    }
    else if (keyCode.which == 32){
      restore()
    }
    else if (keyCode.which == 65){
      cube.rotation.x += Math.PI / 2;

      render.render(scene, camera);

    }
  });

  $('body').keyup((keyCode)=>{
    if (keyCode.which == 38 || keyCode.which == 40) {
      keyRotatingY = 0;
    }
    if (keyCode.which == 37 || keyCode.which == 39) {
      keyRotatingX = 0;
    }
  })





  var restoringX, restoringY = false;
  var inteX, finalNumberX, inteY, finalNumberY;
  function restore() {

    //para Eje X
    intX = Math.floor(cube.rotation.x / (2 * Math.PI));
    if (cube.rotation.x < 0) {
      intX += 1;
    }
    finalNumberX = cube.rotation.x / (2 * Math.PI) - intX;
    finalNumberX = finalNumberX*(2*Math.PI)

    //para Eje Y
    intY = Math.floor(cube.rotation.y / (2 * Math.PI));
    if (cube.rotation.y < 0) {
      intY += 1;
    }
    finalNumberY = cube.rotation.y / (2 * Math.PI) - intY;
    finalNumberY = finalNumberY*(2*Math.PI)


    cube.rotation.x = finalNumberX;
    cube.rotation.y = finalNumberY;
    restoringX = true;
    restoringY = true;
    animationRestore()
  }

  function animationRestore(){
    requestAnimationFrame(animationRestore);
    if (restoringX) {
      if (cube.rotation.x > 0) {
        cube.rotation.x -= .05;
        if (cube.rotation.x <0.05) {
          cube.rotation.x = 0;
          restoringX = false;
        }
      }
      if (cube.rotation.x < 0) {
        cube.rotation.x += .05;
        if (cube.rotation.x > -0.05) {
          cube.rotation.x = 0;
          restoringX = false;
        }
      }
    }
    if(restoringY){
      if (cube.rotation.y > 0) {
        cube.rotation.y -= .05;
        if (cube.rotation.y <0.05) {
          cube.rotation.y = 0;
          restoringY = false;
        }
      }
      if (cube.rotation.y < 0) {
        cube.rotation.y += .05;
        if (cube.rotation.y > -0.05) {
          cube.rotation.y = 0;
          restoringY = false;
        }
      }


    }

    render.render(scene, camera);
  }



  function animate() {
    requestAnimationFrame(animate);
    if (rotating) {
      cube.rotation.x +=.01;
      cube.rotation.y += .04;
    }
    cube.rotation.x += keyRotatingY;
    cube.rotation.y += keyRotatingX;
    render.render(scene, camera);
    console.log("cubo eje X: " +cube.rotation.x + " Cubo eje Y: " + cube.rotation.y);

   }

   animate()


})
