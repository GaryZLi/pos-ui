import { makeStyles } from '@material-ui/styles';
import {
    Paper
} from '@material-ui/core';
import Row from './Row';

const useStyles = makeStyles({
    root: {
        width: '80%',
        marginBottom: 50,
        borderRadius: 5,
        overflow: 'auto',
        minHeight: 50,
        maxHeight: '60%',
        backgroundColor: 'white',
    }
})

const Table = ({
    columnWidths,
    orders,
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}
            elevation={11}
        >
            {orders.map((order, id) => (
                <Row
                    key={id}
                    order={order}
                    columnWidths={columnWidths}
                    color={id % 2 === 0? 'white' : '#ededed'}
                />
            ))}
        </Paper>
    );
};


export default Table;