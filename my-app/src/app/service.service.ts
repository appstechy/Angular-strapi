import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { prodEnvironment } from 'src/environments/environment.prod';
// import { Console } from 'console';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private homeApiUrl = "";
  private homeApiKey = "Bearer ";
  private backendUrl = "";

  



  constructor(private http: HttpClient) {
    if (isDevMode()){
      this.homeApiUrl = environment.API_URL!;
      this.homeApiKey+= environment.API_KEY!;
      this.backendUrl = environment.BACKEND_URL!;
      console.log("Development");

  } else{
    this.homeApiUrl = environment.API_URL!;
    this.homeApiKey+= environment.API_KEY!;
    this.backendUrl = environment.BACKEND_URL!;
    console.log("Production");
  }

   }

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
