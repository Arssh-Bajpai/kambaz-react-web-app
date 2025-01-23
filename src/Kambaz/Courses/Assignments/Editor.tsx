
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h1>Assignment Editor</h1>

      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        id="wd-name"
        type="text"
        defaultValue="A1 - ENV + HTML"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      {/* Assignment Description */}
      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, link to the Kanbas application, and links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page."
        style={{ display: "block", marginBottom: "10px", width: "100%", height: "100px" }}
      ></textarea>

      {/* Points */}
      <label htmlFor="wd-points">Points</label>
      <input
        id="wd-points"
        type="number"
        defaultValue={100}
        style={{ display: "block", marginBottom: "10px", width: "100px" }}
      />

      {/* Assignment Group */}
      <label htmlFor="wd-assignment-group">Assignment Group</label>
      <select id="wd-assignment-group" style={{ display: "block", marginBottom: "10px" }}>
        <option value="assignments">Assignments</option>
        <option value="quizzes">Quizzes</option>
        <option value="labs">Labs</option>
      </select>

      {/* Display Grade As */}
      <label htmlFor="wd-grade-display">Display Grade as</label>
      <select id="wd-grade-display" style={{ display: "block", marginBottom: "10px" }}>
        <option value="percentage">Percentage</option>
        <option value="points">Points</option>
        <option value="letter-grade">Letter Grade</option>
      </select>

      {/* Submission Type */}
      <label htmlFor="wd-submission-type">Submission Type</label>
      <select id="wd-submission-type" style={{ display: "block", marginBottom: "10px" }}>
        <option value="online">Online</option>
        <option value="on-paper">On Paper</option>
        <option value="no-submission">No Submission</option>
      </select>

      {/* Online Entry Options */}
      <div>
        <p>Online Entry Options</p>
        <label>
          <input type="checkbox" value="text-entry" /> Text Entry
        </label>
        <br />
        <label>
          <input type="checkbox" value="website-url" /> Website URL
        </label>
        <br />
        <label>
          <input type="checkbox" value="media-recordings" /> Media Recordings
        </label>
        <br />
        <label>
          <input type="checkbox" value="student-annotation" /> Student Annotation
        </label>
        <br />
        <label>
          <input type="checkbox" value="file-uploads" /> File Uploads
        </label>
      </div>

      {/* Dates */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="wd-due-date">Due</label>
        <input id="wd-due-date" type="date" style={{ display: "block", marginBottom: "10px" }} />
        <label htmlFor="wd-available-from">Available From</label>
        <input
          id="wd-available-from"
          type="date"
          style={{ display: "block", marginBottom: "10px" }}
        />
        <label htmlFor="wd-available-until">Until</label>
        <input
          id="wd-available-until"
          type="date"
          style={{ display: "block", marginBottom: "10px" }}
        />
      </div>

      {/* Buttons */}
      <button style={{ marginRight: "10px" }}>Save</button>
      <button>Cancel</button>
    </div>
  );
}
