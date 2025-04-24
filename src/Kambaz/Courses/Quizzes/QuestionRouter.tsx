import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./Questions/MCQQuestions";
import TrueFalseEditor from "./Questions/TFQuestions";
import FillInTheBlankEditor from "./Questions/FITBQuestions";

export default function QuestionRouter() {
  const { type } = useParams();
  console.log("ROUTING TO TYPE:", type);

  switch (type) {
    case "mcq":
      return <MultipleChoiceEditor />;
    case "tf":
        console.log("Rendering <TrueFalseEditor />");
        return <TrueFalseEditor />;
    case "fitb":
          console.log("Rendering <FillInTheBlankEditor />");

      return <FillInTheBlankEditor />;
    // case "fitb":
    //   return <FillInTheBlankEditor />;
    default:
      return <div>Not a valid question type</div>;
  }
}