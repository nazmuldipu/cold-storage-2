export interface Pocket {
  _id: string;
  createdAt: Date;
  slug: string;
  chamber: Chamber;
  floor: Floor;
  line: Line;
  name: string;
  capacity: string;
  priority: number;
}

interface Line {
  _id: string;
  name: string;
  slug: string;
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
