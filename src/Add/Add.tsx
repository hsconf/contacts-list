import {useEffect, useState} from "react";
import {Contact} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {createContact, editingContactReq} from "./contactSlice";
import {useNavigate, useParams} from "react-router-dom";

const Add = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const editingContact = useSelector((state: RootState) => state.contacts.contact);
    const [contact, setContact] = useState<Contact>({
        name: '',
        email: '',
        phone: '',
        imageUrl: '',
    });
    const ava = 'https://i.pinimg.com/enabled_lo_mid/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg';
    const {id: params} = useParams();

    useEffect(() => {

        if (params) {
            setContact({
                name: editingContact.name,
                email: editingContact.email,
                phone: editingContact.phone,
                imageUrl: editingContact.imageUrl,
            })
        }

    }, [params, editingContact]);



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setContact(prev => ({
          ...prev,
          [e.target.name]: e.target.value,
      }))
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (params) {
            dispatch(editingContactReq({...contact, id: editingContact.id}));
            navigate('/');
        }

        dispatch(createContact({
            ...contact,
            imageUrl: contact.imageUrl || ava
        }));
        navigate("/");
    }

    return (
        <form onSubmit={onSubmit} className="d-flex flex-column mx-auto gap-2" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <input name="name" id="name" type="text" placeholder="Name" className="form-control" onChange={onChange} value={contact.name} required />
                <input name="email" id="email" type="text" placeholder="Email" className="form-control" onChange={onChange} value={contact.email} required />
                <input name="phone" id="phone" type="text" placeholder="Phone" className="form-control" onChange={onChange} value={contact.phone} required />
                <input name="imageUrl" id="imageUrl" type="text" placeholder="ImageUrl" className="form-control" onChange={onChange} value={contact.imageUrl} />
            {contact.imageUrl && <img src={contact.imageUrl} className="mx-auto border border-primary border-3" style={{width: 120, height: 120, borderRadius: '50%',}} alt="Photo" />}
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Add;