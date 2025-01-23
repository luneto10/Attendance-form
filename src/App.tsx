import Form from "./components/Form";


function App() {
    const studentsData: { name: string; course: string; labTime: string }[] = [];

    return (
        <div className="App">
            <Form studentsData={studentsData}/>
        </div>
    );
}

export default App;
