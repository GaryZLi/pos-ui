import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import backIcon from '../../../picSrc/back.svg';
import { updateFocusedSection, updateOrderListInfo } from '../../../redux/actions';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    payContainer: {
        height: 400,
        width: 400,
        marginLeft: 100,
        border: '1px solid black',
        borderRadius: 10,
        boxShadow: '3px 3px 3px 3px gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backButton: {
        height: 50,
        width: 50,
        marginLeft: 'auto',
        margin: 20,

        '&:active': {
            boxShadow: '2px 2px 10px 2px gray inset',
        }
    },
    items: {
        width: 200,
        marginTop: 10,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        borderRadius: 7,
        boxSizing: 'border-box',
        textDecoration: 'none',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: 400,
        color: '#FFFFFF',
        backgroundColor: '#5e7eff',
        height: 50,
        boxShadow: 'inset 0 -0.6em 0 -0.35em #3f65fc',
        textAlign: 'center',
        position: 'relative',
        marginTop: 10,

        '&:active': {
            top: '0.1em',
        }
    },
    numPad: {
        marginLeft: 50,
        maxHeight: 328,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    num: {
        margin: 10,
        minHeight: 60,
        minWidth: 60,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        border: '1px solid gray',
        boxShadow: '1px 1px 2px 1px gray',

        '&:active': {
            boxShadow: 'none',
        }
    }
});

const labels = {
    cash: {
        English: 'Cash Amount',
        中文: 'Cash Amount 中文'
    },
    card: {
        English: 'Card Amount',
        中文: 'Card Amount 中文',
    },
    due: {
        English: 'Due',
        中文: 'Due 中文',
    },
    change: {
        English: 'Change',
        中文: 'Change 中文',
    }
};

const nums = [0.25, 0.5, 1, 5, 10, 20, 50, 100, 'C', '='];

const Pay = ({
    language,
    total,
    updateFocusedSection,
    updateOrderListInfo,
}) => {
    const classes = useStyles();
    const [cash, setCash] = useState(0);
    const [card, setCard] = useState(0);
    const [focus, setFocus] = useState('cash');
    const due = Math.max(Math.ceil((total - card - cash) * 100) / 100, 0);
    const change = Math.max(-Math.ceil((total - card - cash) * 100) / 100, 0);

    return (
        <div className={classes.rootContainer}>
            <div className={classes.payContainer}>
                <img
                    className={classes.backButton}
                    src={backIcon}
                    draggable={false}
                    alt='back icon'
                    onClick={() => updateFocusedSection({
                        English: 'Appetizers',
                        '中文': 'Appetizers 中文',
                    })}
                />
                <TextField
                    className={classes.items}
                    label={labels.cash[language]}
                    placeholder={labels.cash[language]}
                    type={'number'}
                    inputProps={{ min: 0 }}
                    variant='outlined'
                    onChange={e => setCash(e.target.value)}
                    focused={focus === 'cash'}
                    value={cash.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    onMouseDown={() => setFocus('cash')}
                />
                <TextField
                    className={classes.items}
                    label={labels.card[language]}
                    placeholder={labels.card[language]}
                    type={'number'}
                    inputProps={{ min: 0 }}
                    variant='outlined'
                    onChange={e => setCard(e.target.value)}
                    focused={focus === 'card'}
                    value={card.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    onMouseDown={() => setFocus('card')}
                />
                {due >= 0 && (
                    <div className={classes.items}>
                        {labels.due[language]}: ${due}
                    </div>
                )}
                {change > 0 && (
                    <div className={classes.items}>
                        {labels.change[language]}: ${change}
                    </div>
                )}
                {due <= 0 && (
                    <div
                        className={classes.button}
                        onClick={() => {
                            updateOrderListInfo('pay', cash, card);
                            setCash(0);
                            setCard(0);
                        }}    
                    >
                        CONFIRM
                    </div>
                )}
            </div>
            <div className={classes.numPad}>
                {nums.map(num => (
                    <div
                        key={num}
                        className={classes.num}
                        onMouseDown={() => {
                            if (num === '=') {
                                if (focus === 'cash') {
                                    setCash(total);
                                    setCard(0);
                                }
                                else {
                                    setCash(0);
                                    setCard(total);
                                }
                            }
                            else if (num === 'C') {
                                setCash(0);
                                setCard(0);
                            }
                            else {
                                if (focus === 'cash') {
                                    setCash(parseFloat(cash) + num);
                                }
                                else {
                                    setCard(parseFloat(card) + num);
                                }
                            }
                        }}
                    >
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
};

const states = ({
    language,
    orderList,
    taxRate,
    focusedItems,
}) => {
    let selected = 0;
    let total = 0;

    for (const item in focusedItems) {
        if (item !== 'all' && !orderList.items[item].paid) {
            if (focusedItems[item]) {
                selected += orderList.items[item].price * orderList.items[item].quantity;
            }
            
            total += orderList.items[item].price * orderList.items[item].quantity;
        }
    }

    if (selected) {
        total = selected;
    }

    return {
        total: total + (total * taxRate),
        language,
    };
};

const dispatches = {
    updateFocusedSection,
    updateOrderListInfo,
};

export default connect(states, dispatches)(Pay);