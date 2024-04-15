import { AssociateModel } from "../model/associate.model";

export const initialAssociateState:AssociateModel={
    list: [],
    associateObj: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: true
    },
    errorMessage: ""
}