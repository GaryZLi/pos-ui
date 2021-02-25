import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import kitchenIcon from '../../picSrc/kitchen.svg';
import kitchenAllIcon from '../../picSrc/wok.svg';
import billIcon from '../../picSrc/bill.svg';
import billAllIcon from '../../picSrc/billAll.svg';
import deleteIcon from '../../picSrc/delete.svg';
import deleteAllIcon from '../../picSrc/deleteAll.svg';
import payIcon from '../../picSrc/pay.svg';
import payAllIcon from '../../picSrc/payAll.svg';
import deliveryIcon from '../../picSrc/delivery.svg';
import deliveryAllIcon from '../../picSrc/deliveryAll.svg';
import settingIcon from '../../picSrc/setting.svg';
import languageIcon from '../../picSrc/language.svg';
import exitIcon from '../../picSrc/exit.svg';
import {
    updateItems,
    updateLanguage,
    updateScreenType,
} from '../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        height: 100,
        width: '100%',
        display: 'flex',
        backgroundColor: '#6de38d',
    },
});


const Panel = ({
    language,
    updateLanguage,
    updateScreenType,
    updateItems,
}) => {

    const panelList = [
        {
            iconSrc: billIcon,
            name: {
                '中文': 'Bill 中文',
                English: 'Bill'
            },
            action: () => console.log('fire'),
        },
        {
            iconSrc: billAllIcon,
            name: {
                '中文': 'Bill All 中文',
                English: 'Bill All'
            },
            action: () => console.log('fire'),
        },
        {
            iconSrc: kitchenIcon,
            name: {
                '中文': 'Kitchen 中文',
                English: 'Kitchen',
            },
            action: () => updateItems('kitchen'),
        },
        {
            iconSrc: kitchenAllIcon,
            name: {
                '中文': 'Kitchen All 中文',
                English: 'Kitchen All',
            },
            action: () => updateItems('kitchenAll'),
        },
        {
            iconSrc: payIcon,
            name: {
                '中文': 'Pay 中文',
                English: 'Pay',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: payAllIcon,
            name: {
                '中文': 'Pay All 中文',
                English: 'Pay All',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deliveryIcon,
            name: {
                '中文': 'Delivery 中文',
                English: 'Delivery',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deliveryAllIcon,
            name: {
                '中文': 'Delivery All 中文',
                English: 'Delivery All',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'delete 中文',
                English: 'delete',
            },
            action: () => console.log('delete'),
        },
        {
            iconSrc: deleteAllIcon,
            name: {
                '中文': 'Delete All 中文',
                English: 'Delete All',
            },
            action: () => console.log('Delete All'),
        },
        {
            iconSrc: settingIcon,
            name: {
                '中文': 'Setting 中文',
                English: 'Setting',
            },
            action: () => console.log('Setting'),
        },
        {
            iconSrc: languageIcon,
            name: {
                '中文': 'English',
                English: '中文',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: exitIcon,
            name: {
                '中文': 'exit 中文',
                English: 'exit'
            },
            action: () => updateScreenType('main'),
        },
    ];

    const classes = useStyles();
    
    return (
        <div className={classes.rootContainer}>
            {panelList.map(action => (
                <ActionButton
                    key={action.name.English}
                    iconSrc={action.iconSrc}
                    name={action.name[language]}
                    action={action.action}
                />
            ))}
        </div>
    );
};

const states = ({
    language,
}) => ({
    language,
});

const dispatches = {
    updateLanguage,
    updateScreenType,
    updateItems,
};

export default connect(states, dispatches)(Panel);