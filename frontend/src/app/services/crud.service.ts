import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  route: String;
  url_image: string;
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = URL_SERVICIOS;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getData(id?: string): Observable<any> {
    if (!id) {
      return this._http.get<any[]>(this.url + this.route);
    }
    return this._http.get<any>(this.url + this.route + '/' + id);
  }


  searchData(parameter?: {}): Observable<any> {
    const json = JSON.stringify(parameter);
    const params = json;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.put<any>(this.url + this.route + '/', params, { headers: headers });
  }

  saveData(product: any): Observable<any> {
    const json = JSON.stringify(product);
    const params = json;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<any>(this.url + this.route, params, { headers: headers });
  }

  updateData(id: string, product: any): Observable<any> {
    const json = JSON.stringify(product);
    const params = json;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.put<any>(this.url + this.route + '/' + id, params, { headers: headers });
  }

  deleteData(id: string): Observable<any> {
    return this._http.delete<any>(this.url + this.route + '/' + id);
  }

}
