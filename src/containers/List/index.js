import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
    Paper
} from '@material-ui/core';
import { useState } from 'react';
import exitIcon from '../../picSrc/exitList.svg';
import { updateScreenType } from '../../redux/actions';
import Heading from './Heading';
import Table from './Table';

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
        alignItems: 'center',
    },
    exitIcon: {
        paddingRight: 30,
        paddingTop: 30,
        height: 60,
        width: 60,
        '&:active': {
            height: 70,
            width: 70,
        }
    },
    table: {
        width: '80%',
        backgroundColor: 'transparent'
    }
});

const columnWidths = [{width: 150}, {flex: 1}, {width: 150}, {width: 150}, {width: 150}, {width: 150},];

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

    orders = orders.filter(order => !order.biang);

    return (
        <div className={classes.rootContainer}>
            <div className={classes.exitContainer}>
                <img
                    className={classes.exitIcon}
                    src={exitIcon}
                    alt='exit icon'
                    draggable={false}
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
            <Heading columnWidths={columnWidths}/>
            <Table
                columnWidths={columnWidths}
                orders={orders}
            />
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