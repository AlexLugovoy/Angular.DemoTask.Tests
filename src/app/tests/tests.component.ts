import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../models/test';
import { TestsService } from '../services/tests.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  constructor(private _testsServise: TestsService,
              private _route: Router) { }

  tests: Test[] = [];
  result!: string;
  currentTest: any;
  agreeCheck: boolean = false;

  currentUser!:string;

  ngOnInit(): void {
    this._testsServise.getCurrentUser().subscribe((data:any)=>{
      this.currentUser = data.Email;
    });
    this._testsServise.getTests().subscribe((data:any)=>
    {
      this.tests = data;
    },
    error => {
      if(error.status==401)
      {
        this._route.navigate(["/login"]);
      }
      console.log(error);
    });
  }

  startTest(id:number)
  {
    this.currentTest = this.tests.find(x => x.id === id);
    console.log(this.currentTest)
    //this.openDialog();
  }

  proceedTest()
  {
    console.log(this.agreeCheck);
    this._route.navigate(['/test', {id: this.currentTest.id}]);
  }

}


