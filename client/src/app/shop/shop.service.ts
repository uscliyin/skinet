import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }

  getProducts(shoParams:ShopParams){
    let params = new HttpParams();
    if(shoParams.brandId>0)params=params.append('brandId',shoParams.brandId);
    if(shoParams.typeId)params=params.append('typeId',shoParams.typeId);
    params=params.append('sort',shoParams.sort);
    params=params.append('pageIndex',shoParams.pageNumber);
    params=params.append('pageSize',shoParams.pageSize);
    if(shoParams.search)params=params.append('search',shoParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products',{params});
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
