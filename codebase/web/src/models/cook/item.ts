export interface IItem{ 
  _id: string,
	cookId: string,
	name: string,
	description: string,
	price: number,
	discount: number,
	images: [string],
	isActive: boolean,
  createdBy: string,
  updatedBy: string,
  createdAt: Date
};