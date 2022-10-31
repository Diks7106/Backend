import express from "express"
import StudentCtrl from "../controllers/student.controller.js"

const router = express.Router();

router.route("/addStudents").post(StudentCtrl.apiAddStudentData);
router.route("/getStudents").get(StudentCtrl.apiGetStudentData);

export default router