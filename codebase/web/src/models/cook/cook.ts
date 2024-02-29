import { IItem } from './item';
export interface ICook{ 
  _id: string,
  name: string,
	address: number,
	mobileNo: string,
	emailId: string,
	isVeg: boolean,
	images: [string],
	items: [IItem],
  createdBy: string,
  updatedBy: string,
  createdAt: Date
};