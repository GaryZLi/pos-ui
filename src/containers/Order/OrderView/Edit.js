import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { updateItems } from '../../../redux/actions';
import deleteIcon from '../../../picSrc/backSpace.svg';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        paddingTop: 30,
        marginTop: 50,
        height: 420,
        width: 300,
        border: '1px solid gray',
        borderRadius: 10,
        boxShadow: '3px 3px 3px 3px gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        marginTop: 10,
    },
    padContainer: {
        display: 'flex',
        padding: '10px 10px 0px 10px',
    },
    pad: {
        margin: 3,
        minHeight: 50,
        minWidth: 50,
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
    },
    numPadContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 174,
        height: 174,
    },
});

const Value = ({
    language,
    selectedItem,
    invalidSelection,
    quantity,
    price,
    updateItems,
}) => {
    const classes = useStyles();
    const [operation, setOperation] = useState('+');
    const [focus, setFocus] = useState('quantity');
    const labels = {
        quantity: {
            English: 'Quantity',
            '中文': 'Quantity 中文',
        },
        price: {
            English: 'Price',
            '中文': 'Price 中文',
        }
    };

    if (invalidSelection) return <div />;

    const getOperationVal = num => {
        if (focus === 'quantity') {
            if (operation === '+') {
                return num + quantity;
            }
            else if (operation === 'x') {
                return num * quantity;
            }
            else if (operation === '-') {
                return Math.max(quantity - num, 0);
            }
        }
        else {
            if (operation === '+') {
                return num + price;
            }
            else if (operation === 'x') {
                return num * price;
            }
            else if (operation === '-') {
                return Math.max(price - num, 0);
            }
        }
    };

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}>
                <TextField
                    className={classes.item}
                    type={'number'}
                    label={labels.quantity[language]}
                    placeholder={labels.quantity[language]}
                    variant='outlined'
                    onChange={e => updateItems('quantity', selectedItem, e.target.value)}
                    onMouseDown={() => setFocus('quantity')}
                    focused={focus === 'quantity'}
                    value={quantity.toLocaleString('en-US', {maximumFractionDigits: 2})}
                />
                <TextField
                    className={classes.item}
                    label={labels.price[language]}
                    placeholder={labels.price[language]}
                    type={'number'}
                    variant='outlined'
                    onChange={e => updateItems('price', selectedItem, e.target.value)}
                    onMouseDown={() => setFocus('price')}
                    focused={focus === 'price'}
                    value={price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                />
                <div className={classes.padContainer}>
                    <div>
                        {/* ADD */}
                        <div
                            className={classes.pad}
                            style={{
                                borderColor: operation === '+'? 'blue' : 'gray'
                            }}
                            onMouseDown={() => setOperation('+')}
                        >
                            <div style={{
                                height: 2,
                                width: 20,
                                backgroundColor: 'black',
                                position: 'absolute'
                            }} />
                            <div style={{
                                height: 20,
                                width: 2,
                                backgroundColor: 'black',
                                position: 'absolute'
                            }} />
                        </div>
                        {/* MULTIPLY */}
                        <div
                            className={classes.pad}
                            style={{
                                position: 'relative',
                                borderColor: operation === 'x'? 'blue' : 'gray',
                                marginTop: 6
                            }}
                            onMouseDown={() => setOperation('x')}
                        >
                            <div style={{
                                height: 2,
                                width: 20,
                                position: 'absolute',
                                transform: 'rotate(-45deg)',
                                backgroundColor: 'black',
                                borderRadius: 30,
                            }} />
                            <div style={{
                                height: 20,
                                width: 2,
                                position: 'absolute',
                                transform: 'rotate(-45deg)',
                                backgroundColor: 'black',
                                borderRadius: 30,
                            }} />
                        </div>
                        {/* SUBTRACT */}
                        <div
                            className={classes.pad}
                            style={{
                                borderColor: operation === '-'? 'blue' : 'gray',
                                marginTop: 6
                            }}
                            onMouseDown={() => setOperation('-')}
                        >
                            <div 
                                style={{
                                    height: 2,
                                    width: 20,
                                    backgroundColor: 'black',
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.numPadContainer}>
                        {Array(9).fill(0).map((a, num) => (
                            <div
                                className={classes.pad}
                                key={num}
                                onMouseDown={() => updateItems(focus, selectedItem, getOperationVal(num + 1))}
                            >
                                {num + 1}
                            </div>
                        ))}
                        <div
                            className={classes.pad}
                            style={{
                                width: 165,
                                // marginLeft: 'auto',
                                // marginRight: 3   7,
                            }}
                            onMouseDown={() => updateItems(focus, selectedItem, getOperationVal(0.5))}
                        >
                            0.5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const states = ({
    focusedItems,
    language,
    orderList,
}) => {
    let selectedItems = [];

    for (const item in focusedItems) {
        if (item !== 'all' && focusedItems[item]) {
            selectedItems.push(item);
        }
    }

    if (selectedItems.length > 1 || !selectedItems.length) {
        return {
            invalidSelection: true,
        };
    }

    return {
        language,
        selectedItem: selectedItems[0],
        quantity: orderList.items[selectedItems[0]].quantity,
        price: orderList.items[selectedItems[0]].price,
    }
};

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(Value);