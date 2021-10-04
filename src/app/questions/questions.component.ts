import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { ResponseResult, Result } from '../models/result';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _questionService: QuestionService,
              public dialog: MatDialog) { }

  testId:any;
  questions: Question[] = [];
  currentQuestion!: Question;
  position: number = 0;
  answers: Answer[] = [];

  selectAnswers: Answer[] =[];
  selectAnswer!: Answer;

  responseResult!: ResponseResult;

  formQuestion = new FormGroup({
    answer: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.testId = this._route.snapshot.paramMap.get('id')
    this.loadQuestions();  
  }

  nextQuestion(){
    this.position++;
    if(this.position < this.questions.length)
    {
      this.currentQuestion = this.questions[this.position];
      this.loadAnswer();
    }else{
      // END OF TEST
      this.showResult();
      //SEND ANSWERS TO SERVER
      let object = new Result();
      object.answers = this.selectAnswers;
      this._questionService.getResult(this.selectAnswers).subscribe((data:any)=>{
        this.responseResult = data;
        console.log(this.responseResult);
      },
      error =>{
        console.log(error.error)
      });
    }
  }

  onSubmit(){
    console.log("EVENT SUBMIT: ", this.selectAnswer);
    this.selectAnswers.push(this.selectAnswer);
    this.formQuestion.reset();
    this.nextQuestion();
  }

  startTest(){
    if(this.questions)
    {
      this.currentQuestion = this.questions[this.position];
      this.loadAnswer();
    }
  }

  loadAnswer(){
    this._questionService.getAnswersByQuest(this.currentQuestion.id).subscribe((data:any)=>this.answers = data);
  }

  loadQuestions(){
    this._questionService.getQuestionsByTest(this.testId).subscribe((data:any)=>
    {
      this.questions = data;
      this.startTest(); 
    },
    error => {
      if(error.status==401)
      {
        this._router.navigate(["/login"]);
      }
      console.log(error);
    });
  }

  showResult(){
    this.currentQuestion = new Question;
  }

  clickBack(){
    this._router.navigate(["tests"]);
  }
}