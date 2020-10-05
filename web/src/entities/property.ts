/* eslint-disable @typescript-eslint/camelcase */
class Property {
    propertyName!: string;
    isSortable!: boolean;
    displayName!: string;
    align!: Align;
    fieldType!: FieldType;
    isDisplayed!: boolean;
    editable: boolean;

    constructor(pn: string, isSort: boolean, dn: string, an: Align, ft: FieldType, id: boolean, editable: boolean) {
        this.propertyName = pn;
        this.isSortable = isSort;
        this.displayName = dn;
        this.align = an;
        this.fieldType = ft;
        this.isDisplayed = id;
        this.editable = editable;
    }
}

export enum Align {
    left = "flex-start",
    right = "flex-end",
    center = 'center'
}
export enum FieldType {
    textField = 'text',
    password = 'password',
}
export default Property;