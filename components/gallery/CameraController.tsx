import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import type { GalleryFocusTarget } from "./GalleryScene";
import { HOME_POSITION, HOME_LOOK_AT } from "./galleryLayout";
import type { GalleryRoomId } from "./galleryRooms";

const ANIMATION_DURATION = 1.2;

type CameraControllerProps = {
  selectedTarget: GalleryFocusTarget | null;
  roomId: GalleryRoomId;
  onArrive?: () => void;
};

export function CameraController({
  selectedTarget,
  roomId,
  onArrive,
}: CameraControllerProps) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  // Reset while the room-change overlay is opaque, before revealing the new room.
  useLayoutEffect(() => {
    camera.position.set(...HOME_POSITION);
    camera.lookAt(...HOME_LOOK_AT);
    camera.updateMatrixWorld();
    invalidate();
  }, [camera, invalidate, roomId]);

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;

    const direction = camera.getWorldDirection(new Vector3());
    const lookAt = camera.position
      .clone()
      .add(direction.multiplyScalar(10));
    const destination = selectedTarget?.cameraTarget ?? HOME_POSITION;
    const focus = selectedTarget?.position ?? HOME_LOOK_AT;

    const updateCamera = () => {
      camera.lookAt(lookAt);
      camera.updateProjectionMatrix();
      invalidate();
    };

    const timeline = gsap.timeline({
      defaults: {
        duration: ANIMATION_DURATION,
        ease: "power2.inOut",
      },
      onUpdate: updateCamera,
      onComplete: () => {
        updateCamera();
        onArrive?.();
      },
    });

    timeline
      .to(
        camera.position,
        {
          x: destination[0],
          y: destination[1],
          z: destination[2],
        },
        0,
      )
      .to(
        lookAt,
        {
          x: focus[0],
          y: focus[1],
          z: focus[2],
        },
        0,
      );

    return () => {
      timeline.kill();
    };
  }, [camera, invalidate, selectedTarget, onArrive, roomId]);

  return null;
}
