// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
document.getElementById("canvas").appendChild(renderer.domElement);

// Detailed SVG for a recognizable pineapple with 80s flair
const svgMarkup = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <!-- Pineapple body with spiky texture -->
        <path d="M90 60 Q95 50, 100 60 Q105 50, 110 60 Q115 50, 120 60 Q125 50, 130 60
                 Q135 70, 130 80 Q135 90, 130 100 Q135 110, 130 120 Q135 130, 130 140
                 Q125 150, 120 140 Q115 150, 110 140 Q105 150, 100 140 Q95 150, 90 140
                 Q85 130, 90 120 Q85 110, 90 100 Q85 90, 90 80 Q85 70, 90 60"
                 fill="#ffff00" />
        <!-- Detailed neon texture lines -->
        <path d="M90 60 L95 70 M100 60 L105 70 M110 60 L115 70 M120 60 L125 70
                 M130 80 L125 90 M130 100 L125 110 M130 120 L125 130
                 M90 80 L95 90 M90 100 L95 110 M90 120 L95 130
                 M95 70 L100 80 M105 70 L110 80 M115 70 L120 80
                 M100 80 L105 90 M110 80 L115 90 M120 90 L125 100"
                 stroke="#ff00ff" stroke-width="2" fill="none" />
        <!-- Retro jagged leaves -->
        <path d="M100 60 L110 40 Q115 30, 120 35 Q125 40, 130 30 Q135 25, 140 35 L125 50" fill="#00ffff" />
        <path d="M100 60 L95 35 Q90 25, 85 30 Q80 35, 75 25 Q70 20, 65 30 L80 50" fill="#00ffff" />
        <path d="M100 60 L105 30 Q110 20, 115 25 Q120 30, 125 20 Q130 15, 135 25 L115 45" fill="#00ffff" />
        <path d="M100 60 L115 35 Q120 25, 125 30 Q130 35, 135 25 L120 45" fill="#00ffff" />
    </svg>
`;
const loader = new window.SVGLoader();
const svgData = loader.parse(svgMarkup);
const shapes = svgData.paths.map((path) => path.toShapes(true));

// Group shapes into a single object
const pineappleGroup = new THREE.Group();
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
  pineappleGroup.add(mesh);
});

// Center and scale the group
const box = new THREE.Box3().setFromObject(pineappleGroup);
const center = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3());
const maxDimension = Math.max(size.x, size.y, size.z);
const scaleFactor = 180 / maxDimension; // Fit within 180 units
pineappleGroup.scale.set(scaleFactor, scaleFactor, scaleFactor); // Scale down uniformly

// Move meshes to center within the group, then flip
pineappleGroup.children.forEach((mesh) => {
  mesh.position.sub(center); // Shift each mesh to origin relative to group
});
pineappleGroup.rotation.x = Math.PI; // Flip upright (leaves on top)

// Position group at scene center with slight lift
pineappleGroup.position.set(0, 20, 0); // Simple centering with vertical adjustment
scene.add(pineappleGroup);

// Position the camera to face the front
camera.position.set(0, 0, 200); // Pull back to fit rotation
camera.lookAt(0, 0, 0); // Look at center

// Animation loop with a turntable spin
function animate() {
  requestAnimationFrame(animate);
  pineappleGroup.rotation.y += 0.02; // Turntable spin around vertical axis
  renderer.render(scene, camera);
}
animate();
