import { makeStyles } from "@material-ui/styles";
import kitchenIcon from '../../../picSrc/kitchen.svg';
import checkIcon from '../../../picSrc/check.svg';
import clockIcon from '../../../picSrc/clock.svg';
import paidIcon from '../../../picSrc/paid.svg';
import togoIcon from '../../../picSrc/togo.svg';
import deliveryIcon from '../../../picSrc/delivery.svg';
import { connect } from "react-redux";
import { 
    updateFocusedItems,
} from '../../../redux/actions';

const useStyles = makeStyles({
    itemListContainer: {
        overflow: 'auto',
    },
    itemContainer: {
        paddingTop: 10,
        borderBottom: '1px solid black',
        padding: 5,
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
    modNames,
    modifications,
    focusedItems,
    updateFocusedItems,
}) => { 
    const classes = useStyles();
    const orders = Object
        .keys(orderList.items)
        .filter(order => !orderList.items[order].deleted);
    const optionNames = {
        English: {},
        '中文': {},
    };

    const formatDate = date => {
        let m;
        let hour;
        let min = date.getMinutes();

        if (date.getHours() >= 12) {
            m = ' pm';

            if (date.getHours() > 12) {
                hour = date.getHours() - 12;
            }
            else {
                hour = date.getHours()
            }
        }
        else {
            m = ' am';

            if (date.getHours() === 0) {
                hour = 12;
            }
            else {
                hour = date.getHours();
            }
        }


        return hour + ':' + min + m;
    };

    for (const mod of modifications) {
        optionNames[mod.itemName] = {
            English: mod.itemName,
            '中文': mod.itemNameChinese,
        };
    }

    return (
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
                                    src={paidIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].togo && (
                                <img
                                    className={classes.icon}
                                    src={togoIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].delivery && (
                                <img
                                    className={classes.icon}
                                    src={deliveryIcon}
                                    alt='icon'
                                />
                            )}
                            {orderList.items[order].future && (
                                <div style={{display: 'flex'}}>
                                    {formatDate(new Date(orderList.items[order].future))}
                                    <img
                                        className={classes.icon}
                                        src={clockIcon}
                                        alt='icon'
                                    />
                                </div>
                            )}
                            {orderList.items[order].biang && (
                                <img
                                    className={classes.icon}
                                    src={checkIcon}
                                    alt='icon'
                                />
                            )}
                        </div>
                        <div 
                            className={classes.itemInfo}
                            style={{
                                borderTop: '1px dotted gray'
                            }}
                        >
                            x{orderList.items[order].quantity} {'->'} ${(orderList.items[order].price * orderList.items[order].quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                    </div>
                ))}
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
};

export default connect(states, dispatches)(OrderList);