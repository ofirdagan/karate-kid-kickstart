import jss from 'jss'
import preset from 'jss-preset-default'
import * as listStyle from './styles/list-jss'

jss.setup(preset())

const { classes } = jss.createStyleSheet(listStyle.style).attach()
export default classes