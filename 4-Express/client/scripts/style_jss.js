import { jss } from './preset_jss'
import { colors } from './colors_jss'

const styles = {
  editBtn : {
    color: colors.lightGreen,
    '&:hover': {
      color: colors.darkGreen,
      background: colors.lightGreen
    }
  },
  confirmBtn : {
    color: colors.lightGreen,
    '&:hover': {
      color: colors.darkGreen,
      background: colors.lightGreen
    }
  },
  removeBtn : {
    color: colors.lightRed,
    borderRadius: '0px 10px 10px 0px',
    '&:not(.disabled)': {
      '&:hover' :{
        color: colors.darkRed,
        background: colors.lightRed
      }
    }
  },
  checkBtn: {
    color: colors.lightGray,
    background: colors.lightGray,
    borderRadius: '10px 0px 0px 10px',
    '&:not(.disabled)': {
      '&:hover' :{
        color: colors.darkGray,
        background: colors.darkGray
      }
    },
    '&.checked' : {
      color: colors.darkGray,
      background: colors.lightGray,
      '&:not(.disabled)': {
        '&:hover' :{
          color: colors.lightGray,
          background: colors.darkGray
        }
      }
    }
  },
  item: {
    width: '100%',
    fontSize: '18px',
    padding: '10px',
    textAlign: 'left',
    display: 'block'
  }
}

export const {classes} = jss.createStyleSheet(styles).attach();