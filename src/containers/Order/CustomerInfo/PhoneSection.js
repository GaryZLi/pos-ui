import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import {
    TextField,
    Collapse,
    Paper,
    ListItem,
    ListItemText,
} from '@material-ui/core'

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
});

const placeholders = {
    'English': 'Phone Number',
    '中文': 'Phone Number 中文',
};

const PhoneSection = ({
    ws,
    language,
    phoneNums,
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

        if (val.length === 10) {
            const customerId = phoneNums.find(phone => phone.phoneNum === phones[id]).customerId;
            ws.send('getCustomerInfo|' + customerId);
            ws.send('getAddresses|' + customerId);
        }
        else if (val.length) {
            ws.send('getPhone|' + val);
        }
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

    return (
        <div className={classes.rootContainer}>
            {phones.map((phone, id) => (
                <div
                    className={classes.textListContainer}
                    key={id}
                >
                    <TextField
                        autoComplete='chrome-off'
                        placeholder={`${placeholders[language]}`}
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
                                    key={option.phoneNum}
                                    button
                                >
                                    <ListItemText
                                        primary={formatPhoneNum(option.phoneNum)}
                                        onClick={() => handlePhoneInput(option.phoneNum, id)}
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
    language,
    ws,
}) => ({
    phoneNums,
    language,
    ws,
});

const dispatches = {
};

export default connect(states, dispatches)(PhoneSection);