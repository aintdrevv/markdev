import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';
import { useTheme } from '../../theme/ThemeProvider.jsx';

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
  const { isLightTheme } = useTheme();

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
        <hemisphereLight
          intensity={isLightTheme ? 1.05 : 0.78}
          groundColor={isLightTheme ? '#d7d0f3' : '#14182a'}
          color={isLightTheme ? '#f7f4ff' : '#a79dff'}
        />
        <ambientLight intensity={isLightTheme ? 1.2 : 0.95} />
        <directionalLight
          position={[4, 5, 4]}
          intensity={isLightTheme ? 2 : 1.55}
          color={isLightTheme ? '#ffffff' : '#d7d0ff'}
        />
        <directionalLight
          position={[-3, 2, -4]}
          intensity={isLightTheme ? 0.62 : 0.52}
          color={isLightTheme ? '#b9b0ff' : '#6f7dff'}
        />
        <Suspense fallback={null}>
          <MiniIveModel />
        </Suspense>
        <OrbitControls
          enablePan
          enableZoom={false}
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
