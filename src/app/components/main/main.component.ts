import { GenderFilterPipe } from './../../gender-filter.pipe';
import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  persons: Person[];
  public show:number = -1;
  genders: Array<any>
  constructor(private personService: PersonService) { 
    this.genders = ['All', 'Male', 'Female']
  }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons => {
      this.persons = persons;
    })
  }

  incrementLike(person: Person){
    person.like += 1;
    this.personService.updatePerson(person);
  }

  decrementLike(person: Person){
    person.like -= 1;
    this.personService.updatePerson(person);
  }

  // Shows/Hides + and - signs on mouseover
  showLikeControls(index: number){
    this.show = index;
  }

  hideLikeControls(index: number){
    this.show = -1;
  }
  

  filterGender(gender){
    this.personService.filter(gender).subscribe(persons => {
      this.persons = persons;
    })
  }
  
  preview(index: number){
    // Compare a selected person with all other persons by different properties. See below:
    this.persons.forEach((x,i) => {
      // Calculate age difference
      let diff = x.age - this.persons[index].age;
      let diff2 = this.persons[index].age - x.age;
      // If age difference less than 10 years and relationship status of both selected person and compared persons is single, then set progress Match bar to 75%
      if ((x.inRelation === false && this.persons[index].inRelation === false) && ((diff < 10 && diff > 0) || (diff2 < 10 && diff2 > 0))) {
        $(`#main .progressbar:eq(${i})`).html(`
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Match rate: 75%</div>
          </div>
        `)
      } 
      // If relationship status of both selected person and compared persons is single, then set progress Match bar to 50%
      else if ((x.inRelation === false && this.persons[index].inRelation === false) || ((diff < 10 && diff > 0) || (diff2 < 10 && diff2 > 0))) {
        $(`#main .progressbar:eq(${i})`).html(`
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Match rate: 50%</div>
          </div>
        `)
      }
      //  Set progress bar to 0% 
      else {
        $(`#main .progressbar:eq(${i})`).html(`
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Match rate: 0%</div>
          </div>
        `)
      }
    })
    // Expand a person card as a big card before rest of the cards
    $('#preview').html(`
      <div class="card col-lg-12">
        <div class="bordered">
          <div class="card-body">
          <div class="row">
            <img class="card-img-top col-lg-7" src="${this.persons[index].image}" alt="Person's image">
            <div class="col-lg-5">
            <h5 class="card-title">${this.persons[index].name} ${this.persons[index].surname}</h5>
            <p class="card-text">Age: ${this.persons[index].age}<br></p>
            </div>
            </div>
          </div>
        </div>
      </div>
    `)
    
    if (this.persons[index].inRelation === true) {
      $('#preview .card-text:eq(0)').append(`<p>${this.persons[index].name} is in <strong>relationship</strong></p>`)
    } else {
      $('#preview .card-text:eq(0)').append(`<p>${this.persons[index].name} is in <strong>single</strong></p>`)
    }
  }
  
  reset(){
    $('#preview').html('')
    $(`#main .progressbar`).html('')
  }

}
