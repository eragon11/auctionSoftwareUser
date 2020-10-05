import React from "react";
import { TextField } from '@material-ui/core';
import Property from "../../entities/property";

class FormHelper {
    generateTextField(propInfo: Property, props: any, readonly: boolean) {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur
        } = props;
        const key = propInfo.propertyName;
        return (
            <TextField name={key} type={propInfo.fieldType}
                label={`${propInfo.displayName}`} fullWidth
                error={errors[key] && touched[key]}
                helperText={(errors[key] && touched[key]) && errors[key]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[key]}
                InputProps={{
                    readOnly: readonly,
                }}
            />
        );
    }
}

export default FormHelper;