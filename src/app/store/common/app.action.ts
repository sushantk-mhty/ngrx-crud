import { createAction, props } from "@ngrx/store";

const SHOW_ALERT='[app] showAlert';
const EMPTY_ACTION='[app] emptyAction';


export const showAlert=createAction(SHOW_ALERT,props<{message:string,resulttype:string}>());
export const emptyAction=createAction(EMPTY_ACTION);