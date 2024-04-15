import { Injectable, inject } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import * as AssociateActions from './associate.actions';
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import * as AppActions from '../common/app.action';

@Injectable()
export class AssociateEffect {
    action$ = inject(Actions);
    service = inject(AssociateService);

    _loadAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(AssociateActions.loadAssociate),
            exhaustMap((action) => {
                return this.service.getAllAssociate().pipe(
                    map((data) => {
                        return AssociateActions.loadAssociateSuccess({ list: data })
                    }),
                    catchError((_error) => of(AssociateActions.loadAssociateFailure({ errormessage: _error.message })))
                )
            })
        )
    )

    _addAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(AssociateActions.addAssociate),
            switchMap((action) => {
                return this.service.createAssociate(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(AssociateActions.addAssociateSuccess({ inputdata: action.inputdata }),
                        AppActions.showAlert({ message: 'Created associate successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(AppActions.showAlert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    )

    _getAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(AssociateActions.getAssociate),
            exhaustMap((action) => {
                return this.service.getAssociateByCode(action.id).pipe(
                    map((data) => {
                        return AssociateActions.getAssociateSuccess({ obj: data })
                    }),
                    catchError((_error) => of(AppActions.showAlert({ message: 'Failed to fetch associate' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _updateAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(AssociateActions.updateAssociate),
            switchMap((action) => {
                return this.service.updateAssociate(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(AssociateActions.updateAssociateSuccess({ inputdata: action.inputdata }),
                        AppActions.showAlert({ message: 'Updated associate successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(AppActions.showAlert({ message: 'Failed to update associate', resulttype: 'fail' })))
                )
            })
        )
    )

    _deleteAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(AssociateActions.deleteAssociate),
            switchMap((action) => {
                return this.service.deleteAssociate(action.code).pipe(
                    switchMap((data) => {
                        return of(AssociateActions.deleteAssociateSuccess({ code: action.code }),
                        AppActions.showAlert({ message: 'Deleted associate successfully', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(AppActions.showAlert({ message: 'Failed to delete associate', resulttype: 'fail' })))
                )
            })
        )
    )
}