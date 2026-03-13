/* COUNTDOWN */
const targetDate = new Date("June 15, 2026 00:00:00").getTime();

setInterval(function(){
    let now = new Date().getTime();
    let distance = targetDate - now;

    let days = Math.floor(distance/(1000*60*60*24));
    let hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    let minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    let seconds = Math.floor((distance%(1000*60))/1000);

    document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s until launch";

},1000);


/* STARFIELD */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<200;i++){
    stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2
    });
}

function drawStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";

    stars.forEach(s=>{
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

drawStars();


/* 3D ROCKET */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const viewer = document.getElementById("rocket-viewer");

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(viewer.offsetWidth, 500);
viewer.appendChild(renderer.domElement);

/* --- ROCKET MODEL PLACEHOLDER --- */
// Currently using Three.js geometric shapes (Cylinder + Cone) as a dummy model.
// TO UPLOAD YOUR OWN MODEL LATER:
// 1. Include 'GLTFLoader.js' or 'OBJLoader.js' in your index.html
// 2. Remove the 'Dummy Model Construction' code below.
// 3. Use the loader to add your model to the 'rocket' group:
//    const loader = new THREE.GLTFLoader();
//    loader.load('models/my_rocket.gltf', function(gltf) {
//        rocket.add(gltf.scene);
//    });

/* --- Dummy Model Construction (Delete when using real model) --- */
const bodyGeometry = new THREE.CylinderGeometry(1,1,8,32);
const material = new THREE.MeshStandardMaterial({
    color:0xdddddd,
    roughness: 0.3,
    metalness: 0.8
});
const body = new THREE.Mesh(bodyGeometry,material);

const noseGeometry = new THREE.ConeGeometry(1,2,32);
const noseMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6a00,
    roughness: 0.2,
    metalness: 0.6
});
const nose = new THREE.Mesh(noseGeometry,noseMaterial);
nose.position.y=5;

// Add generic fins so rotation is visible
const finGeometry = new THREE.BoxGeometry(0.2, 2, 2);
const finMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

const fin1 = new THREE.Mesh(finGeometry, finMaterial);
fin1.position.set(1.5, -3, 0);

const fin2 = new THREE.Mesh(finGeometry, finMaterial);
fin2.position.set(-1.5, -3, 0);

const fin3 = new THREE.Mesh(finGeometry, finMaterial);
fin3.position.set(0, -3, 1.5);
fin3.rotation.y = Math.PI / 2;

const fin4 = new THREE.Mesh(finGeometry, finMaterial);
fin4.position.set(0, -3, -1.5);
fin4.rotation.y = Math.PI / 2;

/* ------------------------------------------------------------- */

// The 'rocket' group holds whatever model you use
const rocket = new THREE.Group();
rocket.add(body); // Delete this when using real model
rocket.add(nose); // Delete this when using real model
rocket.add(fin1); // Delete this when using real model
rocket.add(fin2); // Delete this when using real model
rocket.add(fin3); // Delete this when using real model
rocket.add(fin4); // Delete this when using real model
scene.add(rocket);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

camera.position.z=15;

// Rotation Logic (Strictly Horizontal)
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

viewer.addEventListener('pointerdown', (e) => {
    isDragging = true;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
});

window.addEventListener('pointermove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        // ONLY rotate on the Y axis (horizontal rotation)
        // No matter how you drag, it spins left/right, keeping the rocket straight up
        rocket.rotation.y += deltaMove.x * 0.01;
        
        // VERICALLY STRAIGHT CONSTRAINT (X and Z axes always 0)
        rocket.rotation.x = 0;
        rocket.rotation.z = 0;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

// Prevent scrolling when touching the viewer on mobile
viewer.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

function animate(){
    requestAnimationFrame(animate);

    if (!isDragging) {
        // Auto-rotation when idle (horizontal only)
        rocket.rotation.y += 0.005;
        rocket.rotation.x = 0;
        rocket.rotation.z = 0;
    }

    renderer.render(scene,camera);
}

animate();


/* NAVBAR ACTIVE LINK */
const sections = document.querySelectorAll("section, .hero");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if(pageYOffset >= sectionTop){
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }
  });

});

// SMOOTH SCROLLING FOR NAV LINKS
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if(targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80, // offset for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

/* SCROLL REVEAL ANIMATIONS */
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();
