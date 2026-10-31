export interface RoomListing {
  id: string;
  title: string;
  priceNum: number;
  priceStr: string;
  depositStr: string;
  address: string;
  district: string;
  areaM2: number;
  floor: number;
  roomType: string;
  photos: string[];
  tags: string[];
  electricity: string;
  water: string;
  wifi: string;
  parking: string;
  landlord: {
    name: string;
    phone: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface AssistantReply {
  text: string;
  suggestedPrompts: string[];
  comparisonIds?: string[];
}
