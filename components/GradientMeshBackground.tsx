"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ThemeMode = "dark" | "light";

export default function TechCubesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const readTheme = () => {
      const nextTheme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      setTheme(nextTheme);
    };

    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const isLightTheme = theme === "light";

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

    const isMobile = window.innerWidth < 768;

    const gridHelper = new THREE.GridHelper(
      35,
      35,
      isLightTheme ? 0x3d6ea8 : 0x6bb8ff,
      isLightTheme ? 0x2ea586 : 0x3ec7a2,
    );
    gridHelper.position.y = -6;
    (gridHelper.material as THREE.Material).opacity = isMobile
      ? isLightTheme
        ? 0.07
        : 0.03
      : isLightTheme
        ? 0.12
        : 0.06;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    const cubes: THREE.Mesh[] = [];
    const cubeCount = isMobile ? 4 : 6;

    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? 0x3ec7a2 : i % 3 === 1 ? 0x6bb8ff : 0xffd17b,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: isLightTheme ? 0.62 : 0.5,
        emissive: i % 3 === 0 ? 0x3ec7a2 : i % 3 === 1 ? 0x6bb8ff : 0xffd17b,
        emissiveIntensity: isLightTheme ? 0.14 : 0.1,
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

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile
      ? isLightTheme
        ? 380
        : 300
      : isLightTheme
        ? 760
        : 560;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 35;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: isLightTheme ? 0.05 : 0.032,
      color: isLightTheme ? 0x2f5f93 : 0x8ec9ff,
      transparent: true,
      opacity: isMobile
        ? isLightTheme
          ? 0.68
          : 0.4
        : isLightTheme
          ? 0.82
          : 0.62,
      blending: isLightTheme ? THREE.NormalBlending : THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    camera.position.z = 20;
    camera.position.y = 4;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 0.6 - 0.3;
      targetMouseY = -(event.clientY / window.innerHeight) * 0.6 + 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

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
        const baseEmissive = isLightTheme ? 0.12 : 0.08;
        const pulseEmissive = isLightTheme ? 0.06 : 0.04;
        material.emissiveIntensity =
          baseEmissive + Math.sin(elapsedTime * 1.5 + i) * pulseEmissive;
      });

      particlesMesh.rotation.x = elapsedTime * 0.01;
      particlesMesh.rotation.y = elapsedTime * 0.015;

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

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

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
  }, [theme]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 -z-20 pointer-events-none"
      />
      <div
        ref={mountRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ opacity: theme === "light" ? 0.95 : 0.72 }}
      />
    </>
  );
}
