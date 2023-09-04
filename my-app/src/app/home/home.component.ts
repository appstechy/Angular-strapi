import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component_v1.css','./home.component_v2.css','./responsive_v1.css','./responsive_v2.css']
})
export class HomeComponent implements OnInit {
  mainTitle: string = "";
  secondMainTitle: string = "";
  home_paragraph: string = "";
  home_image: string = "";

  homeAboutUsTitle: string = "";
  homeAboutUsDesc: string = "";
  homeOurCoursesTitle: string = "";
  homeOurCoursesDesc: string = "";
  homeOurGalleryTitle: string = "";
  homeOurGalleryDesc: string = ""; 
  homeAboutUsComponent:any = [];
  homeOurCoursesComponent:any = [];
  homeOurGalleryComponent:any = [];
  homeOurNewsLetterComponent:any = [];
  allEmailsList:any = [];

  subscribeNewsletter: string = "";


  constructor(private homeService: ServiceService){}

  ngOnInit(): void {
    this.homeService.fetchDataFromHomePage().subscribe(
      (data) => {
        // console.log(data);
        this.mainTitle = data.data.attributes.main_title;
        this.secondMainTitle = data.data.attributes.second_main_title;
        this.home_paragraph = data.data.attributes.home_paragraph;
        this.home_image+= data.data.attributes.home_images.data.attributes.url;
        this.homeAboutUsTitle = data.data.attributes.home_about_us_title;
        this.homeAboutUsDesc = data.data.attributes.home_about_us_paragraph;
        this.homeOurCoursesTitle = data.data.attributes.home_our_courses_title;
        this.homeOurCoursesDesc = data.data.attributes.home_our_courses_desc;
        this.homeOurGalleryTitle = data.data.attributes.home_our_gallery_title;
        this.homeOurGalleryDesc = data.data.attributes.home_our_gallery_desc;

        // console.log("Image",this.home_image);
      },
      (error) => {
        console.log(error);
      }
      );


      this.homeService.fetchDataFromHomeAboutUsComponent().subscribe(
        (data) => {
          // console.log(data);
          this.homeAboutUsComponent = data.data.attributes.home_about_us;
          // console.log("About us component-",this.homeAboutUsComponent);

        },
        (error) => {
          console.log(error);
        }
        );


      this.homeService.fetchDataFromHomeOurCoursesComponent().subscribe(
        (data) => {
          // console.log(data);
          this.homeOurCoursesComponent = data.data.attributes.home_our_courses;
          // console.log("Our Courses component-",this.homeOurCoursesComponent);

        },
        (error) => {
          console.log(error);
        }
        );


        this.homeService.fetchDataFromHomeOurGalleryComponent().subscribe(
          (data) => {
            // console.log(data);
            this.homeOurGalleryComponent = data.data.attributes.home_our_gallery;
            // console.log("Our gallery component-",this.homeOurGalleryComponent);
  
          },
          (error) => {
            console.log(error);
          }
          );


        this.homeService.fetchAllEmailsList().subscribe(
          (data) =>{
            // console.log(data);
            this.allEmailsList = data.data.map((item: { attributes: { email: any; }; }) => item.attributes.email);
            // console.log(this.allEmailsList);
          }
        )



        this.homeService.fetchDataFromHomeNewsLetterComponent().subscribe(
          (data) => {
            // console.log(data);
            this.homeOurNewsLetterComponent = data.data.attributes.home_newsletter;
            // console.log("Our newsletter component-",this.homeOurNewsLetterComponent);
  
          },
          (error) => {
            console.log(error);
          }
          );


}

isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

submitNewsletter(email:string):void{
  if (this.allEmailsList.includes(email)) {
    alert('Email already present');
    return;
    // Display a message or take appropriate action for duplicate email
  } else if (this.isValidEmail(email)==false){
    alert('Email is invalid');
    return;
    
  } else{
      this.homeService.registerNewEmailForNewsLetter(email).subscribe(
        (data)=>{
          alert("Successfully registerd");
          this.allEmailsList.push(email);
        },(error)=>{
          console.log(error);
        }
        );
      
      console.log("Email-",email);
      this.homeService.sendEmail(email).subscribe(()=>{
        console.log('Email sent successfully');
      },
      error =>{
        console.log('Error sending email',error);
      }
      )
    }}


    getColumnClass(): string {
      const numItems = this.homeOurCoursesComponent.length;
      // console.log("Number of items-",numItems);
      switch (numItems) {
        case 1:
          return 'col-lg-12 mb-5';
        case 2:
          return 'col-lg-6 col-md-6 mb-5';
        case 3:
          return 'col-lg-4 col-md-6 mb-5';
        default:
          return 'col-lg-4 col-md-6 mb-5'; // Default column class
      }
    }


    getColumnClass2(): string {
      const numItems = this.homeAboutUsComponent.length;
      // console.log("Number of items-",numItems);
      switch (numItems) {
        case 1:
          return 'col-lg-12 mb-5';
        case 2:
          return 'col-lg-6 col-md-6 mb-5';
        case 3:
          return 'col-lg-4 col-md-6 mb-5';
        default:
          return 'col-lg-4 col-md-6 mb-5'; // Default column class
      }
    }

  }


