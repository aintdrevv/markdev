import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';

function MiniIveModel() {
  const { scene } = useGLTF('/models/MiniIVE.glb');

  return (
    <Bounds fit clip observe margin={1.15}>
      <Center>
        <primitive object={scene} rotation={[0, Math.PI / 10, 0]} />
      </Center>
    </Bounds>
  );
}

useGLTF.preload('/models/MiniIVE.glb');

export default function MiniIvePreview() {
  return (
    <div className="project-model-preview">
      <Canvas
        className="project-model-canvas"
        camera={{ position: [0, 0.8, 5], fov: 32 }}
        dpr={[1.2, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows={false}
      >
        <color attach="background" args={['transparent']} />
        <hemisphereLight intensity={0.9} groundColor="#1a2035" color="#ffffff" />
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} />
        <directionalLight position={[-3, 2, -4]} intensity={0.75} color="#9db4ff" />
        <Suspense fallback={null}>
          <MiniIveModel />
        </Suspense>
        <OrbitControls
          enablePan
          enableZoom
          enableDamping
          dampingFactor={0.08}
          maxDistance={8}
          minDistance={2.4}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}
