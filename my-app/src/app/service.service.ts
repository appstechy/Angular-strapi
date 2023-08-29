import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private homeApiUrl = "http://localhost:1337/api/";
  private homeApiKey = "Bearer 0226c36619165d71d135d58a0277bd8ba5b4fc7a1197440b53a553d5770b461616eb3476a41f134b5ee3356eb91b2fe42ba99ab46bb992ee5fd1bb37e417f98030f0f38b249ef897a34bb0f94ec762106a269b6a2d6a7ae14a8d9c0fb8e5b8bcbdd3bb95af49b71e0191ea375039ea2cb332df9c74374de1eee6fbb3978fee93";


  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:3000/';
// use to fetch homepage images, heading, etc.
  fetchDataFromHomePage(){

    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}homepage?populate=*`,{headers});
  }


  fetchDataFromHomeAboutUsComponent(){

    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}homepage?populate[home_about_us][populate]=*`,{headers});
  }


  fetchDataFromHomeOurCoursesComponent(){

    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}homepage?populate[home_our_courses][populate]=*`,{headers});
  }


  fetchDataFromHomeOurGalleryComponent(){

    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}homepage?populate[home_our_gallery][populate]=*`,{headers});
  }

  registerNewEmailForNewsLetter(email: string) {
    const headers = new HttpHeaders({
      Authorization: this.homeApiKey,
      'Content-Type': 'application/json' // Set the correct content type
    });

    const payload = { data: { email } }; // Create payload data

    return this.http.post<any>(
      `${this.homeApiUrl}register-for-newsletters`,
      payload,
      { headers }
    );
  }


  fetchAllEmailsList(){
    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}register-for-newsletters`,{headers});
  }


  fetchDataFromHomeNewsLetterComponent(){

    const headers = new HttpHeaders({
      Authorization: this.homeApiKey
    })

    return this.http.get<any>(`${this.homeApiUrl}homepage?populate[home_newsletter][populate]=*`,{headers});
  }


  sendEmail(email: any): Observable<any> {
    console.log("EMAIL-", email);
    const url = `${this.backendUrl}send-email`;
    return this.http.post(url, { to: email }); // Wrap 'email' in an object
  }
  
}
