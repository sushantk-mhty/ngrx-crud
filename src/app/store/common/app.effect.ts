import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from './app.action';
import { MatSnackBar } from "@angular/material/snack-bar";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class AppEffect{
    action$ = inject(Actions);
    _snackbar= inject(MatSnackBar);

    _showAlert=createEffect(()=>
        this.action$.pipe(
            ofType(AppActions.showAlert),
            exhaustMap((action)=>{
                return this.shownSnackBarAlert(action.message,action.resulttype).afterDismissed().pipe(
                    map(()=>{
                        return AppActions.emptyAction();
                    })
                )
            })
        )
    )

    shownSnackBarAlert(message:string,resulttype:string='fail'){
        let _class=resulttype=='pass'?'green-snackbar':'red-snackbar';
       return this._snackbar.open(message,'OK',{
        verticalPosition:'top',
        horizontalPosition:'end',
        duration:5000,
        panelClass:[_class]
       });
    }

}