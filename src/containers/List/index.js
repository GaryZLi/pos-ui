import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
    Paper
} from '@material-ui/core';
import { useState } from 'react';
import exitIcon from '../../picSrc/exitList.svg';
import { updateScreenType } from '../../redux/actions';
import Row from './Row';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    filterContainer: {
        width: '80%',
        backgroundColor: 'white',
        display: 'flex',
    },
    filterItem: {
        height: 50,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exitContainer: {
        height: 100,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 60,
        paddingTop: 30,
        alignItems: 'center',
    },
    exitIcon: {
        height: 60,
        width: 60,

        '&:active': {
            height: 70,
            width: 70,
        }
    },
    table: {
        width: '80%'
    }
});


const List = ({
    language,
    orders,
    updateScreenType,
}) => {
    const classes = useStyles();
    const [condition, setCondition] = useState('All');
    const filters = [
        {
            English: 'All',
            中文: 'All 中文',
        },
        {
            English: 'Delivery',
            中文: 'Delivery 中文',
        },
        {
            English: 'Togo',
            中文: 'Togo 中文',
        },
        {
            English: 'Dine in',
            中文: 'Dine in 中文',
        },
        {
            English: 'Paid',
            中文: 'Paid 中文',
        },
        {
            English: 'Unpaid',
            中文: 'Unpaid 中文',
        },
        {
            English: 'Deleted',
            中文: 'Deleted 中文',
        },
    ];
    const filterConditions = {
        Delivery: order => order.delivery,
        Togo: order => order.togo,
        'Dine in': order => order.dineIn,
        'Paid': order => order.paid,
        'Unpaid': order => !order.paid,
        'Deleted': order => order.deleted,
    }

    if (condition !== 'All') {
        orders = orders.filter(order => filterConditions[condition](order))
    }

    console.log(orders)

    return (
        <div className={classes.rootContainer}>
            <div className={classes.exitContainer}>
                <img
                    className={classes.exitIcon}
                    src={exitIcon}
                    alt='exit icon'
                    onClick={() => updateScreenType('main')}
                />
            </div>
            <Paper
                className={classes.filterContainer}
                elevation={5}
            >
                {filters.map(filter => (
                    <div 
                        key={filter.English}
                        className={classes.filterItem}
                        style={
                            filter.English === condition
                            ? ({
                                backgroundColor: '#2160ff',
                                color: 'white',
                                fontSize: 30,
                                borderRadius: 5,
                            })
                            : ({})
                        }
                        onClick={() => setCondition(filter.English)}
                    >
                        {filter[language]}
                    </div>
                ))}
            </Paper>
            <Paper
                className={classes.table}
                style={{
                    marginTop: 50,
                    marginBottom: 50,
                }}
                elevation={11}
            >
                {orders.map((order, id) => (
                    <Row
                        key={id}
                        order={order}
                    />
                ))}
            </Paper>
        </div>
    );
};

const states = ({
    language,
    orders,
}) => ({
    language,
    orders,
});

const dispatches = {
    updateScreenType
};

export default connect(states, dispatches)(List);