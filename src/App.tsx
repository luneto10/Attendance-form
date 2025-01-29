import Form from "./pages/Form";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";

function App() {
    const studentsData: {
        nuid: string;
        name: string;
        course: string;
        labTime: string;
        deviceId: string;
    }[] = [];

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Form studentsData={studentsData} />}
                />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
