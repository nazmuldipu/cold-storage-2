export interface Floor {
  _id: string;
  createdAt: Date;
  slug: string;
  chamber: Chamber;
  name: string;
  capacity: string;
  priority: number;
}

interface Chamber {
  _id: string;
  name: string;
  slug: string;
}
