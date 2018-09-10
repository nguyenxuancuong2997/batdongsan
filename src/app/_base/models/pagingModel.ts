import { IpagingModel } from './IpagingModel';
export class PagingModel implements IpagingModel {
  order: string;
  page: number;
  size: number;
  asc: boolean;
  totalPage: number;
  count: number;
  constructor() { }
}