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
import {
} from '../../../redux/actions';

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
        minHeight: 50,
        width: '100%',
        padding: 0,
    },
    nestedChild: {
        minHeight: 50,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const AddressSection = ({
    ws,
    language,
    addresses,
    addressOptions,
}) => {
    const classes = useStyles();
    const [customerAddresses, setCustomerAddresses] = useState([{
        street: '',
        city: '',
    }]);
    const [currentFocus, setCurrentFocus] = useState();

    const handleAddressInput = (val, id, key) => {
        setCustomerAddresses(prev => {
            prev[id][key] = val;

            return [
                ...prev,
            ];
        });

        if (val.length) ws.send('getAddressInput|' + val);
    };

    const checkDistance = id => {
        if (addresses[id].city && addresses[id].address) return;

        console.log('st: ', addresses[id].street, 'city:', addresses[id].city);
    };

    const getPlaceholderName = section => {
        const placeholder = {
            street: {
                '中文': 'street 中文',
                English: 'Street',
            },
            city: {
                '中文': 'city 中文',
                English: 'City',
            }
        }

        return placeholder[section][language];
    };

    useEffect(() => {
        if (!addresses.length) return;
        
        setCustomerAddresses(() => [
            ...addresses,
        ]);

        //eslint-disable-next-line
    }, [addresses]);

    return (
        <div className={classes.rootContainer}>
            {customerAddresses.map((address, id) => (
                <div
                    className={classes.textListContainer}
                    key={id}
                >
                    <TextField
                        autoComplete='chrome-off'
                        placeholder={getPlaceholderName('street')}
                        className={classes.textField}
                        value={address.street}
                        onChange={e => handleAddressInput(e.target.value, id, 'street')}
                        onFocus={() => setCurrentFocus(id)}
                        onBlur={() => setTimeout(() => setCurrentFocus(null), 100)}
                    />
                    <Collapse
                        in={currentFocus === id /*&& phoneNums.length !== 0*/}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Paper
                            component="div" 
                            className={classes.list}
                        >
                            {addressOptions.map(option => (
                                <ListItem
                                    className={classes.nested}
                                    key={option.street}
                                    button
                                >
                                    <ListItemText
                                        className={classes.nestedChild}
                                        primary={option.street}
                                        onClick={() => {
                                            handleAddressInput(option.street, id, 'street');
                                            handleAddressInput(option.city, id, 'city');
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </Paper>
                    </Collapse>
                    <TextField
                        autoComplete='chrome-off'
                        placeholder={getPlaceholderName('city')}
                        className={classes.textField}
                        value={address.city}
                        onChange={e => handleAddressInput(e.target.value, id, 'city')}
                        onFocus={() => setCurrentFocus(id)}
                        onBlur={() => setTimeout(() => setCurrentFocus(null), 100)}
                    />
                    <Collapse
                        in={currentFocus === id /*&& phoneNums.length !== 0*/}
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
                    {address.distance && (
                        <div>
                            {address.distance}
                        </div>
                    )}
                    {!address.distance && (
                        <div onClick={() => checkDistance(id)}>
                            CHECK DISTANCE {}
                        </div>
                    )}
                </div>
            ))}
            <div
                className={classes.add}
                onClick={() => setCustomerAddresses(prev => ([
                    ...prev,
                    {
                        street: '',
                        city: '',
                    },
                ]))}
            >
                +
            </div>
        </div>
    );
};

const states = ({
    ws,
    language,
    addresses,
    addressOptions,
}) => ({
    ws,
    language,
    addresses,
    addressOptions,
});

const dispatches = {
};

export default connect(states, dispatches)(AddressSection);