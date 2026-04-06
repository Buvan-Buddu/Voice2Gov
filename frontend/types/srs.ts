export type GeoLocation = {
  lat: number | null;
  lng: number | null;
};

export type Comment = {
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
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
  votes: number;
  comments: Comment[];
  createdAt: string;
};

export type ComplaintFeedResponse = ComplaintResponse & {
  title: string;
  impact: string;
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
