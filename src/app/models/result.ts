import { Answer } from "./answer";

export class Result{
    answers!: Answer[];
}

export class ResponseResult{
    countOfAnswer!:number;
    countOfRightAnswers!:number;
}