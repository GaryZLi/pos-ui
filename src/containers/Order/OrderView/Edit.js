import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { updateItems } from '../../../redux/actions';
import { useState } from 'react';

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
    },
});

const Value = ({
    focusedItems,
    language,
    selectedItem,
    invalidSelection,
    updateItems,
}) => {
    const classes = useStyles();
    const [operation, setOperation] = useState();
    const [focus, setFocus] = useState('quantity');

    if (invalidSelection) return <div />;

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}>
                <TextField
                    className={classes.item}
                    type={'number'}
                    label='Quantity'
                    variant='outlined'
                    onChange={e => updateItems('quantity', selectedItem, e.target.value)}
                    onMouseDown={() => setFocus('quantity')}
                    // focused={focus === 'quantity'}
                />
                <TextField
                    className={classes.item}
                    label="Price"
                    type={'number'}
                    variant='outlined'
                    onChange={e => updateItems('price', selectedItem, e.target.value)}
                    onMouseDown={() => setFocus('price')}
                    // focused={focus === 'price'}
                />
                <div className={classes.padContainer}>
                    <div>
                        {/* ADD */}
                        <div
                            className={classes.pad}
                            style={{
                                borderColor: operation === '+'? 'blue' : 'gray'
                            }}
                            onMouseDown={() => operation === '+'? setOperation() : setOperation('+')}
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
                                marginTop: 7,
                                borderColor: operation === 'x'? 'blue' : 'gray'
                            }}
                            onMouseDown={() => operation === 'x'? setOperation() : setOperation('x')}
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
                                marginTop: 7,
                                borderColor: operation === '-'? 'blue' : 'gray'
                            }}
                            onMouseDown={() => operation === '-'? setOperation() : setOperation('-')}
                        >
                            <div 
                                style={{
                                    height: 2,
                                    width: 20,
                                    marginTop: 7,
                                    backgroundColor: 'black',
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.numPadContainer}>
                        {Array(9).fill(0).map((e, i) => (
                            <div
                                className={classes.pad}
                                key={i}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* dot */}
                    <div
                        className={classes.pad}
                        style={{
                            height: 50,
                            width: 50,
                            border: '1px solid gray',
                            marginLeft: 3,
                        }}
                    >
                        <div
                            style={{
                                height: 3,
                                width: 3,
                                borderRadius: '50%',
                                backgroundColor: 'black',
                            }}
                        />
                    </div>
                    {/* ZERO */}
                    <div
                        className={classes.pad}
                        style={{
                            height: 50,
                            width: 165,
                            border: '1px solid gray',
                        }}
                    >
                        0
                    </div>
                </div>
            </div>
        </div>
    );
};

const states = ({
    focusedItems,
    language,
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
        focusedItems,
        language,
        selectedItem: selectedItems[0],
    }
};

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(Value);