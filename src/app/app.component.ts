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
 
       },AppComponent.bind(this));
    },AppComponent.bind(this));
 
 }
}
