import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyDietsService } from '../services/daily-diets.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DailyDiet } from '../models/daily-diet';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users-service';
import { User } from '../models/user';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DateCalories } from '../models/date-calories';
import { debug } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barChart', {static: false}) barChart;

  bars: any;
  colorArray: any;
  
  dailyDiets: DailyDiet[]=[];
  currentUser: User;

  constructor(private dailydietsservice: DailyDietsService, private route: ActivatedRoute,
    private router: Router, private usersService: UsersService) { 
      this.usersService.currentUser.subscribe((user) => {
        this.currentUser = user;
      });
      this.getDailyDiets(); 
      this.getWeeklyCalories();
    }

    ionViewDidEnter() {
      this.createBarChart();
    }

  getDailyDiets() {
    this.dailydietsservice.getDailyDiets().subscribe(data => {
      this.dailyDiets=data.filter(i => {
        return i.userId == this.currentUser.userId; 
      });
    });
  }

  addNew() {
    this.router.navigate(['/add-daily-diet']);
  }

  public delete(id: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      let index = this.dailyDiets.findIndex(x=>x.id==id);

      this.dailydietsservice.deleteDailyDiet(id).subscribe(() => {
        this.dailyDiets.splice(index, 1);
      }, error => console.error(error));
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getCalories() {
    //debugger;
    let calories: DateCalories[] = [];
    this.dailyDiets.forEach(i => {
      let dc = new DateCalories();
      dc.date = i.day;
      dc.calories = i.totalCalories;

      calories.push(dc);
    });
    //console.log(calories);
    return calories;
  }

  getWeeklyCalories() {
    let userCalories: DateCalories[] = this.getCalories();
    let daysOfWeek: Date[] = this.dates();
    let calories: number[] = [];

    for (let i = 0; i < daysOfWeek.length; i++) {
      let date = daysOfWeek[i];
      
      for (let j=0; j<userCalories.length; j++) {
        // if (dayCalorie) {
        //   dayCalorie = null;
        // }
        let d1 = new Date(userCalories[j].date);
        let d1Y = d1.getFullYear();
        let d1M = d1.getMonth();
        let d1D = d1.getDay();

        let dY = date.getFullYear();
        let dM = date.getMonth();
        let dD = date.getDay();
        
        if (new Date(d1Y, d1M, d1D).getTime() === new Date(dY, dM, dD).getTime()) {
          //alert('Yes, ' + new Date(d1Y, d1M, d1D).getTime() + ' = ' + new Date(dY, dM, dD).getTime())
          var dayCalorie = userCalories[j];
          calories.push(dayCalorie.calories);
        }
      }

      if (!dayCalorie) {
        calories.push(0);
      }
    }

    return calories;
  }

  dateLabels() {
    let days = [];
    let currentDate = new Date();

    for (var i = 0; i < 7; i++) {
        days.push(
            moment(currentDate).format('DD/MM/YYYY')
        );
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return days.reverse();
  }

  dates() {
    let days = [];
    let currentDate = new Date();

    for (var i = 0; i < 7; i++) {
        days.push(
            new Date(currentDate)
        );
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return days.reverse();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateLabels(),
        datasets: [{
          label: 'Daily calorie intake',
          data: this.getWeeklyCalories(),//[2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnInit(){
    //this.getDailyDiets();
  }

}
