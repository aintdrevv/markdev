import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Center, useGLTF } from '@react-three/drei';
import { useTheme } from '../../theme/ThemeProvider.jsx';

function ModelAsset() {
  const { scene } = useGLTF('/models/Minive.glb');
  const modelRef = useRef(null);

  useFrame((state) => {
    if (!modelRef.current) return;

    const t = state.clock.getElapsedTime();
    modelRef.current.position.y = Math.sin(t * 0.9) * 0.12;
    modelRef.current.rotation.y = Math.PI / 10 + Math.sin(t * 0.55) * 0.08;
    modelRef.current.rotation.z = Math.sin(t * 0.7) * 0.02;
  });

  return (
    <Bounds fit clip margin={1.15}>
      <Center>
        <group ref={modelRef}>
          <primitive object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

useGLTF.preload('/models/Minive.glb');

export default function ModelPreview() {
  const { isLightTheme } = useTheme();

  return (
    <div className="project-model-preview">
      <Canvas
        className="project-model-canvas"
        camera={{ position: [0, 0.8, 5], fov: 32 }}
        frameloop="always"
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
          <ModelAsset />
        </Suspense>
      </Canvas>
    </div>
  );
}
