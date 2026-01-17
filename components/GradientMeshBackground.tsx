"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TechCubesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Tech grid floor
    const gridHelper = new THREE.GridHelper(35, 35, 0x8b5cf6, 0x3b82f6);
    gridHelper.position.y = -6;
    (gridHelper.material as THREE.Material).opacity = 0.06;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Floating tech cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 6;

    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? 0x8b5cf6 : i % 3 === 1 ? 0x3b82f6 : 0x2dd4bf,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.5,
        emissive: i % 3 === 0 ? 0x8b5cf6 : i % 3 === 1 ? 0x3b82f6 : 0x2dd4bf,
        emissiveIntensity: 0.1,
      });

      const cube = new THREE.Mesh(geometry, material);

      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.z = Math.sin(angle) * radius;
      cube.position.y = Math.random() * 4 - 2;

      cube.userData = {
        angle: angle,
        radius: radius,
        speed: 0.15 + Math.random() * 0.2,
        floatSpeed: 0.4 + Math.random() * 0.3,
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.01,
          Math.random() * 0.01,
          Math.random() * 0.01,
        ),
      };

      scene.add(cube);
      cubes.push(cube);
    }

    // 🎯 PARTICELLE PIÙ VISIBILI - MODIFICHE QUI
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700; // ⭐ AUMENTATO da 600 a 700

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 35; // ⭐ Leggermente più sparse
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    camera.position.z = 20;
    camera.position.y = 4;

    // Mouse interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 0.6 - 0.3;
      targetMouseY = -(event.clientY / window.innerHeight) * 0.6 + 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

      // Animated cubes
      cubes.forEach((cube, i) => {
        const data = cube.userData;

        cube.position.x =
          Math.cos(elapsedTime * data.speed + data.angle) * data.radius;
        cube.position.z =
          Math.sin(elapsedTime * data.speed + data.angle) * data.radius;
        cube.position.y = Math.sin(elapsedTime * data.floatSpeed + i) * 0.8;

        cube.rotation.x += data.rotationSpeed.x;
        cube.rotation.y += data.rotationSpeed.y;
        cube.rotation.z += data.rotationSpeed.z;

        const material = cube.material as THREE.MeshPhysicalMaterial;
        material.emissiveIntensity =
          0.08 + Math.sin(elapsedTime * 1.5 + i) * 0.04;
      });

      particlesMesh.rotation.x = elapsedTime * 0.01; // ⭐ Più lento
      particlesMesh.rotation.y = elapsedTime * 0.015; // ⭐ Più lento

      const positions = particlesGeometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const offset = i / 3;
        positions[i] += Math.sin(elapsedTime * 0.05 + offset) * 0.001;
        positions[i + 1] += Math.cos(elapsedTime * 0.06 + offset) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      camera.position.x += (currentMouseX * 8 - camera.position.x) * 0.03;
      camera.position.y += (currentMouseY * 5 - camera.position.y) * 0.03;

      camera.position.z = 20 + Math.sin(elapsedTime * 0.03) * 0.5;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();

      cubes.forEach((cube) => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach((m) => m.dispose());
        } else {
          cube.material.dispose();
        }
      });

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      (gridHelper.material as THREE.Material).dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 -z-20 pointer-events-none"
      />
      <div
        ref={mountRef}
        className="fixed inset-0 -z-10 pointer-events-none opacity-70"
      />
    </>
  );
}
