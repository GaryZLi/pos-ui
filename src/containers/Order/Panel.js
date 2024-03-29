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
    updateFocusedSection,
    updateItems,
    updateLanguage,
    updateOrderListInfo,
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
    orderNum,
    updateLanguage,
    updateScreenType,
    updateItems,
    updateOrderListInfo,
    updateFocusedSection,
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
            action: () => {
                updateItems('kitchenAll');
                updateOrderListInfo('new');
            },
        },
        {
            iconSrc: payIcon,
            name: {
                '中文': 'Pay 中文',
                English: 'Pay',
            },
            action: () => updateFocusedSection({
                English: 'Pay',
                '中文': 'Pay 中文',
            }),
        },
        // DELETE?
        // {
        //     iconSrc: payAllIcon,
        //     name: {
        //         '中文': 'Pay All 中文',
        //         English: 'Pay All',
        //     },
        //     action: () => updateFocusedSection({
        //         English: 'Pay All',
        //         '中文': 'Pay All 中文',
        //     }),
        // },
        {
            iconSrc: deliveryIcon,
            name: {
                '中文': 'Delivery 中文',
                English: 'Delivery',
            },
            action: () => updateItems('delivery'),
        },
        {
            iconSrc: deliveryAllIcon,
            name: {
                '中文': 'Delivery All 中文',
                English: 'Delivery All',
            },
            action: () => {
                updateItems('deliveryAll');
                updateOrderListInfo('new');
            },
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'delete 中文',
                English: 'delete',
            },
            action: () => updateItems('delete'),
        },
        {
            iconSrc: deleteAllIcon,
            name: {
                '中文': 'Delete All 中文',
                English: 'Delete All',
            },
            action: () => updateOrderListInfo('delete', orderNum),
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
            action: () => {
                updateScreenType('main');

                if (orderNum) {
                    updateOrderListInfo('update', orderNum);
                    updateOrderListInfo('new'); // TODO: make sure this works
                }
            },
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
    orderList,
}) => ({
    language,
    orderNum: orderList.orderNum
});

const dispatches = {
    updateLanguage,
    updateScreenType,
    updateItems,
    updateOrderListInfo,
    updateFocusedSection
};

export default connect(states, dispatches)(Panel);