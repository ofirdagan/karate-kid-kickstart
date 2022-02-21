import jss from "jss";
import preset from "jss-preset-default";
jss.setup(preset());
const styles = {
    body: {
        margin: 0,
        padding: 0,
    },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  taskListContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    border: "2px solid",
    borderRadius: "40px",
    width: "50%",
  },
  toDoListContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '16px'
  },
  toDoTasks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyleType: 'none',
    border: "1px solid",
    width: "50px",
    height: "70px",
    borderRadius: "40px",
    width: "50%",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  header: {
    height: "50px",
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: "100px",
  },
  buttonStyle : {
    textAlign: "center",
    backgroundColor: "green",
    padding: "5px",
  },
  addTaskContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: "100px",
    alignSelf: 'center',
  },
  doneTask: {
    textDecoration: 'line-through',
  }
  

}
export const {classes}=jss.createStyleSheet(styles).attach();



