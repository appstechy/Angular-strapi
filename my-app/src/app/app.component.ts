import { Component, OnInit} from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component_v1.css','./app.component_v2.css','./responsive_v1.css','./responsive_v2.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  innova_img = "";
  homeNavItems: any = [];

  activeLink: string = ''; // Holds the active link
  footer: string = "";

  socialIcons: any = [];

  constructor(private mainService: ServiceService){}

  ngOnInit(): void {
      this.mainService.fetchDataFromHomePage().subscribe(
        (data)=>{
          // console.log(data);
          this.homeNavItems = data.data.attributes.home_nav;
  
          // console.log("Navigation items-",this.homeNavItems);

          // console.log("Fetch image",data);
          this.innova_img = data.data.attributes.innova_image.data.attributes.url;

          this.footer = data.data.attributes.footer;

          this.socialIcons = data.data.attributes.social_icon;

        },
        (error)=>{
          console.log(error);
        }
      )

  }


  setActiveLink(link: string) {
    this.activeLink = link;
  }






}
