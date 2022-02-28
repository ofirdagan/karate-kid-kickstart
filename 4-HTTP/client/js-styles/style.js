import jss from "./style-config";
import { colors } from "./colors";

const style = {
  listItemText: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  addTodo: {
    width: "100%",
    margin: "10px 0px 30px 0px",
    borderRadius: 10,
    outline: 0,
    height: 40,
    paddingLeft: 10,
    border: `1px solid ${colors.gray}`,
    "&:focus": {
      border: `1px solid ${colors.paleblue}`,
    },
  },
  editTodo: {
    flexGrow: 1,
    borderRadius: 10,
    outline: 0,
    height: 30,
    margin: "0px 20px",
    paddingLeft: 10,
    border: `1px solid ${colors.gray}`,
    fontSize: 16,
    "&:focus": {
      border: `1px solid ${colors.paleblue}`,
    },
  },
  listItemActions: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: 15,
  },
  button: {
    backgroundColor: colors.redDanger,
    border: `1px solid ${colors.redDanger}`,
    color: colors.white,
    padding: "4px 12px",
    marginBottom: 5,
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: 16,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "transparent",
      border: `1px solid ${colors.redDanger}`,
      color: colors.redDanger,
    },
  },
  edit: {
    backgroundColor: colors.green,
    border: `1px solid ${colors.green}`,
    color: colors.white,
    padding: "4px 12px",
    marginBottom: 5,
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: 16,
    borderRadius: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "transparent",
      border: `1px solid ${colors.green}`,
      color: colors.green,
    },
  },
  todoText: {
    marginLeft: 20,
  },
  finishedTodo: {
    textDecoration: "line-through",
  },
  unfinishedTodo: {
    textDecoration: "none",
  },
};

export const { classes } = jss.createStyleSheet(style).attach();
