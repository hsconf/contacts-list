import {NavLink, Route, Routes} from "react-router-dom";
import Add from "./Add/Add";
import Contacts from "./Contacts/Contacts";

const App = () => {

    document.body.style.backgroundColor = 'rgba(17,31,76,0.87)';

    return (
        <>
            <header>
                <nav className="navbar bg-white">
                    <div className="container">
                        <NavLink to="/" className="navbar-brand fw-bold">Contacts</NavLink>
                        <NavLink to="/add" className="nav-link">Add contact</NavLink>
                    </div>
                </nav>
            </header>
            <main className="container">
                <Routes>
                    <Route path="/add" element={<Add />} />
                    <Route path="/" element={<Contacts />} />
                    <Route path="edit/:id" element={<Add />} />
                </Routes>
            </main>
        </>
    )
};

export default App
