import moment from "moment";
import mySqlConnection from "../services/mysql/mysqlConnection.js";

class ProjectConroller {
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
    getAllProjects = async (req, res, next) => {
        try {
            const userId = req.params.userId;

            console.log("userId = ", userId);
            let query = "select * from project";
            let values = [];
            if(!isNaN(userId)) {
                query = `select p.* from project p join project_members pm on p.id=pm.projectId
                        where pm.memberId= ?`;
                        values.push(userId)
            }
            console.log(query,values)
            const [results] = await mySqlConnection.query(query,values);
            console.log("results = ", results);
            
            res.status(200).json(results);
        } catch(err) {
            console.log(err);
            res.status(500).json("Something went wrong");
        }
    }
    getProjectById = async (req, res, next) => {
        const id = req.params.id;
        const query = "select * from project where id = ?";
        const [results] = await mySqlConnection.query(query, [id]);
        res.status(200).json(results);
    }
    
}

export default ProjectConroller;