import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";

const mount = document.getElementById("react-three-library");
const CHARACTER_MODELS = [
  "./assets/84592a67a317452f.glb",
  "./assets/alternate-character.glb",
];

if (mount) {
  initLibraryScene(mount);
}

function initLibraryScene(container) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#16100c", 14, 40);

  const camera = new THREE.PerspectiveCamera(
    container.clientWidth < 768 ? 60 : 42,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 3.8, 20.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight("#f3dec0", 1.25);
  scene.add(ambient);

  const key = new THREE.DirectionalLight("#fff2d1", 2.1);
  key.position.set(8, 10, 6);
  scene.add(key);

  const fill = new THREE.PointLight("#ffc984", 18, 28, 2);
  fill.position.set(0, 5.5, 2);
  scene.add(fill);

  const root = new THREE.Group();
  root.position.set(0, -2.2, 0);
  scene.add(root);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(12, 64),
    new THREE.MeshStandardMaterial({ color: "#5c3922", roughness: 0.96 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  root.add(floor);

  const floorRing = new THREE.Mesh(
    new THREE.RingGeometry(4.8, 8.4, 48),
    new THREE.MeshStandardMaterial({ color: "#b98b4d", roughness: 0.82, side: THREE.DoubleSide })
  );
  floorRing.rotation.x = -Math.PI / 2;
  floorRing.position.y = -0.01;
  root.add(floorRing);

  root.add(createLibraryBackdrop());

  const dust = createDust();
  root.add(dust);

  const character = createCharacter();
  root.add(character.group);
  loadCharacterModel(character, 0);

  loadLibraryModel(root);

  const interactiveBooks = [];
  const interactiveTargets = [];
  createShelfStand(root, -4.95, 1.25, 1.35, "left");
  createShelfStand(root, 4.95, 1.25, 1.35, "right");
  createBookColumn(root, interactiveBooks, interactiveTargets, [
    { key: "summary", title: "Summary", detail: "AI/ML profile + goals", color: "#c38e3d", x: -4.95, y: 2.95, z: 1.58 },
    { key: "education", title: "Education", detail: "UNT graduate path", color: "#7e5f95", x: -4.95, y: 1.98, z: 1.58 },
    { key: "coursework", title: "Coursework", detail: "ML, NLP, data systems", color: "#7c9871", x: -4.95, y: 1.01, z: 1.58 },
    { key: "skills", title: "Skills", detail: "Python, SQL, React, LLMs", color: "#5d7f8b", x: -4.95, y: 0.04, z: 1.58 },
  ]);
  createBookColumn(root, interactiveBooks, interactiveTargets, [
    { key: "experience", title: "Experience", detail: "AI intern + software work", color: "#b66145", x: 4.95, y: 2.95, z: 1.58 },
    { key: "projects", title: "Projects", detail: "startup + traffic CV", color: "#46526a", x: 4.95, y: 1.98, z: 1.58 },
    { key: "certifications", title: "Certifications", detail: "proof of technical growth", color: "#9a7a3a", x: 4.95, y: 1.01, z: 1.58 },
  ]);

  let activeBook = null;
  let hoveredBook = null;
  let hoveredCharacter = false;
  let lastCharacterClickAt = 0;
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  const walkBounds = {
    minX: -5.6,
    maxX: 5.6,
    minZ: -2.8,
    maxZ: 5.6,
  };

  const target = new THREE.Vector3(0, 0, 2.2);
  const position = new THREE.Vector3(0, 0, 2.2);
  const keyboardMove = new THREE.Vector3();
  const moveVector = new THREE.Vector2();
  const clock = new THREE.Clock();

  window.addEventListener("keydown", (event) => {
    if (event.key in keys) {
      keys[event.key] = true;
      event.preventDefault();
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.key in keys) {
      keys[event.key] = false;
      event.preventDefault();
    }
  });

  window.addEventListener("library-panel-select", (event) => {
    const panel = event.detail?.panel;
    const nextActive = interactiveBooks.find((book) => book.userData.panel === panel) || null;
    if (activeBook && activeBook !== nextActive) {
      setBookActive(activeBook, false);
    }
    activeBook = nextActive;
    if (activeBook) {
      setBookActive(activeBook, true);
    }
  });

  container.addEventListener("pointermove", (event) => {
    updatePointerFromEvent(event, container, pointer);
    const nextHovered = getBookAtPointer(raycaster, pointer, camera, interactiveTargets);
    const nextHoveredCharacter = !nextHovered && isCharacterAtPointer(raycaster, pointer, camera, character);

    if (hoveredBook !== nextHovered) {
      if (hoveredBook) {
        setBookHighlight(hoveredBook, false);
      }
      hoveredBook = nextHovered;
      if (hoveredBook) {
        setBookHighlight(hoveredBook, true);
      }
    }

    hoveredCharacter = nextHoveredCharacter;
    container.style.cursor = hoveredBook || hoveredCharacter ? "pointer" : "";

    target.x = THREE.MathUtils.clamp(pointer.x * 4.8, walkBounds.minX, walkBounds.maxX);
    target.z = THREE.MathUtils.clamp(2.5 + pointer.y * -2.9, walkBounds.minZ, walkBounds.maxZ);
  });

  container.addEventListener("pointerleave", () => {
    if (hoveredBook) {
      setBookHighlight(hoveredBook, false);
      hoveredBook = null;
      container.style.cursor = "";
    }
    hoveredCharacter = false;
  });

  container.addEventListener("click", (event) => {
    updatePointerFromEvent(event, container, pointer);
    const clickedBook = getBookAtPointer(raycaster, pointer, camera, interactiveTargets) || hoveredBook;
    if (clickedBook) {
      openBook(clickedBook);
      return;
    }

    if (isCharacterAtPointer(raycaster, pointer, camera, character)) {
      const now = performance.now();
      if (now - lastCharacterClickAt < 450) {
        toggleCharacterModel(character);
        lastCharacterClickAt = 0;
      } else {
        lastCharacterClickAt = now;
      }
    }
  });

  container.addEventListener("dblclick", (event) => {
    updatePointerFromEvent(event, container, pointer);
    if (isCharacterAtPointer(raycaster, pointer, camera, character)) {
      toggleCharacterModel(character);
    }
  });

  const onResize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    camera.aspect = width / height;
    
    // Adjust FOV for mobile (portrait) to keep the scene framed
    if (width < 768) {
      camera.fov = 60; // Wider FOV for vertical screens
    } else {
      camera.fov = 42;
    }
    
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("resize", onResize);

  const animate = () => {
    const delta = Math.min(clock.getDelta(), 0.033);
    const time = clock.elapsedTime;

    keyboardMove.set(
      (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0),
      0,
      (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0)
    );

    if (keyboardMove.lengthSq() > 0) {
      keyboardMove.normalize().multiplyScalar(delta * 2.2);
      target.x = THREE.MathUtils.clamp(target.x + keyboardMove.x, walkBounds.minX, walkBounds.maxX);
      target.z = THREE.MathUtils.clamp(target.z + keyboardMove.z, walkBounds.minZ, walkBounds.maxZ);
    }

    position.lerp(target, 0.035);
    character.group.position.copy(position);

    moveVector.set(target.x - position.x, target.z - position.z);
    const speed = Math.min(moveVector.length() * 2.8, 0.82);

    if (moveVector.lengthSq() > 0.0008) {
      const angle = Math.atan2(moveVector.x, moveVector.y);
      character.group.rotation.y += (angle - character.group.rotation.y) * 0.055;
    }

    const swing = Math.sin(time * (2.1 + speed * 1.6)) * (0.08 + speed * 0.18);
    character.leftArm.rotation.x = swing;
    character.rightArm.rotation.x = -swing;
    animateProceduralWalk(character, time, speed);
    if (character.mixer) {
      character.mixer.update(delta * (0.45 + speed * 0.25));
    } else if (character.walkRig) {
      animateHumanoidRig(character.walkRig, time, speed);
    }

    interactiveBooks.forEach((book, index) => {
      const targetDepth = book.userData.isActive ? 0.88 : book.userData.isHovered ? 0.62 : 0.42;
      const bob = Math.sin(time * 0.9 + index * 0.8) * 0.04;
      book.position.z += (book.userData.baseZ + targetDepth - book.position.z) * 0.12;
      book.position.y += (book.userData.baseY + bob - book.position.y) * 0.08;
      book.rotation.y += ((book.userData.side === "left" ? 0.26 : -0.26) - book.rotation.y) * 0.1;
      updateBookLabelTransform(book);
    });

    dust.rotation.y = time * 0.02;
    dust.position.y = Math.sin(time * 0.25) * 0.1;

    camera.position.x += ((position.x * 0.16) - camera.position.x) * 0.05;
    camera.position.y += ((4 + Math.sin(time * 0.25) * 0.08) - camera.position.y) * 0.05;
    camera.position.z += ((19.8 - Math.abs(position.x) * 0.08) - camera.position.z) * 0.05;
    camera.lookAt(position.x * 0.16, 2.18, position.z * 0.13);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}

function updatePointerFromEvent(event, container, pointer) {
  const rect = container.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function loadLibraryModel(root) {
  const loader = new GLTFLoader();

  loader.load(
    "./assets/library-scene.glb",
    (gltf) => {
      const model = gltf.scene || gltf.scenes?.[0];
      if (!model) {
        return;
      }

      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const targetWidth = 16;
      const targetHeight = 9;
      const scaleByWidth = size.x > 0 ? targetWidth / size.x : 1;
      const scaleByHeight = size.y > 0 ? targetHeight / size.y : 1;
      const scale = Math.min(scaleByWidth, scaleByHeight) * 0.96;
      model.scale.setScalar(scale);

      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = new THREE.Vector3();
      scaledBox.getCenter(scaledCenter);

      model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z - 1.6);
      model.rotation.y = 0;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });

      root.add(model);
    },
    undefined,
    (error) => {
      console.error("Failed to load library model", error);
    }
  );
}

function createBookColumn(root, interactiveBooks, interactiveTargets, definitions) {
  definitions.forEach((definition) => {
    const book = createInteractiveBook(definition);
    book.position.set(definition.x, definition.y, definition.z);
    book.userData.baseY = definition.y;
    book.userData.baseZ = definition.z;
    book.userData.side = definition.x < 0 ? "left" : "right";
    interactiveBooks.push(book);
    interactiveTargets.push(book);
    root.add(book);

    const label = createBookLabel(definition, definition.x < 0 ? "left" : "right");
    label.userData.panel = definition.key;
    label.userData.book = book;
    book.userData.label = label;
    updateBookLabelTransform(book);
    interactiveTargets.push(label);
    root.add(label);
  });
}

function createInteractiveBook(definition) {
  const geometry = new THREE.BoxGeometry(0.9, 1.72, 0.52);
  const material = new THREE.MeshStandardMaterial({
    color: definition.color,
    roughness: 0.5,
    emissive: new THREE.Color(definition.color),
    emissiveIntensity: 0.18,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.panel = definition.key;
  mesh.userData.isHovered = false;
  mesh.userData.isActive = false;
  return mesh;
}

function createShelfStand(root, x, centerY, z, side) {
  const group = new THREE.Group();
  group.position.set(x, centerY, z - 0.22);

  const wood = new THREE.MeshStandardMaterial({ color: "#59361f", roughness: 0.82 });
  const backGeo = new THREE.BoxGeometry(2.1, 5.2, 0.28);
  const sideGeo = new THREE.BoxGeometry(0.22, 5.2, 1.34);
  const plankGeo = new THREE.BoxGeometry(2.02, 0.12, 1.22);

  const back = new THREE.Mesh(backGeo, wood);
  group.add(back);

  const leftSide = new THREE.Mesh(sideGeo, wood);
  leftSide.position.set(-0.94, 0, 0.48);
  group.add(leftSide);

  const rightSide = new THREE.Mesh(sideGeo, wood);
  rightSide.position.set(0.94, 0, 0.48);
  group.add(rightSide);

  [1.82, 0.86, -0.1, -1.06, -2.02].forEach((y) => {
    const plank = new THREE.Mesh(plankGeo, wood);
    plank.position.set(0, y, 0.48);
    group.add(plank);
  });

  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(2.34, 0.22, 1.42),
    new THREE.MeshStandardMaterial({ color: "#7a4d29", roughness: 0.74 })
  );
  crown.position.set(0, 2.58, 0.5);
  group.add(crown);

  group.rotation.y = side === "left" ? 0.1 : -0.1;

  root.add(group);
}

function createBookLabel(definition, side) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 480;
  const ctx = canvas.getContext("2d");
  const accent = definition.color || "#b98b4d";
  const title = definition.title;
  const detail = definition.detail || "open dossier";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(42, 64, canvas.width - 42, canvas.height - 64);
  gradient.addColorStop(0, "rgba(44, 24, 12, 0.98)");
  gradient.addColorStop(0.5, "rgba(105, 61, 25, 0.98)");
  gradient.addColorStop(1, "rgba(223, 179, 95, 0.98)");
  ctx.fillStyle = gradient;
  roundRect(ctx, 48, 58, canvas.width - 96, canvas.height - 116, 64);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 236, 194, 0.9)";
  ctx.lineWidth = 18;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 244, 216, 0.16)";
  roundRect(ctx, 82, 94, canvas.width - 164, canvas.height - 188, 42);
  ctx.fill();

  ctx.shadowColor = accent;
  ctx.shadowBlur = 34;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  roundRect(ctx, 86, 98, canvas.width - 172, canvas.height - 196, 38);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(24, 12, 5, 0.42)";
  roundRect(ctx, 118, 122, canvas.width - 236, 214, 34);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 242, 204, 0.28)";
  ctx.fillRect(158, 142, canvas.width - 316, 4);
  ctx.fillRect(158, 328, canvas.width - 316, 4);
  ctx.fillStyle = accent;
  ctx.fillRect(214, 336, canvas.width - 428, 9);

  ctx.save();
  ctx.translate(canvas.width / 2, 218);
  ctx.shadowColor = "rgba(255, 213, 124, 0.95)";
  ctx.shadowBlur = 26;
  ctx.fillStyle = "#fff2c8";
  ctx.font = "900 118px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "rgba(36, 18, 7, 0.94)";
  ctx.lineWidth = 12;
  ctx.strokeText(title, 0, 0);
  ctx.fillText(title, 0, 0);
  ctx.restore();

  ctx.fillStyle = "rgba(255, 242, 204, 0.86)";
  ctx.font = "700 34px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(detail, canvas.width / 2, 294);

  ctx.fillStyle = accent;
  ctx.font = "800 26px Georgia, serif";
  ctx.fillText("OPEN FULL RECORD", canvas.width / 2, 392);

  ctx.fillStyle = "rgba(255, 242, 204, 0.82)";
  ctx.font = "700 34px Georgia, serif";
  ctx.fillText("◆", 128, 226);
  ctx.fillText("◆", canvas.width - 128, 226);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
  );
  sprite.scale.set(2.6, 0.97, 1);
  sprite.renderOrder = 20;
  return sprite;
}

function updateBookLabelTransform(book) {
  const label = book.userData.label;
  if (!label) {
    return;
  }

  label.position.set(
    book.position.x + (book.userData.side === "left" ? 0.08 : -0.08),
    book.position.y + 0.04,
    book.position.z + 0.92
  );
  label.scale.set(
    book.userData.isActive ? 2.83 : book.userData.isHovered ? 2.71 : 2.6,
    book.userData.isActive ? 1.06 : book.userData.isHovered ? 1.01 : 0.97,
    1
  );
}

function getBookFromTarget(target) {
  if (!target) {
    return null;
  }

  return target.userData.book || target;
}

function getBookAtPointer(raycaster, pointer, camera, interactiveTargets) {
  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(interactiveTargets, false);
  return getBookFromTarget(intersections[0]?.object || null);
}

function openBook(book) {
  if (!book?.userData?.panel) {
    return;
  }

  window.dispatchEvent(new CustomEvent("library-panel-select", {
    detail: { panel: book.userData.panel },
  }));
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function createLibraryBackdrop() {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: "#332116", roughness: 0.9 });
  const trimMat = new THREE.MeshStandardMaterial({ color: "#7a522f", roughness: 0.78 });

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(14.5, 7.6, 0.4), wallMat);
  backWall.position.set(0, 3.4, -4.8);
  group.add(backWall);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7.6, 9), wallMat);
  leftWall.position.set(-7.2, 3.4, -0.6);
  group.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.position.x = 7.2;
  group.add(rightWall);

  for (let i = -3; i <= 3; i += 1) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3.2, 0.12), trimMat);
    panel.position.set(i * 2, 2.6, -4.55);
    group.add(panel);
  }

  const arch = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.18, 16, 48, Math.PI),
    new THREE.MeshStandardMaterial({ color: "#9f7141", roughness: 0.64 })
  );
  arch.position.set(0, 4.6, -4.56);
  group.add(arch);

  return group;
}

function setBookHighlight(mesh, active) {
  if (!mesh?.material) {
    return;
  }
  mesh.userData.isHovered = active;
  mesh.material.emissiveIntensity = active ? 0.55 : mesh.userData.isActive ? 0.9 : 0.18;
}

function setBookActive(mesh, active) {
  if (!mesh?.material) {
    return;
  }
  mesh.userData.isActive = active;
  mesh.material.emissiveIntensity = active ? 0.9 : mesh.userData.isHovered ? 0.55 : 0.18;
}

function createCharacter() {
  const group = new THREE.Group();
  group.position.set(0, 0, 2.2);
  const modelAnchor = new THREE.Group();
  group.add(modelAnchor);

  const clickTarget = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.72, 3.9, 16),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  clickTarget.position.set(0, 1.95, 0);
  clickTarget.userData.isCharacterClickTarget = true;
  group.add(clickTarget);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 24),
    new THREE.MeshBasicMaterial({ color: "#110c09", transparent: true, opacity: 0.28 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.02, 0);
  group.add(shadow);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshStandardMaterial({ color: "#b17c58", roughness: 0.72 })
  );
  head.position.set(0, 2.45, 0);
  group.add(head);

  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.32, 1.1, 8, 16),
    new THREE.MeshStandardMaterial({ color: "#d8d8dc", roughness: 0.58 })
  );
  torso.position.set(0, 1.55, 0);
  group.add(torso);

  const leftArm = createLimb("#1a1d22", 0.9);
  leftArm.position.set(-0.42, 1.86, 0);
  group.add(leftArm);
  const rightArm = createLimb("#1a1d22", 0.9);
  rightArm.position.set(0.42, 1.86, 0);
  group.add(rightArm);

  const leftLeg = createLeg("#15181d");
  leftLeg.position.set(-0.14, 0.66, 0);
  group.add(leftLeg);
  const rightLeg = createLeg("#15181d");
  rightLeg.position.set(0.14, 0.66, 0);
  group.add(rightLeg);

  return {
    group,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    placeholderParts: [shadow, head, torso, leftArm, rightArm, leftLeg, rightLeg],
    clickTarget,
    modelAnchor,
    activeModelIndex: 0,
    isModelLoading: false,
    modelRoot: null,
    mixer: null,
    walkRig: null,
  };
}

function createLimb(color, length) {
  const group = new THREE.Group();
  const limb = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.08, length, 8, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.65 })
  );
  limb.position.set(0, -length / 2, 0);
  group.add(limb);
  return group;
}

function createLeg(color) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });

  const upper = new THREE.Group();
  const upperMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.56, 8, 12), material);
  upperMesh.position.set(0, -0.28, 0);
  upper.add(upperMesh);
  group.add(upper);

  const lower = new THREE.Group();
  lower.position.set(0, -0.6, 0);
  const lowerMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.5, 8, 12), material);
  lowerMesh.position.set(0, -0.25, 0);
  lower.add(lowerMesh);
  upper.add(lower);

  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.34), material);
  foot.position.set(0, -0.54, 0.1);
  lower.add(foot);

  group.userData.upper = upper;
  group.userData.lower = lower;
  group.userData.foot = foot;
  return group;
}

function animateProceduralWalk(character, time, speed) {
  const phase = time * (1.55 + speed * 1.35);
  const stride = 0.16 + speed * 0.38;
  animateProceduralLeg(character.leftLeg, phase, stride, 1);
  animateProceduralLeg(character.rightLeg, phase + Math.PI, stride, -1);
}

function animateProceduralLeg(leg, phase, stride, side) {
  const upper = leg.userData.upper;
  const lower = leg.userData.lower;
  const foot = leg.userData.foot;
  if (!upper || !lower || !foot) {
    leg.rotation.x = Math.sin(phase) * stride;
    return;
  }

  const step = Math.sin(phase);
  const lift = Math.max(0, Math.sin(phase + Math.PI * 0.25));
  upper.rotation.x = step * stride;
  upper.rotation.z = side * (0.025 + lift * 0.025);
  lower.rotation.x = Math.max(0, -step) * stride * 1.45 + lift * 0.22;
  foot.rotation.x = -step * stride * 0.38 - lift * 0.18;
}

function createDust() {
  const count = 120;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = Math.random() * 6 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: "#fff2d4",
      size: 0.07,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })
  );
}

function loadCharacterModel(character, modelIndex) {
  const modelUrl = CHARACTER_MODELS[modelIndex];
  if (!modelUrl || character.isModelLoading) {
    return;
  }

  character.isModelLoading = true;
  const loader = new GLTFLoader();

  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene || gltf.scenes?.[0];
      if (!model) {
        character.isModelLoading = false;
        return;
      }

      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);

      const targetHeight = 3.9;
      const scale = size.y > 0 ? targetHeight / size.y : 1;
      model.scale.setScalar(scale);

      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = new THREE.Vector3();
      scaledBox.getCenter(scaledCenter);

      model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);
      model.rotation.y = 0;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });

      if (character.modelRoot) {
        character.modelAnchor.remove(character.modelRoot);
        disposeObject(character.modelRoot);
      }

      character.modelAnchor.add(model);
      character.modelRoot = model;
      character.activeModelIndex = modelIndex;
      character.mixer = null;
      character.walkRig = null;
      character.placeholderParts.forEach((part) => {
        part.visible = false;
      });

      if (gltf.animations && gltf.animations.length > 0) {
        const clip = selectWalkClip(gltf.animations);
        if (clip) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(clip);
          action.timeScale = 0.72;
          action.play();
          character.mixer = mixer;
        } else {
          character.walkRig = findHumanoidWalkRig(model);
        }
      } else {
        character.walkRig = findHumanoidWalkRig(model);
      }
      character.isModelLoading = false;
    },
    undefined,
    (error) => {
      character.isModelLoading = false;
      console.error(`Failed to load character model: ${modelUrl}`, error);
    }
  );
}

function toggleCharacterModel(character) {
  const nextModelIndex = (character.activeModelIndex + 1) % CHARACTER_MODELS.length;
  loadCharacterModel(character, nextModelIndex);
}

function isCharacterAtPointer(raycaster, pointer, camera, character) {
  if (!character.clickTarget) {
    return false;
  }

  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObject(character.clickTarget, false).length > 0;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.geometry?.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material?.dispose());
    }
  });
}

function selectWalkClip(animations) {
  return animations.find((clip) => /walk|walking|locomotion|stride/i.test(clip.name))
    || animations.find((clip) => !/idle|pose|t[-_ ]?pose/i.test(clip.name))
    || null;
}

function findHumanoidWalkRig(model) {
  const bones = [];
  model.traverse((child) => {
    if (child.isBone) {
      bones.push(child);
    }
  });

  const rig = {
    leftUpper: findBone(bones, [/left.*up.*leg/i, /left.*thigh/i, /l.*up.*leg/i]),
    leftLower: findBone(bones, [/left.*calf/i, /left.*shin/i, /left.*leg/i, /l.*leg/i], [/up.*leg/i, /thigh/i]),
    leftFoot: findBone(bones, [/left.*foot/i, /l.*foot/i]),
    rightUpper: findBone(bones, [/right.*up.*leg/i, /right.*thigh/i, /r.*up.*leg/i]),
    rightLower: findBone(bones, [/right.*calf/i, /right.*shin/i, /right.*leg/i, /r.*leg/i], [/up.*leg/i, /thigh/i]),
    rightFoot: findBone(bones, [/right.*foot/i, /r.*foot/i]),
  };

  if (!rig.leftUpper || !rig.rightUpper) {
    return null;
  }

  return rig;
}

function findBone(bones, patterns, rejectPatterns = []) {
  return bones.find((bone) => (
    patterns.some((pattern) => pattern.test(bone.name))
    && !rejectPatterns.some((pattern) => pattern.test(bone.name))
  )) || null;
}

function animateHumanoidRig(rig, time, speed) {
  const phase = time * (1.55 + speed * 1.35);
  const stride = 0.16 + speed * 0.38;
  animateHumanoidLeg(rig.leftUpper, rig.leftLower, rig.leftFoot, phase, stride);
  animateHumanoidLeg(rig.rightUpper, rig.rightLower, rig.rightFoot, phase + Math.PI, stride);
}

function animateHumanoidLeg(upper, lower, foot, phase, stride) {
  const step = Math.sin(phase);
  const lift = Math.max(0, Math.sin(phase + Math.PI * 0.25));
  if (upper) {
    upper.rotation.x = step * stride;
  }
  if (lower) {
    lower.rotation.x = Math.max(0, -step) * stride * 1.45 + lift * 0.22;
  }
  if (foot) {
    foot.rotation.x = -step * stride * 0.32 - lift * 0.16;
  }
}
