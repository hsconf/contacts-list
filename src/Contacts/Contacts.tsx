import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Add/store";
import {useEffect} from "react";
import {fetchContacts, openModal, setContact} from "../Add/contactSlice";
import Modal from "../components/Modal/Modal";
import Loader from "../components/Loader/Loader";

const Contacts = () => {

    const {contacts, isOpen, editing, creating, isLoading, deleting} = useSelector((state: RootState) => state.contacts);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch, editing, creating, deleting])

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="mt-5 overflow-y-scroll overflow-x-hidden px-5" style={{height: '600px'}}>
            {contacts.map((contact) => (
                <div className="row align-items-center border border-2 p-3 mb-2 rounded" key={contact.id} onClick={() => {
                    dispatch(openModal(true))
                    dispatch(setContact(contact))
                }}>
                    <img src={contact.imageUrl} alt={contact.name} className="col-4" style={{width: '100px'}} />
                    <h3 className="col-4">{contact.name}</h3>
                </div>
            ))}
            {isOpen ? <Modal /> : null}
        </div>

    );
};

export default Contacts;