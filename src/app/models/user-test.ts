export interface UserTest {
  questionsData: [
    {
      _id: string;
      qsId: string;
      questionHead: string;
      userAns: string;
      correctAns: string;
    }
  ];
  userId: {
    _id: string;
    username: string;
  };
  testId: string;
  userGrade: number;
}
