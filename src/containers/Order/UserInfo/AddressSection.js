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
    }
});

const sections = {
    Phone: {
        '中文': 'Phone 中文',
        English: 'Phone',
    },
    Address: {
        '中文': 'Address 中文',
        English: 'Address',
    }
};

const AddressSection = ({
    ws,
    language,
}) => {
    const classes = useStyles();
    const [addresses, setAddress] = useState([{
        street: '',
        city: '',
    }]);
    const [currentFocus, setCurrentFocus] = useState();

    const handleAddressInput = (val, id) => {
        // val = val.replace(/[^0-9]/g, '');

        // if (val.length > 10) return;
        // if (phones[id].length === val.length) val = val.substring(0, val.length - 1);

        // setPhones(prev => {
        //     prev[id] = val;

        //     return [
        //         ...prev,
        //     ];
        // });

        // if (val.length) ws.send('phoneInput|' + val);
    };


    //eslint-disable-next-line

    return (
        <div className={classes.rootContainer}>
            <div className={classes.heading}>
                {sections.Phone[language]}
            </div>
            {addresses.map((address, id) => (
                <div
                    className={classes.textListContainer}
                    key={id}
                >
                    <TextField
                        autoComplete='chrome-off'
                        placeholder='Street'
                        className={classes.textField}
                        value={address.street}
                        onChange={e => handleAddressInput(e.target.value, id)}
                        onFocus={() => setCurrentFocus(id)}
                        onBlur={() => setTimeout(() => setCurrentFocus(null), 100)}
                    />
                    <Collapse
                        className={classes.list}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Paper component="div" >
                            {/* (
                                <ListItem
                                className={classes.nested}
                                key={option.phonenum}
                                button
                            >
                                <ListItemText
                                    primary={formatPhoneNum(option.phonenum)}
                                    onClick={() => handleAddressInput(option.phonenum, id)}
                                />
                            </ListItem>
                            )
                            )} */}
                        </Paper>
                    </Collapse>
                </div>
            ))}
            {/* <div
                className={classes.add}
                onClick={() => setPhones(prev => ([
                    ...prev,
                    '',
                ]))}
            >
                +
            </div> */}
        </div>
    );
};

const states = ({
    ws,
}) => ({
    ws,
});

const dispatches = {
};

export default connect(states, dispatches)(AddressSection);