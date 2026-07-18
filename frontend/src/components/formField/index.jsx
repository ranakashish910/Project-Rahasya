const FormField = ({ field, formik }) => {
    return (
        <div>

            <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="authInput"
            />

            {formik.touched[field.name] &&
                formik.errors[field.name] ? (
                <p className="errorText">
                    {formik.errors[field.name]}
                </p>
            ) : null}

        </div>
    );
};

export default FormField;