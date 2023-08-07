import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef(null);
  const animationMixer = useRef(null);

  useEffect(() => {
    // Three.js initialization
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load FBX model
    const loader = new THREE.FBXLoader();
    loader.load('/path/to/your/fbx/file.fbx', (fbx) => {
      scene.add(fbx);
      animationMixer.current = new THREE.AnimationMixer(fbx);
      const action = animationMixer.current.clipAction(fbx.animations[0]);
      action.play();
    });

    // Animation update function
    const animate = () => {
      requestAnimationFrame(animate);

      if (animationMixer.current) {
        animationMixer.current.update(0.01); // You can adjust the time delta here
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
