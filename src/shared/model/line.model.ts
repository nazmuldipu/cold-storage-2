export interface Line {
  _id: string;
  createdAt: Date;
  slug: string;
  chamber: Chamber;
  floor: Floor;
  name: string;
  capacity: string;
  priority: number;
}

interface Floor {
  _id: string;
  name: string;
  slug: string;
}

interface Chamber {
  _id: string;
  name: string;
  slug: string;
}
