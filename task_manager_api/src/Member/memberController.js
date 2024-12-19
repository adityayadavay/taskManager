import moment from "moment";
import mySqlConnection from "../services/mysql/mysqlConnection.js";
import MemberModel from "./memberModel.js";

class MemberController {
    constructor() {
        this.memberModel = new MemberModel();
    }
    addProject = async (req, res, next) => {
        const { name, description, date } = req.body;
        const epochDate = moment(date).valueOf();

        const query = "INSERT INTO project (name, description, completionDate) VALUES (?, ?, ?)";
        const values = [name, description, epochDate];
        await mySqlConnection.query(query, values);
        res.status(200).json("Project is created successfully");
    }
    updateProject = async (req, res, next) => {
        const { name, description, date, id } = req.body;
        const epochDate = moment(date).valueOf();

        const query = "update project set name = ?, description = ?, completionDate = ? where id = ?";
        const values = [name, description, epochDate, id];
        await mySqlConnection.query(query, values);
        res.status(200).json("Project is udpated successfully");
    }
    getAllMembers = async (req, res, next) => {
        const query = "select * from user where userType=2";
        const [results] = await mySqlConnection.query(query);
        res.status(200).json(results);
    }
    getMembersByProjectId = async (req, res, next) => {
        const id = req.params.id;
        const query = "select u.id,u.name,u.emailId from project_members pm join user u on u.id = pm.memberId where projectId = ?";
        const [results] = await mySqlConnection.query(query, [id]);
        res.status(200).json(results);
    }
    getMembersNotPrtOfProjectId = async (req, res, next) => {
        const id = req.params.id;
        const query = "select u.id,u.name,u.emailId from user u where u.id not in (select memberId from project_members where projectId = ?) and u.userType=2;";
        const [results] = await mySqlConnection.query(query, [id]);
        res.status(200).json(results);
    }
    addMemberToProject = async (req,res,next) => {
        try {
            const { memberId, projectId } = req.body;
            const values = [projectId, memberId];
            const query = `INSERT INTO project_members (projectId, memberId) VALUES (?,?)`;
            const [response] = await mySqlConnection.query(query, values);
            res.status(200).json(response.insertId);
        } catch (err) {
            console.log(err);
            res.status(500).json(null);
        }

    }

}

export default MemberController;