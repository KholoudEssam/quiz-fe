export interface Question {
  _id: string;
  head: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  forthChoice: string;
  correctAnswer?: string;
  grade?: number;
  adminID?: {
    username: string;
  };
}

export interface Report {
  questionHead: string;
  userAns: string;
  correctAns: string;
}
