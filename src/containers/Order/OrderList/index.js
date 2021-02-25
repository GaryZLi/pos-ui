import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { 
    updateItems,
    updateFocusedItems,
 } from '../../../redux/actions';

import kitchenIcon from '../../../picSrc/kitchen.svg';
import moneyIcon from '../../../picSrc/money.png';
import checkIcon from '../../../picSrc/check.svg';

const useStyles = makeStyles({
    rootContainer: {
        width: 300,
        height: '100%',
        borderLeft: '1px solid gray',
        borderRight: '1px solid gray',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemListContainer: {
        overflow: 'auto',
    },
    itemContainer: {
        paddingTop: 10,
        borderBottom: '1px solid black',
        padding: 5,
    },
    calculationSection: {
        borderTop: '5px inset gray',
        width: '100%',
        boxShadow: '8px 8px  #ffffff',
    },
    calculationItem: {
        height: 30,
        padding: 3,
        borderBottom: '1px solid gray',
    },
    itemInfo: {
        paddingTop: 10,
    },
    iconContainer: {
        width: '100%',
        display: 'flex',
    },
    icon: {
        height: 30,
        width: 30,
    }
});

const OrderList = ({
    orderList,
    language,
    focusedItems,
    modNames,
    modifications,
    updateFocusedItems,
    updateItems,
}) => {
    const classes = useStyles();
    let subTotal = 0;
    const orders = Object
        .keys(orderList.items)
        .filter(order => !orderList.items[order].deleted);
    const optionNames = {
        English: {},
        '中文': {},
    };

    for (const item of orders) {
        subTotal += orderList.items[item].cost * orderList.items[item].quantity;
    }

    for (const mod of modifications) {
        optionNames[mod.itemName] = {
            English: mod.itemName,
            '中文': mod.itemNameChinese,
        };
    }

    const tax = subTotal * 0.098;

    return (
        <div className={classes.rootContainer}>
            <div className={classes.itemListContainer}>
                {orders.map(order => (
                    <div
                        className={classes.itemContainer}
                        key={order}
                        style={{
                            backgroundColor: focusedItems[order] ? 'skyblue' : 'white'
                        }}
                        onClick={() => updateFocusedItems(order)}
                    >
                        <div>
                            {orderList.items[order].name[language]}
                        </div>
                        <div className={classes.itemInfo}>
                            {Object.keys(orderList.items[order].options).map(option => (
                                <div
                                    className={classes.itemInfo}
                                    key={option}
                                >
                                    {modNames[option][language]}
                                    {Object.keys(orderList.items[order].options[option]).map(optionName => (
                                        <div key={optionName}>
                                            - {optionNames[optionName][language]}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={classes.itemInfo}>
                            x{orderList.items[order].quantity} {'->'} ${(orderList.items[order].cost * orderList.items[order].quantity).toFixed(2).toLocaleString()}
                        </div>
                        {/* ICONS */}
                        <div className={classes.iconContainer}>
                            {orderList.items[order].kitchened && (
                                <img
                                    className={classes.icon}
                                    src={kitchenIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].paid && (
                                <img
                                    className={classes.icon}
                                    src={moneyIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].togo && (
                                <img
                                    className={classes.icon}
                                    src={checkIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].biang && (
                                <img
                                    className={classes.icon}
                                    src={checkIcon}
                                    alt='icon'
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={classes.calculationSection}
                onClick={() => updateItems('biangAll')}
            >
                <div className={classes.calculationItem}>
                    Subtotal: ${subTotal.toFixed(2).toLocaleString()}
                </div>
                <div className={classes.calculationItem}>
                    Tax: ${tax.toFixed(2).toLocaleString()}
                </div>
                <div className={classes.calculationItem}>
                    Total: ${(subTotal + tax).toFixed(2).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

const states = ({
    orderList,
    language,
    focusedItems,
    modNames,
    modifications,
}) => ({
    orderList,
    language,
    focusedItems,
    modNames,
    modifications,
});

const dispatches = {
    updateFocusedItems,
    updateItems,
};

export default connect(states, dispatches)(OrderList);