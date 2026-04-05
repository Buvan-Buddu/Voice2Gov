export type GeoLocation = {
  lat: number | null;
  lng: number | null;
};

export type ComplaintRequest = {
  description: string;
  image: string;
  location: GeoLocation;
  category: string;
  department: string;
  status: string;
};

export type ComplaintResponse = ComplaintRequest & {
  id: string;
  adminNotes?: string;
};

export type ComplaintFeedResponse = ComplaintResponse & {
  title: string;
  createdAt: string;
  impact: string;
  votes: number;
  comments: number;
};

export type NotificationResponse = {
  id: string;
  description: string;
  image: string;
  location: GeoLocation;
  category: string;
  department: string;
  status: string;
  createdAt: string;
  read: boolean;
};
