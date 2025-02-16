import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Kucing } from "../models/kucing.model";
import { API_CONFIG } from "../api-config";
import { environment } from "../../environment/env";
import { CustomApiResponse } from '../models/custom-api-response.model';

@Injectable({
    providedIn: 'root'
})
export class KucingService {
    private readonly AUTH_HEADER = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${btoa(`${environment.authUser}:${environment.authPass}`)}`,
          'Content-Type': 'application/json'
        })
      };

    private kucingSubject = new BehaviorSubject<Kucing[]>([]);
    kucings$ = this.kucingSubject.asObservable();

    constructor(private http: HttpClient) {}

    getKucing(): Observable<Kucing[]> {
        return this.http.get<Kucing[]>(API_CONFIG.KUCING.ALL, this.AUTH_HEADER);
    }

    getAPIKucing(): Observable<Kucing[]> {
        return this.http.get<Kucing[]>(API_CONFIG.KUCING.IMPORT, this.AUTH_HEADER);
    }

    addKucing(kucing: Kucing): Observable<Kucing> {
        return this.http.post<Kucing>(API_CONFIG.KUCING.CREATE, kucing, this.AUTH_HEADER);
    }

    addListKucing(kucings: any[]): Observable<any> {
        return this.http.post<any>(`${API_CONFIG.KUCING.SAVE_ALL}`, kucings, this.AUTH_HEADER);
    }

    updateKucing(kucing: Kucing): Observable<any> {
        if (!kucing.id) {
            throw new Error("ID tidak boleh kosong saat update!");
        }
        return this.http.put<any>(`${API_CONFIG.KUCING.UPDATE}/${kucing.id}`, kucing, this.AUTH_HEADER);
    }

    deleteKucing(id: string): Observable<CustomApiResponse> { 
        return this.http.delete<CustomApiResponse>(API_CONFIG.KUCING.BY_ID(id), this.AUTH_HEADER);
    }

    setKucing(kucing: Kucing[]): void {
        this.kucingSubject.next(kucing);
    }
}