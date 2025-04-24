
export interface TFQuestion {
    _id: string;        
    qid: string;         
    qtitle: string;      
    points: number;      
    question_text: string;
    answer: boolean;     
  }

  export interface MCQQuestion {
    _id: string;
    qid: string;
    qtitle: string;
    points: number;
    question_text: string;
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
  }
  

  export interface FITBQuestion {
    _id: string;
    qid: string;
    qtitle: string;
    points: number;
    question_text: string;
    answer: string;      
    type: 'fitb';       
  }

  export type Question = TFQuestion | MCQQuestion | FITBQuestion;
  