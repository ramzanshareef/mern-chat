import Chatpage from "./pages/Chatpage";
import Chatspage from "./pages/Chatspage";
import Homepage from "./pages/Homepage";
import Notfound from "./pages/Notfound";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    {/* <Route exact path="/chat" element={<Chatpage />} /> */}
                    <Route exact path="/chat" element={<Chatspage />} />

                    
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;