import { ICook } from '../cook/cook';
export interface ICooks{ 
    data: Array<ICook>,
    isUpToDate: boolean,
    isError: boolean,
    errorMessage: string
  };