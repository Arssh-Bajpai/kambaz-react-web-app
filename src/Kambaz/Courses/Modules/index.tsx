import { FaCheckCircle } from "react-icons/fa";
import "../../styles.css"; // Ensure your styles are included

export default function Modules() {
  return (
    <div id="wd-modules">
      {/* Week 1 */}
      <div className="module-header d-flex justify-content-between align-items-center bg-secondary text-white p-2">
        <span>Week 1</span>
        <FaCheckCircle className="text-success fs-5" />
      </div>
      <div className="module-content border">
        <div className="p-2 border-bottom">LEARNING OBJECTIVES</div>
        <div className="p-2 border-bottom">Introduction to the course</div>
        <div className="p-2 border-bottom">Learn what is Web Development</div>
        <div className="p-2 border-bottom">LESSON 1</div>
        <div className="p-2">LESSON 2</div>
      </div>

      {/* Week 2 */}
      <div className="module-header d-flex justify-content-between align-items-center bg-secondary text-white p-2 mt-3">
        <span>Week 2</span>
        <FaCheckCircle className="text-success fs-5" />
      </div>
      <div className="module-content border">
        <div className="p-2 border-bottom">LESSON 1</div>
        <div className="p-2">LESSON 2</div>
      </div>
    </div>
  );
}
