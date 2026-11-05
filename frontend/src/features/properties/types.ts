export interface PropertyBuilding {
  id: string;
  name: string;
  address: string;
  city: string;
  ward: string;
}

export interface PropertyRoom {
  id: string;
  buildingId: string;
  code: string;
  floor: number;
  area: number;
  monthlyRent: number;
  deposit: string;
  status: "available" | "occupied" | "reserved";
  kind: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  description: string;
  availableFrom: string;
}

export interface PropertyInventory {
  buildings: PropertyBuilding[];
  rooms: PropertyRoom[];
}
