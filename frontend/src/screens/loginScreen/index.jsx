import "../../styles/auth.css"
import menuVideo from "../../assets/videos/menuBgVdo.mp4";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import FormField from "../../components/FormField";
import { loginFields } from "./loginFields";

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Invalid Email")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", values)
                alert(response.data.message)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                if (response.data.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/story");
                }
            } catch (error) {
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
                    Every secret has a price...
                </p>

                <div className="authCard">

                    <form onSubmit={formik.handleSubmit}>
                        {
                            loginFields.map((field) => (
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
                            ENTER THE MANSION
                        </button>
                    </form>
                    <div className="authBottom">
                        Don't have an account?
                        <Link to="/signup">{" "}Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;