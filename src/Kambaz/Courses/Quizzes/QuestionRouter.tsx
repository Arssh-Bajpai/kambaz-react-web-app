import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./Questions/MCQ_Question";
import TrueFalseEditor from "./Questions/TF_Question";
import FillInTheBlankEditor from "./Questions/FITB_Question";

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