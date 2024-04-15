import { createAction, props } from "@ngrx/store";
import { Associates } from "../model/associate.model";

const LOAD_ASSOCIATE='[associate Component] LoadAssociate';
const LOAD_ASSOCIATE_SUCCESS='[associate Component] LoadAssociateSuccess';
const LOAD_ASSOCIATE_FAILURE='[associate Component] LoadAssociateFailure';


const ADD_ASSOCIATE='[associate Component] AddAssociate';
const ADD_ASSOCIATE_SUCCESS='[associate Component] AddAssociateSuccess';

const GET_ASSOCIATE='[associate Component] GetAssociate';
const GET_ASSOCIATE_SUCCESS='[associate Component] GetAssociateSuccess';

const OPEN_POPUP='[associate Component] OpenPopup';

const UPDATE_ASSOCIATE='[associate Component] UpdateAssociate';
const UPDATE_ASSOCIATE_SUCCESS='[associate Component] UpdateAssociateSuccess';

const DELETE_ASSOCIATE='[associate Component] DeleteAssociate';
const DELETE_ASSOCIATE_SUCCESS='[associate Component] DeleteAssociateSuccess';


export const loadAssociate=createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess=createAction(LOAD_ASSOCIATE_SUCCESS,props<{list:Associates[]}>());
export const loadAssociateFailure=createAction(LOAD_ASSOCIATE_FAILURE,props<{errormessage:string}>());

export const addAssociate=createAction(ADD_ASSOCIATE,props<{inputdata:Associates}>());
export const addAssociateSuccess=createAction(ADD_ASSOCIATE_SUCCESS,props<{inputdata:Associates}>());


export const getAssociate=createAction(GET_ASSOCIATE,props<{id:number}>());
export const getAssociateSuccess=createAction(GET_ASSOCIATE_SUCCESS,props<{obj:Associates}>());

export const openPopup=createAction(OPEN_POPUP);

export const updateAssociate=createAction(UPDATE_ASSOCIATE,props<{inputdata:Associates}>());
export const updateAssociateSuccess=createAction(UPDATE_ASSOCIATE_SUCCESS,props<{inputdata:Associates}>());

export const deleteAssociate=createAction(DELETE_ASSOCIATE,props<{code:number}>());
export const deleteAssociateSuccess=createAction(DELETE_ASSOCIATE_SUCCESS,props<{code:number}>());
