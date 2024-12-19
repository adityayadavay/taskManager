import { Route,Routes } from "react-router-dom";
import ManageMember from "./manageMember";

const MemberContainer = () => {
    return (
        <Routes>
            <Route path="/manage/project/:id" element={<ManageMember />}/>
        </Routes>
    )
}
export default MemberContainer;