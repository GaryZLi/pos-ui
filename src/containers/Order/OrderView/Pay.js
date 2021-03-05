import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import backIcon from '../../../picSrc/back.svg';
import { updateFocusedSection } from '../../../redux/actions';
import { TextField } from '@material-ui/core';

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
            // borderRadius: '50%',
        }
    },
    items: {
        width: 200,
        marginTop: 10,
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
};

const Pay = ({
    language,
    orderList,
    updateFocusedSection,
}) => {
    const classes = useStyles();

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
                    placeholder={labels.card[language]}
                    type={'number'}
                    inputProps={{ min: 0 }}
                    variant='outlined'
                    // onChange={e => updateItems('pay', 'cash', e.target.value)}
                // onMouseDown={() => setFocus('price')}
                // focused={focus === 'price'}
                // value={price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                />
                <TextField
                    className={classes.items}
                    label={labels.card[language]}
                    placeholder={labels.card[language]}
                    type={'number'}
                    inputProps={{ min: 0 }}
                    variant='outlined'
                // onChange={e => updateItems('price', selectedItem, e.target.value)}
                // onMouseDown={() => setFocus('price')}
                // focused={focus === 'price'}
                // value={price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                />
                <div className={classes.items}>
                    {labels.due[language]}: ${30}
                </div>
            </div>
        </div>
    );
};

const states = ({
    language,
    orderList,
}) => ({
    language,
    orderList,
});

const dispatches = {
    updateFocusedSection,
};

export default connect(states, dispatches)(Pay);