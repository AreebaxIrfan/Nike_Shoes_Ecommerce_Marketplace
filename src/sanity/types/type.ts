export interface AllProducts {
    createdAt: string | number | Date;
    _id: string;  
    imageUrl: string;
    productName: string;
    category: string;
    price: number;
    tags: string;
    slug: string;
    inventory: number;
    image: string;
    status: string;
  }