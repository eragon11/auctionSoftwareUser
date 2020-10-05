import { Button, withStyles } from "@material-ui/core";
const PrimaryButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#116114",
    padding: "4px 36px",
    fontSize: "18px",
    textTransform: "unset",
    borderRadius: "0px",
    display: "block",
    "&:hover": {
      backgroundColor: "#1D6D3E",
      borderColor: "#116114",
      boxShadow: "none",
    }
  }
}))(Button);

export default PrimaryButton;