import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Add/store";
import {deleteContact, openModal} from "../../Add/contactSlice";
import {Link} from "react-router-dom";

const Modal = () => {
    const dispatch: AppDispatch = useDispatch();
    const {contact} = useSelector((state: RootState) => state.contacts);

    return (
        <div className="position-absolute" onClick={() => dispatch(openModal(false))} style={{top: '56px', right: 0, bottom: '56px', left: 0, zIndex: 99}}>
            <div className="bg-white" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999}}>
                <div className="row align-items-center">
                    <div className="col-6 p-0">
                        <img src={contact.imageUrl} className="w-100" alt={contact.name}/>
                    </div>
                    <div className="col-6 d-flex flex-column gap-2 p-2">
                        <h1 className="m-0 h1">{contact.name}</h1>
                        <span>{contact.phone}</span>
                        <span>{contact.email}</span>
                        <div>
                            <Link className="btn btn-warning" to={`edit/${contact.id}`}>edit</Link>
                            <button className="btn btn-danger ms-1" onClick={() => dispatch(deleteContact(contact.id))}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;