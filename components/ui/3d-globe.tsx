"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export const Globe3D = ({
    markers,
    config,
    onMarkerClick,
    onMarkerHover,
}: {
    markers: { lat: number; lng: number; src?: string; label?: string }[];
    config?: any;
    onMarkerClick?: (marker: any) => void;
    onMarkerHover?: (marker: any) => void;
}) => {
    return (
        <div className="h-[40rem] w-full flex items-center justify-center relative">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                className="w-full h-full"
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Globe
                    markers={markers}
                    config={config}
                    onClick={onMarkerClick}
                    onHover={onMarkerHover}
                />
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={config?.autoRotateSpeed || 0.5}
                />
            </Canvas>
        </div>
    );
};

function Globe({ markers, config, onClick, onHover }: any) {
    const globeRef = useRef<THREE.Mesh>(null);

    // Convert lat/lng to vector3 position on sphere
    const getPosition = (lat: number, lng: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        return [x, y, z] as [number, number, number];
    };

    return (
        <>
            <mesh ref={globeRef} scale={2}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="blue"
                    roughness={0.5}
                    metalness={0.1}
                    emissive={new Color("#000022")}
                />
            </mesh>
            {markers.map((marker: any, index: number) => (
                <mesh
                    key={index}
                    position={getPosition(marker.lat, marker.lng, 2.05)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick && onClick(marker);
                    }}
                    onPointerOver={() => onHover && onHover(marker)}
                >
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            ))}
        </>
    );
}
