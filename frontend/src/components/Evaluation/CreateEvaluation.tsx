import * as React from 'react';
import ViewSurveyForm from '../SurveyForm/ViewSurveyForm';

export interface ICreateEvaluationProps {
}

export interface ICreateEvaluationState {
}

export default class CreateEvaluation extends React.Component<ICreateEvaluationProps, ICreateEvaluationState> {
  constructor(props: ICreateEvaluationProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <ViewSurveyForm />
      </div>
    );
  }
}
