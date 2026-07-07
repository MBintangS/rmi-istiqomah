export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Pengurus {
  id: string;
  name: string;
  position: string;
  photo?: string;
  period: string;
  order: number;
  isActive: boolean;
}

export interface Testimoni {
  id: string;
  name: string;
  content: string;
  role: string;
  photo?: string;
  order: number;
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string;
  order: number;
  isActive: boolean;
}
