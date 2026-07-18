import axios from 'axios'
import "../../styles/auth.css";
import menuVideo from "../../assets/videos/menuBgVdo.mp4";

import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import FormField from "../../components/FormField";
import { signupFields } from "./signupFields";

const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            username: yup
                .string()
                .required("Username is required")
                .min(3),
            email: yup
                .string()
                .email("Invalid Email")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .min(6),
            confirmPassword: yup
                .string()
                .oneOf(
                    [yup.ref("password")],
                    "Passwords do not match"
                )
                .required("Confirm Password is required")
        }),
        onSubmit: async(values) => {
            try{
                const response=await axios.post("http://localhost:3000/api/auth/signup",values)
                console.log(response.data)
                navigate('/login')
            }catch(error){
                alert(error.response.data.message)
            }
        }
    });

    return (
        <div className="authParent">
            <video
                src={menuVideo}
                autoPlay
                muted
                loop
                className="authVideo"
            />

            <div className="authOverlay"></div>
            <div className="authContainer">

                <h1 className="authTitle">RAHASYA</h1>

                <p className="authQuote">
                    The mansion welcomes another soul...
                </p>

                <div className="authCard">
                    <form onSubmit={formik.handleSubmit}>

                        {
                            signupFields.map((field) => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    formik={formik}
                                />
                            ))
                        }
                        <button
                            type="submit"
                            className="authBtn"
                        >
                            BEGIN THE CURSE
                        </button>
                    </form>
                    <div className="authBottom">
                        Already have an account?
                        <Link to="/login">{" "}Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;