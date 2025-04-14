// import React, { useState, useEffect } from "react";
// import { Box as StyledBox } from "../styles/box";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import * as THREE from "three";

// const PointMarker = ({ targetPosition }: { targetPosition: THREE.Vector3 }) => {
//   const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(5, 3, -1.2));

//   useEffect(() => {
//     setPosition(targetPosition);
//   }, [targetPosition]);

//   useFrame(() => {
//     const distance = position.distanceTo(targetPosition);
//     if (distance > 0.01) {
//       setPosition((prevPosition) => prevPosition.lerp(targetPosition, 0.1));
//     }
//   });

//   return (
//     <mesh position={position}>
//       <sphereGeometry args={[0.1]} />
//       <meshStandardMaterial color="red" />
//     </mesh>
//   );
// };

// const Model = ({ file, visible, onModelLoad }: { file: File; visible: boolean; onModelLoad: (group: THREE.Group) => void }) => {
//   const [model, setModel] = useState<THREE.Group | null>(null);

//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       const gltfLoader = new GLTFLoader();

//       reader.onload = (event) => {
//         const arrayBuffer = event.target?.result;
//         if (arrayBuffer instanceof ArrayBuffer) {
//           const blob = new Blob([arrayBuffer]);
//           const url = URL.createObjectURL(blob);

//           gltfLoader.load(url, (gltf) => {
//             const loadedModel = gltf.scene;

//             const box = new THREE.Box3().setFromObject(loadedModel);
//             const center = box.getCenter(new THREE.Vector3());
//             const size = box.getSize(new THREE.Vector3());

//             loadedModel.position.set(-center.x, -box.min.y, -center.z);
//             loadedModel.position.set(0, 0, 0);
//             loadedModel.position.set(loadedModel.position.x, 0, loadedModel.position.z); // Keep Y fixed at 0
//             const maxDimension = Math.max(size.x, size.y, size.z);
//             const scaleFactor = 8 / maxDimension;
//             loadedModel.scale.setScalar(scaleFactor);

//             setModel(loadedModel);
//             onModelLoad(loadedModel);
//             URL.revokeObjectURL(url);
//           });
//         }
//       };

//       reader.readAsArrayBuffer(file);
//     }
//   }, [file, onModelLoad]);

//   if (!model || !visible) return null;

//   return <primitive object={model} />;
// };

// const Lights = () => (
//   <>
//     <ambientLight intensity={0.5} />
//     <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
//     <hemisphereLight intensity={0.4} />
//   </>
// );

// const createFloorMeshes = (building: THREE.Group) => {
//   const box = new THREE.Box3().setFromObject(building);
//   const size = box.getSize(new THREE.Vector3());
//   const numFloors = Math.ceil(size.y);
//   const floorHeight = size.y / numFloors;
//   const floorMeshes: THREE.Mesh[] = [];

//   for (let i = 0; i < numFloors; i++) {
//     const geometry = new THREE.BoxGeometry(size.x, floorHeight, size.z);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
//     const mesh = new THREE.Mesh(geometry, material);

//     mesh.position.set(box.min.x + size.x / 2, box.min.y + floorHeight * (i + 0.5), box.min.z + size.z / 2);
//     floorMeshes.push(mesh);
//   }

//   return floorMeshes;
// };

// export const Steam = () => {
//   const [files, setFiles] = useState<{ [key: string]: File | null }>({});
//   const [mainFile, setMainFile] = useState<File | null>(null);
//   const [blur, setBlur] = useState<boolean>(false);
//   const [markerPosition, setMarkerPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
//   const [floorMeshes, setFloorMeshes] = useState<THREE.Mesh[]>([]);

//   useEffect(() => {
//     const savedFiles = JSON.parse(localStorage.getItem("modelFiles") || "{}");
//     setFiles(savedFiles);
//     const savedMain = localStorage.getItem("mainModel");
//     if (savedMain) setMainFile(new File([], savedMain));
//   }, []);

//   const updateMarkerPosition = () => {
//     setMarkerPosition(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));
//   };

//   useEffect(() => {
//     const interval = setInterval(updateMarkerPosition, 20000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleMainDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       setMainFile(event.dataTransfer.files[0]);
//       setBlur(true);
//       setTimeout(() => setBlur(false), 1000);
//     }
//   };

//   const handleModelLoad = (building: THREE.Group) => {
//     setFloorMeshes(createFloorMeshes(building));
//   };

//   return (
//     <StyledBox
//       css={{
//         width: "125vb",
//         height: "75vh",
//         marginLeft: "2vb",
//         zIndex: 5,
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <StyledBox
//         css={{
//           flexGrow: 1,
//           position: "relative",
//           border: "2px dashed gray",
//           filter: blur ? "blur(5px)" : "none",
//           transition: "filter 0.3s ease-in-out",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         onDrop={handleMainDrop}
//         onDragOver={(event) => event.preventDefault()}
//       >
//         {mainFile ? (
//           <Canvas
//             camera={{ position: [0, 2, 5], fov: 75 }}
//             style={{ width: "100%", height: "100%" }}
//           >
//             <Lights />
//             <Model file={mainFile} visible={true} onModelLoad={handleModelLoad} />
//             {floorMeshes.map((mesh, index) => (
//               <primitive object={mesh} key={index} />
//             ))}
//             <PointMarker targetPosition={markerPosition} />
//             <OrbitControls enableZoom={true} enableRotate={true} />
//           </Canvas>
//         ) : (
//           <span>Drop your Main Building here</span>
//         )}
//       </StyledBox>
//     </StyledBox>
//   );
// };





import React, { useState, useEffect } from "react";
import { Box as StyledBox } from "../styles/box";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const PointMarker = ({ targetPosition, onClick }: { targetPosition: THREE.Vector3, onClick: () => void }) => {
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(5, 3, -1.2));

  useEffect(() => {
    setPosition(targetPosition);
  }, [targetPosition]);

  useFrame(() => {
    const distance = position.distanceTo(targetPosition);
    if (distance > 0.01) {
      setPosition((prevPosition) => prevPosition.lerp(targetPosition, 0.1));
    }
  });

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Model = ({ file, visible, onModelLoad }: { file: File; visible: boolean; onModelLoad: (group: THREE.Group) => void }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      const gltfLoader = new GLTFLoader();

      reader.onload = (event) => {
        const arrayBuffer = event.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const blob = new Blob([arrayBuffer]);
          const url = URL.createObjectURL(blob);

          gltfLoader.load(url, (gltf) => {
            const loadedModel = gltf.scene;

            const box = new THREE.Box3().setFromObject(loadedModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            loadedModel.position.set(-center.x, -box.min.y, -center.z);
            loadedModel.position.set(0, 0, 0);
            loadedModel.position.set(loadedModel.position.x, 0, loadedModel.position.z); // Keep Y fixed at 0
            const maxDimension = Math.max(size.x, size.y, size.z);
            const scaleFactor = 8 / maxDimension;
            loadedModel.scale.setScalar(scaleFactor);

            setModel(loadedModel);
            onModelLoad(loadedModel);
            URL.revokeObjectURL(url);
          });
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file, onModelLoad]);

  if (!model || !visible) return null;

  return <primitive object={model} />;
};

const Lights = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    <hemisphereLight intensity={0.4} />
  </>
);

const createFloorMeshes = (building: THREE.Group) => {
  const box = new THREE.Box3().setFromObject(building);
  const size = box.getSize(new THREE.Vector3());
  const numFloors = Math.ceil(size.y);
  const floorHeight = size.y / numFloors;
  const floorMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < numFloors; i++) {
    const geometry = new THREE.BoxGeometry(size.x, floorHeight, size.z);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(box.min.x + size.x / 2, box.min.y + floorHeight * (i + 0.5), box.min.z + size.z / 2);
    floorMeshes.push(mesh);
  }

  return floorMeshes;
};

const SoldierPopup = ({ soldierDetails, onClose }: { soldierDetails: any, onClose: () => void }) => (
  <div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    zIndex: 10,
    color: "black",  // Added color property for dark text
  }}
  
  >
    <h3>Soldier Details</h3>
    <p><strong>Name:</strong> {soldierDetails.name}</p>
    <p><strong>Floor:</strong> {soldierDetails.floor}</p>
    <p><strong>Status:</strong> {soldierDetails.status}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export const Steam = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [blur, setBlur] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [floorMeshes, setFloorMeshes] = useState<THREE.Mesh[]>([]);
  const [isTarget, setIsTarget] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [soldierDetails, setSoldierDetails] = useState({
    name: "Soldier 1",
    floor: "7",
    status: "Active"
  });

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("modelFiles") || "{}");
    setFiles(savedFiles);
    const savedMain = localStorage.getItem("mainModel");
    if (savedMain) setMainFile(new File([], savedMain));
  }, []);

  const targetPosition = new THREE.Vector3(3, 7, -1.15);
  const originalPosition = new THREE.Vector3(3, 6, -1.15);

  const updateMarkerPosition = () => {
    setMarkerPosition(isTarget ? originalPosition : targetPosition);
    setIsTarget(!isTarget);
  };

  const handleMainDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setMainFile(event.dataTransfer.files[0]);
      setBlur(true);
      setTimeout(() => setBlur(false), 1000);
    }
  };

  const handleModelLoad = (building: THREE.Group) => {
    setFloorMeshes(createFloorMeshes(building));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      updateMarkerPosition();
    }
  };

  const handleSphereClick = () => {
    // Show popup with soldier details
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <StyledBox
      css={{
        width: "125vb",
        height: "75vh",
        marginLeft: "2vb",
        zIndex: 5,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      tabIndex={0}  // Ensure the div is focusable
      onKeyPress={handleKeyPress}
    >
      <StyledBox
        css={{
          flexGrow: 1,
          position: "relative",
          border: "2px dashed gray",
          filter: blur ? "blur(5px)" : "none",
          transition: "filter 0.3s ease-in-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onDrop={handleMainDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {mainFile ? (
          <Canvas
            camera={{ position: [0, 2, 5], fov: 75 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Lights />
            <Model file={mainFile} visible={true} onModelLoad={handleModelLoad} />
            {floorMeshes.map((mesh, index) => (
              <primitive object={mesh} key={index} />
            ))}
            <PointMarker targetPosition={markerPosition} onClick={handleSphereClick} />
            <OrbitControls enableZoom={true} enableRotate={true} />
          </Canvas>
        ) : (
          <span>Drop your Main Building here</span>
        )}
      </StyledBox>

      {popupVisible && (
        <SoldierPopup soldierDetails={soldierDetails} onClose={closePopup} />
      )}
    </StyledBox>
  );
};

