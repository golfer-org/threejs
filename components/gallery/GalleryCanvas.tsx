"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GalleryScene, type GalleryFocusTarget } from "./GalleryScene";
import { HOME_POSITION } from "./galleryLayout";
import { GALLERY_ROOMS, PASSAGE_TARGET, type GalleryRoomId } from "./galleryRooms";

type RoomTransition = "idle" | "approaching" | "covering" | "revealing";

export function GalleryCanvas() {
  const [selectedTarget, setSelectedTarget] =
    useState<GalleryFocusTarget | null>(null);
  const [vendingPanelOpen, setVendingPanelOpen] = useState(false);
  const [roomId, setRoomId] = useState<GalleryRoomId>("main");
  const [transition, setTransition] = useState<RoomTransition>("idle");
  const transitionLock = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const room = GALLERY_ROOMS[roomId];
  const transitioning = transition !== "idle";

  const handleEnterRoom = () => {
    if (transitionLock.current) return;
    transitionLock.current = true;
    document.body.style.cursor = "default";
    setVendingPanelOpen(false);
    setSelectedTarget(PASSAGE_TARGET);
    setTransition("approaching");
  };

  const handleCameraArrive = useCallback(() => {
    setTransition((current) => current === "approaching" ? "covering" : current);
  }, []);

  useEffect(() => {
    if (!overlayRef.current || (transition !== "covering" && transition !== "revealing")) return;
    const covering = transition === "covering";
    const tween = gsap.to(overlayRef.current, {
      opacity: covering ? 1 : 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        if (covering) {
          setRoomId(room.nextRoom);
          setSelectedTarget(null);
          setVendingPanelOpen(false);
          setTransition("revealing");
        } else {
          transitionLock.current = false;
          setTransition("idle");
        }
      },
    });
    return () => { tween.kill(); };
  }, [transition, room.nextRoom]);

  const handleBack = () => {
    if (transitionLock.current) return;
    setSelectedTarget(null);
    setVendingPanelOpen(false);
  };

  return (
    <div className="gallery-canvas">
      <div className="gallery-viewport" inert={transitioning}>
      <Canvas
        aria-label="3D gallery with skylights, paintings, and interactive exhibits"
        camera={{ position: [...HOME_POSITION], fov: 58, near: 0.1, far: 50 }}
        dpr={[1, 1.75]}
        frameloop="demand"
        gl={{ antialias: true, powerPreference: "high-performance" }}
        shadows="percentage"
      >
        <Suspense fallback={null}>
          <GalleryScene
            key={roomId}
            roomId={roomId}
            transitioning={transitioning}
            onEnterRoom={handleEnterRoom}
            onCameraArrive={handleCameraArrive}
            selectedTarget={selectedTarget}
            onSelectTarget={(target) => {
              if (transitionLock.current) return;
              setVendingPanelOpen(false);
              setSelectedTarget(target);
            }}
            onOpenVendingPanel={() => {
              if (!transitionLock.current) setVendingPanelOpen(true);
            }}
            vendingPanelOpen={vendingPanelOpen}
            onCloseVendingPanel={() => setVendingPanelOpen(false)}
          />
        </Suspense>
      </Canvas>
      </div>

      <div className="gallery-room-label" role="status" aria-live="polite">
        <strong>{room.title}</strong>
        <span>{room.subtitle}</span>
      </div>

      <div ref={overlayRef} className="gallery-room-transition" aria-hidden="true" />
      {transitioning && (
        <p className="gallery-room-progress" role="status">
          {transition === "revealing" ? `Entering ${room.title}` : `Moving to ${GALLERY_ROOMS[room.nextRoom].title}…`}
        </p>
      )}

      {selectedTarget && !transitioning && (
        <button
          className="gallery-back"
          type="button"
          onClick={handleBack}
          aria-label={`Return from ${selectedTarget.title} to the gallery overview`}
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
      )}

      <a
        className="model-credit"
        href="https://sketchfab.com/3d-models/soda-vending-machine-f753a659faae499282e882d63972d4c2"
        target="_blank"
        rel="noreferrer"
      >
        Soda Vending Machine by RasenDan · CC BY 4.0
      </a>
    </div>
  );
}
