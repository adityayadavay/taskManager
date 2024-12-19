import mySqlConnection from "../services/mysql/mysqlConnection.js"
import AuthenticationController from "../services/authentication.js"


class UserController extends AuthenticationController {
    constructor() {
        super()
        this.authService = new AuthenticationController();
    }
    addUser = async (req, res, next) => {
        const { name, email, password, userType } = req.body;
        const hashPassword = await this.authService.encryptPassword(password);
        const query = "INSERT INTO user (name, emailId, password, userType) VALUES (?, ?, ?, ?)";
        const values = [name, email, hashPassword, userType];
        const [results] = await mySqlConnection.query(query, values);
        res.status(200).json(results.insertId);
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userData = await this.getUserByEmail(email);
            if (userData && userData.length) {
                const isPasswordSame = await this.authService.decryptAndVerifyPassword(userData[0].password, password);
                if (isPasswordSame) {
                    const params = {
                        userId: userData[0].id,
                        userType: userData[0].userType, 
                        userName: userData[0].name
                    };
                    const token = this.authService.generateToken(params);
                    const userDetails = {
                        userName: userData[0].name,
                        userType: userData[0].userType
                    }
                    res.status(200).json({ token: token, user: userDetails });
                } else {
                    res.status(401).json("emailId or Password is incorrect");
                }
            } else {
                res.status(401).json("emailId or Password is incorrect");
            }


        } catch (err) {
            console.log(err)
            res.status(500).json("Something went wrong");
        }
    }
    getUserByEmail = async (emailId) => {
        try {
            const query = "select id,name,emailId,userType,password from user where emailId = ?";
            const values = [emailId];
            const [results] = await mySqlConnection.query(query, values);
            return results;
        } catch (err) {
            return null
        }
    }
}

export default UserController;