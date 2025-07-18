"use client";
import { getCountryFlag } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";

interface CountryData {
  id: number;
  country: string;
  lat: number;
  long?: number;
  hour: number;
  day: number;
}

interface CountryInfo extends CountryData {
  name: string;
}

interface CountryDataRecord {
  [countryName: string]: CountryData;
}

type MarkerMesh = THREE.Mesh & {
  userData: CountryInfo;
};

interface InteractiveGlobeDemoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  countryData: CountryDataRecord;
  renderTooltip?: (country: CountryInfo) => React.ReactNode;
  markerColor?: string;
  glowColor?: string;
  tooltipClassName?: string;
  loading: boolean;
  tooltipLabels?: string[];
}

declare global {
  interface Window {
    resumeGlobeRotation?: () => void;
  }
}

const InteractiveGlobeDemo: React.FC<InteractiveGlobeDemoProps> = ({
  width = "100%",
  height = "500px",
  className = "",
  countryData,
  renderTooltip,
  markerColor = "#ffb703",
  glowColor = "#F69E0C",
  tooltipClassName = "",
  loading = false,
  tooltipLabels = [],
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryInfo | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  const containerStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  const defaultTooltipRenderer = (country: CountryInfo): React.ReactNode => {
    const entries = Object.entries(country).filter(
      ([key]) => key !== "name" && key !== "lat" && key !== "lon"
    );
    const flag = getCountryFlag(country.name.toLowerCase());

    return (
      <div className="text-sm space-y-1">
        <div className="flex justify-between capitalize font-bold border-b border-gray-200 pb-1 mb-2">
          <span className="capitalize">{country.name}</span>
          <span className="mr-2">{flag}</span>
        </div>
        {entries
          .filter(([key]) => {
            if (key === "id") return false;

            if (tooltipLabels && tooltipLabels.length > 0) {
              return tooltipLabels.includes(key);
            }

            return true;
          })
          .map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="capitalize">
                {typeof value === "number"
                  ? new Intl.NumberFormat().format(value)
                  : String(value)}
              </span>{" "}
            </div>
          ))}
      </div>
    );
  };

  const tooltipRenderer = renderTooltip || defaultTooltipRenderer;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/Equirectangular-projection.jpg");
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      color: 0xffffff,
      emissive: 0x112244,
      shininess: 10,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.y = 3;
    scene.add(globe);
    globeRef.current = globe;

    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x44aa88,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globe.add(wireframe);

    const markers: MarkerMesh[] = [];
    const glowMarkers: THREE.Mesh[] = [];

    Object.entries(countryData).forEach(
      ([name, data]: [string, CountryData]) => {
        const glowGeometry = new THREE.SphereGeometry(0.035, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.3,
        });
        const glowMarker = new THREE.Mesh(glowGeometry, glowMaterial);

        const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: markerColor,
        });
        const marker = Object.assign(
          new THREE.Mesh(markerGeometry, markerMaterial),
          {
            userData: { name, ...data },
          }
        ) as MarkerMesh;

        const phi: number = (90 - data.lat) * (Math.PI / 180);
        const theta: number = ((data.long || 0) + 180) * (Math.PI / 180);
        const x: number = -(Math.sin(phi) * Math.cos(theta));
        const z: number = Math.sin(phi) * Math.sin(theta);
        const y: number = Math.cos(phi);

        marker.position.set(x * 1.02, y * 1.02, z * 1.02);
        glowMarker.position.set(x * 1.015, y * 1.015, z * 1.015);

        globe.add(glowMarker);
        globe.add(marker);

        markers.push(marker);
        glowMarkers.push(glowMarker);
      }
    );

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotate = true;

    const handleMouseDown = (event: MouseEvent): void => {
      isDragging = true;
      setHoveredCountry(null);
      renderer.domElement.style.cursor = "grabbing";
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseMove = (event: MouseEvent): void => {
      const rect = renderer.domElement.getBoundingClientRect();
      setHoverPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });

      if (!isDragging) {
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y =
          -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(markers);

        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object as MarkerMesh;
          const country: CountryInfo = intersectedObject.userData;
          setHoveredCountry(country);
          renderer.domElement.style.cursor = "pointer";
        } else {
          setHoveredCountry(null);
          renderer.domElement.style.cursor = "grab";
        }
        return;
      }

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };
      if (globeRef.current) {
        globeRef.current.rotation.y += deltaMove.x * 0.01;
        globeRef.current.rotation.x += deltaMove.y * 0.01;
      }
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseUp = (): void => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.style.cursor = "grab";

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);

    const animate = (): void => {
      frameRef.current = requestAnimationFrame(animate);
      if (autoRotate && !isDragging && globeRef.current) {
        globeRef.current.rotation.y += 0.002;
      }

      markers.forEach((marker: MarkerMesh, index: number) => {
        const time = Date.now() * 0.001;
        const randomOffset = index * 1.234;
        const pulse = Math.sin(time * (1 + index * 0.1) + randomOffset);
        const scale = 1 + Math.abs(pulse) * 0.35;
        marker.scale.set(scale, scale, scale);

        const glowMarker = glowMarkers[index];
        if (glowMarker) {
          const glowScale = 1 + Math.abs(pulse) * 0.5;
          glowMarker.scale.set(glowScale, glowScale, glowScale);

          const glowOpacity = 0.2 + Math.abs(pulse) * 0.3;
          (glowMarker.material as THREE.MeshBasicMaterial).opacity =
            glowOpacity;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = (): void => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    window.resumeGlobeRotation = (): void => {
      autoRotate = true;
    };

    return (): void => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [countryData, markerColor, glowColor]);

  return (
    <div className={className} style={containerStyle}>
      {/* Three.js Globe Container */}
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-200 dark:border-gray-700"></div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <div
            ref={mountRef}
            className="w-full h-full relative"
            style={{ margin: 0, padding: 0 }}
          />
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredCountry && (
        <div
          className={`absolute backdrop-blur-md shad bg-[#0A0A0A] dark:bg-[#0A0A0A] border dark:border-slate-600/25 shadow-xl text-white p-3 rounded-lg pointer-events-none z-[9999] min-w-[200px] ${tooltipClassName}`}
          style={{
            left: hoverPosition.x + 15,
            top: hoverPosition.y - 10,
            zIndex: "999999 !important",
            transform:
              hoverPosition.x > window.innerWidth - 250
                ? "translateX(-100%)"
                : "none",
          }}
        >
          {tooltipRenderer(hoveredCountry)}
        </div>
      )}
    </div>
  );
};

export default InteractiveGlobeDemo;
