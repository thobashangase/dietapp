import { Component, OnInit, Inject } from '@angular/core';
import { DietDetails } from '../models/diet-details';
import { Router, ActivatedRoute } from '@angular/router';
import { DailyDietsService } from '../services/daily-diets.service';
import { DailyDiet } from '../models/daily-diet';

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.scss'],
})
export class DietDetailsComponent implements OnInit {

  public dietDetails: DietDetails;
  id: number;

  constructor(private dailyDietService: DailyDietsService, @Inject(ActivatedRoute) private activatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dailyDietService.getDailyDietById(this.id).subscribe(result => {
      this.dietDetails = result; 
      console.log(this.dietDetails);
    }, error => console.error(error));
  }

  // public delete(diet: DailyDiet) {
  //   if (confirm('Are you sure you want to delete this entry?')) {

  //     this.dailyDietService.deleteDailyDiet(person.id).subscribe(() => {
  //       this.router.navigateByUrl('/people'); 
  //     }, error => console.error(error));
  //   }
  // }

  ngOnInit() {}

}
