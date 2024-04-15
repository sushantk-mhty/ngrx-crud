import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Associates } from '../store/model/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  http = inject(HttpClient);
  baseurl = " http://localhost:3000/associate";
  constructor() { }
  getAllAssociate() {
    return this.http.get<Associates[]>(this.baseurl);
  }
  getAssociateByCode(code: number) {
    return this.http.get<Associates>(this.baseurl + '/' + code);
  }
  deleteAssociate(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  updateAssociate(data: Associates) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  createAssociate(data: Associates) {
    return this.http.post(this.baseurl, data);
  }
}
