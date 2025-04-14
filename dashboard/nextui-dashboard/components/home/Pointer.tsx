import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PointMarker = ({ targetPosition }: { targetPosition: THREE.Vector3 }) => {
  const meshRef = useRef<THREE.Mesh>(null!); // Create a ref for the mesh
  const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3(0, 0, 0)); // Track position state

  // Sync target position with current position initially
  useEffect(() => {
    setCurrentPosition(targetPosition);
  }, [targetPosition]);

  // Update mesh position smoothly over time
  useFrame(() => {
    if (meshRef.current) {
      const distance = currentPosition.distanceTo(targetPosition);
      
      if (distance > 0.01) {
        // Smoothly interpolate the position directly, but using state to track
        const newPosition = currentPosition.clone().lerp(targetPosition, 0.1);
        setCurrentPosition(newPosition);  // Update state to trigger re-render without snapping
      } else {
        // Stop updating once the target is very close to the current position
        setCurrentPosition(targetPosition); // Ensure final position is reached
      }

      // Apply the current position to the mesh
      meshRef.current.position.copy(currentPosition);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
