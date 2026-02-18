// script.js - Initialization of a Three.js 3D scene with particle effects, vortex animation, smooth scrolling, intersection observer for fade-in animations, and window resize handling.

import * as THREE from 'three';

let scene, camera, renderer, particleSystem;

function init() {
    // Initialize scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Particle system
    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 200;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Vortex animation
    camera.position.z = 5;

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    // Intersection Observer setup
    setupIntersectionObserver();
    // Start animation
    animate();
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.01;  // Vortex animation effect
    renderer.render(scene, camera);
}

init();
