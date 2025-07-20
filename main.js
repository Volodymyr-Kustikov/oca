import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

const windowH = window.innerHeight;
const windowW = window.innerWidth;

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(75, windowW / windowH, 0.1, 1000);
camera.position.z = 4; 

// 3. Create textures
const loader = new THREE.TextureLoader();

// Load your photo
const photoTexture = loader.load('photo.jpg',
    function(texture) {
        console.log('Photo loaded successfully');
    },
    function(progress) {
        console.log('Loading progress:', progress);
    },
    function(error) {
        console.log('Error loading photo:', error);
        console.log('Make sure your photo file exists in the same folder as your HTML');
    }
);

function createTextTexture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 512;
    canvas.height = 512;
    
    context.fillStyle = '#2c3e50';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.strokeStyle = '#3498db';
    context.lineWidth = 8;
    context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
    
    context.fillStyle = '#ecf0f1';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    context.font = 'bold 32px Arial';
    context.fillText('Volodymyr Kustikov', canvas.width / 2, 140);
    
    context.font = '24px Arial';
    context.fillText('SEBA28 Student', canvas.width / 2, 180);
    
    context.font = '20px Arial';
    context.fillText('Web dev', canvas.width / 2, 210);
    
    context.font = '18px Arial';
    context.fillText('Project:', canvas.width / 2, 250);
    context.fillText('OCA Docker project', canvas.width / 2, 280);
    context.fillText('with Three.js usage', canvas.width / 2, 310);
    
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const textTexture = createTextTexture();

// 4. Create materials
const photoMaterial = new THREE.MeshBasicMaterial({ map: photoTexture });
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

// 5. Create hemisphere geometries
const frontGeometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI);
const backGeometry = new THREE.SphereGeometry(1.5, 32, 16, Math.PI, Math.PI);

const frontHemisphere = new THREE.Mesh(frontGeometry, photoMaterial);

const backHemisphere = new THREE.Mesh(backGeometry, textMaterial);

// Group both hemispheres
const sphereGroup = new THREE.Group();
sphereGroup.add(frontHemisphere);
sphereGroup.add(backHemisphere);
scene.add(sphereGroup);

// 6. Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(windowW, windowH);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x1a1a1a);
document.body.appendChild(renderer.domElement);

// 7. Animate
function animate() {
    requestAnimationFrame(animate);
    sphereGroup.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});