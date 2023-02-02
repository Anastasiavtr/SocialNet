import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useAppSelector } from '../../Types/hooks'
import { FilterType } from '../State/usersReducer'

type MyFormValues = {
  onFilterChanged: (filter: FilterType) => void
  getUsers: (page: number, pageSize: number, filter: FilterType) => void
}
const UsersSearchForm: React.FC<MyFormValues> = React.memo((props) => {
  const filter = useAppSelector((state) => state.usersPage.filter)
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: filter.friend }}
        onSubmit={(values) => {
          props.onFilterChanged(values)
        }}
      >
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select">
            <option value="false">All</option>
            <option value="true">Only followed</option>
          </Field>
          <button type="submit">Find</button>
        </Form>
      </Formik>
    </div>
  )
})

export default UsersSearchForm
