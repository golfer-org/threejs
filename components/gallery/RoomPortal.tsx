import { Edges, Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";

type RoomPortalProps = {
  destination: string;
  disabled: boolean;
  onEnter: () => void;
};

/** A raycast target in the existing doorway, plus an accessible HTML button. */
export function RoomPortal({ destination, disabled, onEnter }: RoomPortalProps) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => { document.body.style.cursor = "default"; };
  }, []);

  const handleHover = (event: ThreeEvent<PointerEvent>, active: boolean) => {
    event.stopPropagation();
    if (disabled) return;
    setHovered(active);
    document.body.style.cursor = active ? "pointer" : "default";
  };

  return (
    <group name="Room passage" position={[4.87, 1.75, -7]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh
        name="RoomPortalHitbox"
        onClick={(event) => {
          event.stopPropagation();
          if (!disabled) onEnter();
        }}
        onPointerEnter={(event) => handleHover(event, true)}
        onPointerLeave={(event) => handleHover(event, false)}
      >
        <boxGeometry args={[1.8, 3.4, 0.025]} />
        <meshBasicMaterial color="#e2c28f" transparent opacity={hovered && !disabled ? 0.16 : 0.025} depthWrite={false} />
        {hovered && !disabled && <Edges color="#e2c28f" />}
      </mesh>

      <Html center position={[0, 0.35, 0.08]} zIndexRange={[8, 1]}>
        <button
          className="room-portal"
          type="button"
          disabled={disabled}
          aria-label={`Enter ${destination}`}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) onEnter();
          }}
        >
          <span className="room-portal__eyebrow">Explore the next room</span>
          <span>{destination} <span aria-hidden="true">→</span></span>
        </button>
      </Html>
    </group>
  );
}
