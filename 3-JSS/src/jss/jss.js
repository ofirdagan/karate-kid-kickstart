import jss from 'jss'
import preset from 'jss-preset-default'
import * as listStyle from './styles/list-jss'

jss.setup(preset())

export const {classes} = jss.createStyleSheet(listStyle.style).attach()