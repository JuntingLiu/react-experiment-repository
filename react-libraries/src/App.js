import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup';

// function App() {
//   const formik = useFormik({
//     initialValues: { username: '', password: '' },
//     // validate: values => {
//     //   const errors = {}
//     //   if (!values.username) {
//     //     errors.username = '请输入用户名'
//     //   } else if (values.username.length > 15) {
//     //     errors.username = '用户名长度不能大于15'
//     //   };
//     //   if (!values.password) errors.password = '请输入密码';
//     //   return errors
//     // },
//     validationSchema: Yup.object({
//       username: Yup.string()
//         .max(15, '用户名长度不能超过 15')
//         .required('请输入用户名'),
//       password: Yup.string()
//         .min(6, '密码长度不能小于6')
//         .required('请填写密码')
//     }),
//     onSubmit: values => {
//       console.log(values);
//     }
//   });

//   return (
//     <div className="App">
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           // value={formik.values.username}
//           // onChange={formik.handleChange}
//           // onBlur={formik.handleBlur}
//           {...formik.getFieldProps('username')}
//           />
//         <input
//           type="password"
//           name="password"
//           // value={formik.values.password}
//           // onChange={formik.handleChange}
//           // onBlur={formik.handleBlur}
//           {...formik.getFieldProps('password')}
//           />
//         <input type="submit"/>
//         {/* 使用 touched 判断是否操作的该输入框 * 失胶时触发 */}
//         {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
//         {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
//       </form>
//     </div>
//   );
// }

function MyInputField({label, ...props}) {
  const [field, meta] = useField(props)
  return <div>
    <label htmlFor="props.id">{label}</label>
    <input {...field} {...props} />
    { meta.touched && meta.error ? <div>meta.error</div> : null }
  </div>
}

function Checkbox({label, ...props}) {
  const [field, meta, helper] = useField(props);
  const { value } = meta;
  const { setValue } = helper;

  const handleChange = () => {
    const set = new Set(value);
    if (set.has(props.value)) {
      set.delete(props.value)
    } else {
      set.add(props.value)
    }
    setValue([...set])
  }
  return <div>
    <label htmlFor={props.id}>
      <input type="checkbox" checked={value.includes(props.value)} {...field} {...props} onChange={handleChange}/> {label}
    </label>
  </div>
}

function App () {
  const initialValues = {
    hobbies: ["football"]
  };
  const validationSchema = Yup.object({
  })
  const handleSubmit = values => {
    console.log("🚀 ~ file: App.js ~ line 64 ~ App ~ values", values)
  }
  return (
    <div className="app">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >
        <Form>
          <Checkbox value="football" label="足球" name="hobbies"/>
          <Checkbox value="basketball" label="篮球" name="hobbies"/>
          <Checkbox value="rugby" label="橄榄球" name="hobbies"/>
          <Checkbox value="volleyball" label="排球" name="hobbies"/>
          <input type="submit"/>
        </Form>
      </Formik>
    </div>
  )
}

export default App;
