import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const style = {
    '.list':{
        'padding-right': '50px',
    },
    'todoItem':{
        'display': 'flex', 
        'flex-direction': 'row',
        'justify-content': 'space-between',
        'padding':'5px', 
        'border-radius': '10px', 
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        'margin-bottom': '12px',
        'background-color': 'white',
        '&:hover':{
            'background-color': 'whitesmoke'
        }
    },
    'itemCheckbox':{
        'margin-right': '10px',
    },
    'todoItemText':{
        'display': 'flex', 
        'flex-direction': 'column',
        'align-self': 'stretch',
    },
    'todoItemButtons':{ 
        'display': 'flex', 
        'flex-direction': 'row', 
        'justify-content': 'space-between',
        'align-items': 'center',
    },
    'itemEditButton':{
        'font-family': 'Material Icons',
        'font-size': '30px',
        'text-align': 'center',
        'color': 'white',
        'width':'40px',
        'height':'40px',
        'border-radius': '30%',
        'background-color': 'greenyellow',
        'opacity': '1',
        'animation': 'fade 2s linear',
        '&:hover':{
            'background-color': 'seagreen'
        }
    },
    'itemDeleteButton':{
        'font-family': 'Material Icons',
        'font-size': '30px',
        'text-align': 'center',
        'color': 'white',
        'width':'40px',
        'height':'40px',
        'border-radius': '30%',
        'background-color': 'tomato',
        '&:hover':{
            'background-color': 'crimson'
        }
    },
    'itemCheckbox':{
        'align-self': 'center',
        '&:hover':{
            'transform': 'scale(1.3)',
        }
    },
    'todoItemTitle':{
        'font-size': '20px',
        'font-weight': 'bold',
    },
    'todoItemContent':{
        'font-weight': 'thin',
        'padding-left': '15px',
        'color': 'grey',
    },
    'strike':{
        'text-decoration': 'line-through'
    },
    'invisible':{
        'visibility':'hidden'
    }
}

export const {classes} = jss.createStyleSheet(style).attach()