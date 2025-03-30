// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
document.getElementById("canvas").appendChild(renderer.domElement);

// Detailed SVG for a pineapple with 80s flair
const svgMarkup = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <!-- Pineapple body with neon twist -->
        <path d="M100 50 C120 70, 130 100, 120 130 C110 160, 90 160, 80 130 C70 100, 80 70, 100 50" fill="#ffff00" />
        <!-- Neon texture lines -->
        <path d="M100 50 L105 60 M110 70 L115 80 M120 90 L125 100 M115 110 L120 120 M105 130 L110 140 M95 140 L90 130 M85 120 L80 110 M75 100 L80 90 M85 80 L90 70" stroke="#ff00ff" stroke-width="3" fill="none" />
        <!-- Retro leaves -->
        <path d="M100 50 L120 30 C130 20, 140 25, 135 35 L110 55" fill="#00ffff" />
        <path d="M100 50 L90 25 C85 15, 75 20, 80 30 L95 50" fill="#00ffff" />
        <path d="M100 50 L105 20 C110 10, 120 15, 115 25 L100 45" fill="#00ffff" />
    </svg>
`;
const loader = new THREE.SVGLoader();
const svgData = loader.parse(svgMarkup);
const shapes = svgData.paths.map((path) => path.toShapes(true));

// Create 3D geometry for each shape
shapes.forEach((shape) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 20,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 2,
    bevelSegments: 5,
  });
  const material = new THREE.MeshBasicMaterial({
    color: shape.fill === "#ffff00" ? 0xffff00 : 0x00ffff, // Neon yellow and cyan
    wireframe: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

// Position the camera
camera.position.z = 100;

// Animation loop with a retro spin
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.x += 0.015; // Slightly faster spin
  scene.rotation.y += 0.015;
  renderer.render(scene, camera);
}
animate();
