import { createReducer, on } from "@ngrx/store"
import { initialAssociateState } from "./associate.state"
import * as AssociateActions from './associate.actions';

const _AssociateReducer = createReducer(initialAssociateState,
    on(AssociateActions.loadAssociateSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),
    on(AssociateActions.loadAssociateFailure, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errormessage
        }
    }),
    on(AssociateActions.addAssociateSuccess, (state, action) => {
        const _maxId=Math.max(...state.list.map(o=>o.id));
        const _newData={...action.inputdata};
        _newData.id=_maxId + 1;
        return {
            ...state,
            list: [...state.list,_newData],
            errorMessage: ''
        }
    }),
    on(AssociateActions.getAssociateSuccess, (state, action) => {
        return {
            ...state,
            associateObj:action.obj,
            errorMessage: ''
        }
    }),
    on(AssociateActions.openPopup, (state, action) => {
        return {
            ...state,
            associateObj:{
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                associategroup: "level1",
                status: true
            }
        }
    }),
    on(AssociateActions.updateAssociateSuccess, (state, action) => {
        const _newData=state.list.map(o=>{
            return o.id===action.inputdata.id?action.inputdata:o
        })
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),

    on(AssociateActions.deleteAssociateSuccess, (state, action) => {
        const _newData=state.list.filter(o=>o.id !== action.code);
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    })
)

export function AssociateReducer(state: any, action: any) {
    return _AssociateReducer(state, action);
}