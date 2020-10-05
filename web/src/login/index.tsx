import React from "react";
import { Formik } from "formik";
import { Grid, Box } from "@material-ui/core";
import * as Yup from "yup";

import styles from "./login.module.scss";
import PrimaryButton from "../resuables/primary-button/primary-button";
import FormHelper from "../resuables/form-generator";
import Property, { Align, FieldType } from "../entities/property";
import UserContext from "../service/user";
import LoadingComponent from "../resuables/loading/loading.component";

interface Props {
  history: any;
}

interface LoginState {
  isLogged: boolean;
  invalidCred: boolean;
  fpo: boolean;
  isLoaded: boolean;
  errorMsg: string;
}

class Login extends React.Component<Props, LoginState> {
  frmHlpSrv: FormHelper;
  properties: any;
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  constructor(props: any) {
    super(props);
    this.frmHlpSrv = new FormHelper();
    this.properties = [
      new Property(
        "name",
        true,
        "Email / Username",
        Align.center,
        FieldType.textField,
        false,
        true
      ),
      new Property(
        "password",
        true,
        "Password",
        Align.left,
        FieldType.password,
        true,
        false
      ),
    ];
    this.state = {
      isLogged: false,
      invalidCred: false,
      fpo: false,
      isLoaded: true,
      errorMsg: "",
    };
  }
  formData = {
    name: "",
    password: "",
  };

  
  componentDidMount(){
    localStorage.removeItem("xauthtoken")
  }

  async handleSubmit(values: any) {
    const userSrv = this.context;
    this.setState({
      invalidCred: false,
      isLoaded: false,
    });
    const logres = await userSrv.authenticate(values);
    let hashboolean = false;
    let errMsg = "";
    console.log(logres);

    if (logres === "success") {
      await this.context.initialize();
      hashboolean = false;
    } else if (logres === "Not_Verified") {
      hashboolean = true;
      errMsg = "Email not verified";
    } else {
      hashboolean = true;
      errMsg = "Incorrect credentials";
    }
    this.setState({
      isLogged: logres === "success",
      isLoaded: true,
      invalidCred: hashboolean,
      errorMsg: errMsg,
    });
    const history = this.props.history;
    const from = { pathname: "/user" };
    console.log("Redirecting to ", from);
    history.replace(from);
  }

  handlefpo(): void {
    this.setState({
      fpo: true,
    });
  }
  handleClose(): void {
    this.setState({
      fpo: false,
    });
  }
  formSchema = Yup.object().shape({
    name: Yup.string()
      .required("email or username is required")
      .matches(
        /^([a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\\[a-zA-Z0-9_-]+|([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}))$/,
        "Invalid email or username"
      ),
    password: Yup.string().required("Password is required"),
  });
  generateForm = (props: any, prp: Property) => {
    let r;
    if (this.frmHlpSrv) {
      if (
        prp.fieldType === FieldType.textField ||
        prp.fieldType === FieldType.password
      ) {
        r = this.frmHlpSrv.generateTextField(prp, props, false);
      }
    }

    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        style={{ padding: "43px 0px" }}
        key={prp.propertyName}
      >
        {r}
      </Grid>
    );
  };
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    /* redirect to home page when already authenticated */

    if (!this.state) return <div>Loading...</div>;
    return (
      <Grid container className={styles.container}>
        <Grid container className={styles.content}>
          <Grid item className={styles.rightBox}>
            <Box className={styles.login}>
              <Grid container justify="center">
                <Box className={styles.topic}>SIGN IN</Box>
                {this.state.invalidCred ? (
                  <Grid container className={styles.invalid}>
                    <p>{this.state.errorMsg}</p>
                  </Grid>
                ) : undefined}
              </Grid>
              <Formik
                initialValues={this.formData}
                onSubmit={this.handleSubmit.bind(this)}
                validationSchema={this.formSchema}
              >
                {(props: any) => {
                  const { handleSubmit } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <Grid container>
                        {this.properties &&
                          this.properties.map((t: any) =>
                            this.generateForm(props, t)
                          )}
                      </Grid>
                      <PrimaryButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                      >
                        Sign In
                      </PrimaryButton>
                    </form>
                  );
                }}
              </Formik>
              <LoadingComponent
                isLoading={!this.state.isLoaded}
              ></LoadingComponent>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
