import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
    

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const assignment = assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        res.json(assignment);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentDao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });
}