import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    TextField,
    Collapse,
    Paper,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import { updatePhoneNums } from '../../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        marginTop: 10,
        height: 20,
        width: '80%',
    },
    add: {
        fontSize: 40,
        height: 40,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            fontSize: 30,
        },
    },
    textListContainer: {
        position: 'relative',
        width: '90%',
    },
    textField: {
        width: '100%',
        marginTop: 20,
    },
    list: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
    },
    nested: {
        backgroundColor: 'red'
    }
});

const PhoneSection = ({
    ws,
    language,
    phoneNums,
    updatePhoneNums,
}) => {
    const classes = useStyles();
    const [phones, setPhones] = useState(['']);
    const [currentFocus, setCurrentFocus] = useState();

    const handlePhoneInput = (val, id) => {
        val = val.replace(/[^0-9]/g, '');

        if (val.length > 10) return;
        if (phones[id].length === val.length) val = val.substring(0, val.length - 1);

        setPhones(prev => {
            prev[id] = val;

            return [
                ...prev,
            ];
        });

        if (val.length) ws.send('phoneInput|' + val);
    };

    const formatPhoneNum = num => {
        if (!num.length) {
            return '';
        }
        else if (num.length < 3) {
            return `(${num.substring(0, 3)}`;
        }
        else if (num.length >= 3 && num.length < 6) {
            return `(${num.substring(0, 3)}) ${num.substring(3, 6)}`;
        }
        else {
            return `(${num.substring(0, 3)}) ${num.substring(3, 6)}-${num.substring(6)}`;
        }
    };

    //eslint-disable-next-line
    useEffect(() => updatePhoneNums([]), []);

    return (
        <div className={classes.rootContainer}>
            {phones.map((phone, id) => (
                <div
                    className={classes.textListContainer}
                    key={id}
                >
                    <TextField
                        autoComplete='chrome-off'
                        placeholder='Phone Number'
                        className={classes.textField}
                        value={formatPhoneNum(phone)}
                        onChange={e => handlePhoneInput(e.target.value, id)}
                        onFocus={() => setCurrentFocus(id)}
                        onBlur={() => setTimeout(() => setCurrentFocus(null), 200)}
                    />
                    <Collapse
                        className={classes.list}
                        in={currentFocus === id && phoneNums.length !== 0}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Paper component="div" >
                            {phoneNums.map(option => (
                                <ListItem
                                    className={classes.nested}
                                    key={option.phonenum}
                                    button
                                >
                                    <ListItemText
                                        primary={formatPhoneNum(option.phonenum)}
                                        onClick={() => handlePhoneInput(option.phonenum, id)}
                                    />
                                </ListItem>
                            ))}
                        </Paper>
                    </Collapse>
                </div>
            ))}
            <div
                className={classes.add}
                onClick={() => setPhones(prev => ([
                    ...prev,
                    '',
                ]))}
            >
                +
            </div>
        </div>
    );
};

const states = ({
    phoneNums,
    ws,
}) => ({
    phoneNums,
    ws,
});

const dispatches = {
    updatePhoneNums,
};

export default connect(states, dispatches)(PhoneSection);