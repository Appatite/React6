
var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;

var color = 'rgba(0,0,64,1)';

var spriteColor = 'rgba(0,0,64,1)';

var threeDiv = document.getElementById("threeDiv");

var threeDivWidth = window.innerWidth;
var threeDivHeight = window.innerHeight;

var windowHalfX = threeDivWidth / 2;
var windowHalfY = threeDivHeight / 2;

setTimeout(function(){
    var range = document.getElementById("range");
    init();
    animate();
}, 500)

function init() {

    colorRange.onchange = (function () {
        console.log(colorRange.value);
        spriteColor = onColorChange(colorRange.value)
    })

    container = threeDiv;

    camera = new THREE.PerspectiveCamera(75, threeDivWidth / threeDivHeight, 1, 5000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    var material = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite()),
        blending: THREE.AdditiveBlending
    });

    for (var i = 0; i < 1000; i++) {

        particle = new THREE.Sprite(material);

        initParticle(particle, i * 10);

        scene.add(particle);
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeDivWidth, threeDivHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

    range.onchange = (function () {
        console.log(range.value)
        onRangeChange(range.value);
    })
}

function onWindowResize() {

    windowHalfX = threeDivWidth / 2;
    windowHalfY = threeDivHeight / 2;

    camera.aspect = threeDivWidth / threeDivHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(threeDivWidth, threeDivHeight);

}

function onRangeChange(value) {

    var newValue = (300 - value)/150
    
    console.log('rangeValue: ' + value)
    console.log('rangeNewValue: ' + newValue)

    if(newValue<=1){
        var threeDivWidth = window.innerWidth / newValue;
    }
    else var threeDivWidth = window.innerWidth;

    var threeDivHeight = window.innerHeight / newValue;
    
    windowHalfX = threeDivWidth / 2;
    windowHalfY = threeDivHeight / 2;

    camera.aspect = threeDivWidth / threeDivHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(threeDivWidth, threeDivHeight);

}

function onColorChange(value) {

var redValue = 256 - value;
    var blueValue = 1 + value;
    color = 'rgba(' + redValue + ',255,' + blueValue + ',1)'
    spriteColor = 'rgba(' + blueValue + ',0,' + redValue + ',1)'
    renderer.setClearColor(spriteColor);

    return spriteColor;
}

function generateSprite() {

    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, spriteColor);
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;

}

function initParticle(particle, delay) {

    var particle = this instanceof THREE.Sprite ? this : particle;
    var delay = delay !== undefined ? delay : 0;

    particle.position.set(0, 0, 0);
    particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

    new TWEEN.Tween(particle)
            .delay(delay)
            .to({}, 10000)
            .onComplete(initParticle)
            .start();

    new TWEEN.Tween(particle.position)
            .delay(delay)
            .to({x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000}, 10000)
            .start();

    new TWEEN.Tween(particle.scale)
            .delay(delay)
            .to({x: 0.01, y: 0.01}, 10000)
            .start();

}

//

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    TWEEN.update();

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);

}
