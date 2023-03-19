import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService,  private weatherService: WeatherService) { }
  user = {localId:"someid",displayName:"somename"};

  weatherData?: WeatherData;
  cityName: string = 'Chennai';
  ngOnInit(): void {

    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
        //call user details service
        this.auth.detail().subscribe({
          next:data=>{
              this.user.localId = data.users[0].localId;
              this.user.displayName = data.users[0].displayName;
          }
        })
    }

    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
   onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
  private getWeatherData(cityName: string)
    {
      this.weatherService.getWeatherData(cityName)
        .subscribe({
          next: (response) => {
            this.weatherData = response;
            console.log(response);
          }
        });
    }


}


