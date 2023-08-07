import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

const Scene = () => {
  const fbx = useLoader(FBXLoader, "Capoeira.fbx");
  const fbxRef = useRef();
  const animationMixer = useRef(null);

  // Create the animation mixer and play the animation
  useEffect(() => {
    animationMixer.current = new THREE.AnimationMixer(fbxRef.current);
    const animationAction = animationMixer.current.clipAction(fbx.animations[0]);
    animationAction.play();
  }, [fbx]);

  // Update the animation mixer on each frame
  useFrame((_, delta) => {
    if (animationMixer.current) {
      animationMixer.current.update(delta);
    }
  });

  return <primitive object={fbx} ref={fbxRef} scale={0.005} />;
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}


