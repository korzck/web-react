import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserState {
    id: number
    isLogin: boolean
    name: string
    tag: string
    order: number
    minPrice: string
    maxPrice: string
    material: string
    minDate: string
    maxDate: string
    status: string
    userId: string
}

const initialState: UserState = {
    id: 0,
    isLogin: false,
    tag: 'guest',
    name: 'guest',
    order: 0,
    minPrice: '',
    maxPrice: '',
    material: '',
    minDate: '',
    maxDate: '',
    status: 'all',
    userId: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, value: PayloadAction<string>) => {
            state.name = value.payload
        },
        setEmail: (state, value: PayloadAction<string>) => {
            state.name = value.payload
        },
        setIsLogin: (state, value: PayloadAction<boolean>) => {
            state.isLogin = value.payload
        },
        setId: (state, value: PayloadAction<number>) => {
            state.id = value.payload
        },
        setMax: (state, value: PayloadAction<string>) => {
            state.maxPrice = value.payload
        },
        setMin: (state, value: PayloadAction<string>) => {
            console.log("changed to", value.payload)
            state.minPrice = value.payload
        },
        setMaterial: (state, value: PayloadAction<string>) => {
            state.material = value.payload
        },
        setTag: (state, value: PayloadAction<string>) => {
            state.tag = value.payload
        },
        setOrder: (state, value: PayloadAction<number>) => {
            state.order = value.payload
        },
        setMaxDate: (state, value: PayloadAction<string>) => {
            state.maxDate = value.payload
        },
        setMinDate: (state, value: PayloadAction<string>) => {
            state.minDate = value.payload
        },
        setStatus: (state, value: PayloadAction<string>) => {
            state.status = value.payload
        },
        setUserId: (state, value: PayloadAction<number>) => {
            state.userId = value.payload
        }
    }
})

export const {
    setName, 
    setEmail, 
    setIsLogin, 
    setId, 
    setMax, 
    setMin, 
    setMaterial, 
    setTag, 
    setOrder,
    setMaxDate,
    setMinDate,
    setStatus,
    setUserId
} = userSlice.actions

export default userSlice.reducer