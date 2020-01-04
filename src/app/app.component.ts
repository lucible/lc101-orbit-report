import { Component } from '@angular/core';
import { Satellite } from './satellite'
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lc101-orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.sourceList = [];

    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then((response) => {
       response.json().then((data) => {
 
          let fetchedSatellites : Satellite[] = data.satellites;
          
          // forEach is much nicer than looping.
          // the only issue here is that I don't have any check verifying
          // that the json data is a Satellite object

          fetchedSatellites.forEach((satellite : Satellite) => {
            this.sourceList.push(satellite)
          })

          // make a copy of the sourceList to be shown to user
          this.displayList = this.sourceList.slice(0);
 
       },AppComponent.bind(this));
    },AppComponent.bind(this));
 
 }

 search(searchTerm: string): void {
   console.log('function called')
   console.log(searchTerm)
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
  }
  console.log(matchingSatellites)
  // assign this.displayList to be the the array of matching satellites
  // this will cause Angular to re-make the table, but now only containing matches
  this.displayList = matchingSatellites;
 }
}
