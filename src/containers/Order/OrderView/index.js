import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Menu from './Menu';
import Modification from './Modification';
import Edit from './Edit';
import Future from './Future';
import Pay from './Pay';

const useStyles = makeStyles({
    rootContainer: {
        overflow: 'auto',
        flex: 1,        
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
});

const focuses = {
    'Healthy Veggies': 'menu',
    'Poultry & Meat Dishes': 'menu',
    'Every Kind Of Steaks': 'menu',
    'Drinks': 'menu',
    'Clay Pot/ Wor/ Sizzling': 'menu',
    'Steamed': 'menu',
    'Regional Chinese & Seafood': 'menu',
    'Appetizers': 'menu',
    'Rice In Clay Pot': 'menu',
    'Cantonese Style Tasted': 'menu',
    'Fried Rice/Noodle/Chow Fun': 'menu',
    'B.B.Q Specialty': 'menu',
    'Soup Specialty': 'menu',
    'Add': "mod",
    'Less': "mod",
    'Change': "mod",
    'No': "mod",
    'Edit': 'edit',
    'Future': 'future',
    'Pay': 'pay',
    'Pay All': 'pay',
};

const OrderView = ({
    focusedSection,
}) => {
    const classes = useStyles();
    let currentView;

    switch(focuses[focusedSection.English]) {
        case 'menu':
            currentView = <Menu/>;
            break;

        case 'mod':
            currentView = <Modification/>;
            break;

        case 'future':
            currentView = <Future/>;
            break;

        case 'edit':
            currentView = <Edit/>;
            break;

        case 'pay':
            currentView = <Pay/>;
            break;

        default:
            currentView = '';
    }

    return (
        <div className={classes.rootContainer}>
            {currentView}
        </div>
    );
};

const states = ({
    focusedSection,
}) => ({
    focusedSection,
});

export default connect(states)(OrderView);