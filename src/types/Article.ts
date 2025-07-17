export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
}

export interface ImageUpload {
  file: File;
  preview: string;
  id: string;
}