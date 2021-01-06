export interface Pallot {
    _id: string;
    createdAt: Date;
    date: Date;
    sr_date: Date;
    year: number;
    sr_no: string;
    quantity: number;

    pocket: Pocket;
    line: Line;
    floor: Floor;
    chamber: Chamber;
}

interface Pocket {
    _id: string;
    name: string;
    slug: string;
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