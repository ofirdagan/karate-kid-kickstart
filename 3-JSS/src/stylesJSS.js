
import jss from 'jss'
import preset from 'jss-preset-default'
jss.setup(preset())

const styles = {
    todoListItem: {
        "display": "flex",
        "flex-direction": "row",
        "align-items": "center",
        "padding": "15px",
        "font-size": "1.5rem",
        "border-bottom": "1px solid lightgrey",
        "border-top": "1px solid lightgrey",
    },
    todoItem: {
        "flex-grow": "1",
        "height": "30px",
        "border": "none",
        "outline": "0",
        "font-size": "1.5rem",
    },
    completed: {
        "text-decoration": "line-trough",
    },
    checked: {
        "margin": "20px",
        "cursor": "pointer",
    },

}
export const {classes} = jss.createStyleSheet(styles).attach()
