export class CreateEvaluationRequest {
    creatorEmployeeId: number;
    evaluatorEmployeeId: number;
    evaluateeEmployeeId: number;
    surveyFormId: number;
    evaluation: EvaluationReqObject;

    constructor(creatorEmployeeId: number, evaluatorEmployeeId: number, evaluateeEmployeeId: number,
        surveyFormId: number, evaluation: EvaluationReqObject) {
        this.creatorEmployeeId = creatorEmployeeId;
        this.evaluateeEmployeeId = evaluateeEmployeeId;
        this.evaluatorEmployeeId = evaluatorEmployeeId;
        this.surveyFormId = surveyFormId;
        this.evaluation = evaluation
    }
}

export class EvaluationReqObject {
    status: string;
    remarks: string;
    answers?: Array<NumericChoiceAnswerReqObject>

    constructor(status: string, remarks: string) {
        this.status = status;
        this.remarks = remarks;
        this.answers = [];
    }
}

export class NumericChoiceQuestionReqObject {
    type: string;
    questionId: number;

    constructor(questionId: number) {
        this.type = "numericChoice";
        this.questionId = questionId;
    }
}

export class NumericChoiceAnswerReqObject {
    numericAnswer: number;
    question: NumericChoiceQuestionReqObject;

    constructor(numericAnswer: number, question: NumericChoiceQuestionReqObject) {
        this.numericAnswer = numericAnswer;
        this.question = question;
    }
}