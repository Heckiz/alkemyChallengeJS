import axios from 'axios';

// constantes
const dataInicial = {
    movementsPagination: [],
    movementsData:[],
    totalMovements: 0,
    page: 0
}

// types
const GET_MOVEMENTS_PAGINATION = 'GET_MOVEMENTS_PAGINATION'
const GET_MOVEMENTS_PAGINATION_NEXT= 'GET_MOVEMENTS_PAGINATION_NEXT'
const GET_MOVEMENTS_PAGINATION_BACK= 'GET_MOVEMENTS_PAGINATION_BACK'

const GET_MOVEMENTS_DATA = 'GET_MOVEMENTS_DATA'
const DELETE_MOVEMENT = 'DELETE_MOVEMENT'
const EDIT_MOVEMENT = 'EDIT_MOVEMENT'
const CREATE_MOVEMENT = 'CREATE_MOVEMENT'

// reducer
export default function reducers(state = dataInicial, action) {
    switch (action.type) {
        case GET_MOVEMENTS_PAGINATION:
            return { ...state, movementsPagination: action.payload };
            case GET_MOVEMENTS_PAGINATION_NEXT:
            return { ...state, movementsPagination: action.payload };
            case GET_MOVEMENTS_PAGINATION_BACK:
                return { ...state, movementsPagination: action.payload };
        case GET_MOVEMENTS_DATA:
            return { ...state, movementsData: action.payload };
        case CREATE_MOVEMENT:
            return { ...state, movementsData: action.payload };
        case DELETE_MOVEMENT:
            return { ...state, movementsData: action.payload };
        case EDIT_MOVEMENT:
            return { ...state, dataMovement: action.payload };
        default:
            return state
    }
}

// actions

export const getMovementsPagination = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('api/movements');
        getState().movements.totalMovements = res.data.count;
        dispatch({
            
            type: GET_MOVEMENTS_PAGINATION,
            payload:res.data.rows
        })
    } catch (error) {
        console.log(error)
    }
}
export const getMovementsPaginationNext = () => async (dispatch, getState) => {
    try {
        let page  = getState().movements.page;
        if(page<0){
            page=0;
            getState().movements.page= 0;
        }else{        
            getState().movements.page++;
        }
        let next = page+1 
         console.log(next)
        const res = await axios.get(`api/movements?page=${next}`);
        dispatch({
            
            type: GET_MOVEMENTS_PAGINATION_NEXT,
            payload:res.data.rows
        })
    } catch (error) {
        console.log(error)
    }
}
export const getMovementsPaginationBack= () => async (dispatch, getState) => {
    try {
        let page  = getState().movements.page;
        getState().movements.page--;
        let back = page-1 ;
        const res = await axios.get(`api/movements?page=${back}`);
        dispatch({
            
            type: GET_MOVEMENTS_PAGINATION_BACK,
            payload:res.data.rows
        })
    } catch (error) {
        console.log(error)
    }
}
export const getMovementsData = () => async (dispatch,getState) => {
    try {
        const totalMovements = getState().movements.totalMovements
        const res = await axios.get(`api/movements?page=0&offset=${totalMovements}`)
        dispatch({
            type: GET_MOVEMENTS_DATA,
            payload: res.data.rows
        })
        console.log(getState().movements);

    } catch (error) {
        console.log(error)
    }
}

export const createMovement = (data) => async (dispatch) => {
    try {
        const res = await axios.post('api/movements', data)
        dispatch({
            type: CREATE_MOVEMENT,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteMovement = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`api/movements/${id}`)
        dispatch({
            type: DELETE_MOVEMENT,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const editMovement = (id, data) => async (dispatch) => {
    try {
        const res = await axios.put(`api/movements/${id}`, data)
        dispatch({
            type: EDIT_MOVEMENT,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}