import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    userinfo: Userinfo;
}

interface Userinfo {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    address: string;
}

const initialState: AuthState = {
    isLoggedIn: false, userinfo: 
    {
        id: '',
        name: '',
        email: '',
        contactNumber: '',
        address: ''
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.isLoggedIn = false;
        },
        setuser: (state, action: PayloadAction<Userinfo>) => {
            state.userinfo = {...action.payload};
        },
    }
});

