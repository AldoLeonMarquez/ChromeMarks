import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues ={
  id:0,
  name:'',
  tag1:'',
  tag2:'',
  tag3:'',
  url:'',
  departmentId: '',
  notes:'',
  date: new Date(),
  used:'',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
              temp.name = fieldValues.name ? "" : "This field is required."
        if ('notes' in fieldValues)
            temp.notes = fieldValues.notes ? "" : "This field is required."

        if ('url' in fieldValues)
            temp.url = fieldValues.url ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="URL"
                        name="url"
                        value={values.url}
                        onChange={handleInputChange}
                        error={errors.url}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Folder"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />


                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="tag1"
                        label="Main Tag"
                        value={values.tag1}
                        onChange={handleInputChange}
                        error={errors.tag1}
                    />
                    <Controls.Input
                        name="tag2"
                        label="Second Tag"
                        value={values.tag2}
                        onChange={handleInputChange}
                        error={errors.tag2}
                    />
                    <Controls.Input
                        name="tag3"
                        label="Third Tag"
                        value={values.tag3}
                        onChange={handleInputChange}
                        error={errors.tag3}
                    />
                    <Controls.Input
                        label="Notes"
                        name="notes"
                        value={values.notes}
                        onChange={handleInputChange}
                        error={errors.notes}
                    />
                    <Controls.DatePicker
                          name="date"
                          label="Date"
                          value={values.date}
                          onChange={handleInputChange}
                      />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
