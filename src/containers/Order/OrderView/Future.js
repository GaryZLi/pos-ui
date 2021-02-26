import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import { updateItems } from '../../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        marginTop: 50,
        height: 180,
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
    }
});

const Future = ({
    language,
    updateItems,
}) => {
    const classes = useStyles();
    const [printerTime, setPrinterTime] = useState(); // TODO: future printer date

    // work on the printer time

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}>
                <div className={classes.item}>Future Time</div>
                <input
                    className={classes.item}
                    type={'datetime-local'}
                    onChange={e => updateItems('future', e.target.value)}
                />
                <div className={classes.item}>Send to Printer Time</div>
                <input
                    className={classes.item}
                    type={'datetime-local'}
                    value={printerTime}
                    onChange={() => console.log('ok')}
                />
            </div>
        </div>
    );
};

const states = ({
    language,
}) => ({
    language,
});

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(Future);