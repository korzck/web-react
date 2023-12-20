import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserState {
    id: number
    value: number
    isLogin: boolean
    name: string
    minPrice: string
    maxPrice: string
    material: string
}

const initialState: UserState = {
    id: 0,
    value: 0,
    isLogin: false,
    name: 'guest',
    minPrice: '',
    maxPrice: '',
    material: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        setStoreName: (state, name: PayloadAction<string>) => {
            state.name = name.payload
        },
        setStoreEmail: (state, email: PayloadAction<string>) => {
            state.name = email.payload
        },
        setIsLogin: (state, isLogin: PayloadAction<boolean>) => {
            state.isLogin = isLogin.payload
        },
        setId: (state, id: PayloadAction<number>) => {
            state.id = id.payload
        },
        setMax: (state, id: PayloadAction<string>) => {
            state.maxPrice = id.payload
        },
        setMin: (state, id: PayloadAction<string>) => {
            console.log("changed to", id.payload)
            state.minPrice = id.payload
        },
        setMaterial: (state, id: PayloadAction<string>) => {
            state.material = id.payload
        }
    }
})

export const {setStoreName, setStoreEmail, setIsLogin, setId, setMax, setMin, setMaterial} = userSlice.actions

export default userSlice.reducer