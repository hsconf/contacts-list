import {Contact, Contacts, IContact} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../App/axiosApi";

export interface ContactState {
    contacts: Contacts[];
    contact: Contacts;
    isLoading: boolean;
    isOpen: boolean;
}
const initialState: ContactState = {
    contacts: [],
    contact: {name: "", email: "", phone: "", imageUrl: "", id: ''},
    isLoading: false,
    isOpen: false,
}

export const createContact = createAsyncThunk<void, Contact>('contact/create', async (id: Contact) => {
    await axiosApi.post('/contacts.json', id)
});

export const fetchContacts = createAsyncThunk<Contacts[], void>('contact/fetch', async () => {
    try {
        const {data: response} = await axiosApi.get<IContact | null>('contacts.json');
        if (response === null) {
            return [];
        }

        return Object.keys(response).map((id) => ({
            ...response[id],
            id

        }))
    } catch (e) {
        console.log(e);
        return [];
    }
})

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = action.payload;
        },
        setContact: (state, action) => {
            state.contact = action.payload;
            console.log(state.contact);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createContact.pending, (state) => {
            state.isLoading = true;
        }).addCase(createContact.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(createContact.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchContacts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchContacts.fulfilled, (state, {payload}) => {
          state.isLoading = false;
          state.contacts = payload;
        }).addCase(fetchContacts.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export const contactReducer = contactSlice.reducer;
export const {openModal, setContact} = contactSlice.actions;
