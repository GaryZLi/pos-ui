import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
        height: 500,
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

const Value = ({
    focusedSection,
    language,
    orderInfo,
}) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();

    console.log(orderInfo)
    useEffect(() => {
        console.log('changed')
    }, [orderInfo]);

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}>
                <div className={classes.item}>Quantity</div>
                <input
                    className={classes.item}
                    type={'number'}
                    value={quantity}
                    onChange={() => console.log('ok')}
                />
                <div className={classes.item}>Price</div>
                <input
                    className={classes.item}
                    type={'number'}
                    value={quantity}
                    onChange={() => console.log('ok')}
                />
            </div>
        </div>
    );
};

const states = ({
    focusedSection,
    language,
    orderList,
}) => {
    

    return {
        focusedSection,
        language,
        orderInfo: orderList.items[focusedSection.English],
    }
};

const dispatches = {
};

export default connect(states, dispatches)(Value);