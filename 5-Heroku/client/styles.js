import jss from "jss";
import preset from "jss-preset-default";
import styles from "./toDoStyles";
jss.setup(preset());

export const { classes } = jss.createStyleSheet(styles).attach();
