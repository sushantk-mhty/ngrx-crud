import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "../model/associate.model";

const selectAssociateFeature = createFeatureSelector<AssociateModel>('associate');

export const getAssociateList = createSelector(selectAssociateFeature, (state) => {
    return state.list;
});
export const getAssociate= createSelector(selectAssociateFeature, (state) => {
    return state.associateObj;
})
