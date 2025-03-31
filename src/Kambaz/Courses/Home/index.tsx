import Modules from "../Modules";
import "../../styles.css"; // Ensure your styles file is included

export default function Home() {
  return (
    <div id="wd-course-home" className="d-flex flex-wrap">
      {/* Main Modules Section - Takes most space */}
      <div className="flex-grow-1 me-3">
        <Modules />
      </div>
    </div>
  );
}
