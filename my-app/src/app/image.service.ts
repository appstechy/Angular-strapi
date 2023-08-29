import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiKey = '942TLiUdIykLjbZfTidAweE710NNic4tPW56PHNvwOMig1U3MUgE5cOQ';
  private apiUrl = 'https://api.pexels.com/v1';

  constructor(private http: HttpClient) {}

  getImages(searchQuery: string, perPage: number) {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });

    const params = new HttpParams()
      .set('query', searchQuery)
      .set('per_page', perPage.toString());

    return this.http.get<any>(`${this.apiUrl}/search`, { headers, params });
  }
}
