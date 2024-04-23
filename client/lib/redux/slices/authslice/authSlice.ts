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
    loyaltyPoints?: number;
}

const initialState: AuthState = {
    isLoggedIn: false, userinfo: 
    {
        id: '',
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        loyaltyPoints: 0
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
            state.userinfo = {
                id: '',
                name: '',
                email: '',
                contactNumber: '',
                address: '',
                loyaltyPoints: 0
            

            }
        },
        setuser: (state, action: PayloadAction<Userinfo>) => {
            state.userinfo = {...action.payload};
        },
    }
});

