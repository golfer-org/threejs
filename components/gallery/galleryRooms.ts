export type GalleryRoomId = "main" | "studio";

type RoomDefinition = {
  title: string;
  subtitle: string;
  nextRoom: GalleryRoomId;
  wallColor?: string;
  floorColor?: string;
  skyColor: string;
  sunlight: number;
  hasVending: boolean;
};

export const GALLERY_ROOMS: Record<GalleryRoomId, RoomDefinition> = {
  main: {
    title: "Room I · Imagination Gallery",
    subtitle: "Main collection",
    nextRoom: "studio",
    skyColor: "#d5e7f2",
    sunlight: 3.2,
    hasVending: true,
  },
  studio: {
    title: "Room II · Quiet Gallery",
    subtitle: "A fresh perspective on the collection",
    nextRoom: "main",
    wallColor: "#b9c9c0",
    floorColor: "#b5b4a3",
    skyColor: "#d9e9e6",
    sunlight: 2.2,
    hasVending: false,
  },
};

// The passage lies in the right-wall opening, z = -8 to -6.
export const PASSAGE_TARGET = {
  id: "room-passage",
  title: "Gallery passage",
  position: [5.6, 1.75, -7] as const,
  cameraTarget: [3.65, 1.9, -6.9] as const,
};
