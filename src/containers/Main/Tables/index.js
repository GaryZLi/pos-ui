import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Table from './Table';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'relative',
    },
});

// FIX-
// this should be in server, maybe settings.json
// const columnRows = [4, 2, 3];

const Tables = ({
    tables,
}) => {
    const classes = useStyles();

    // TODO: prob redesign the entire thing
    // when open a table, check if the table has a orderNum, 
        // if not, then clear the orderList to create a new one
        // for type -> row-col format
        // add an orderNum for this table
        // increment the orderNum

    return (
        <div className={classes.rootContainer}>
            {tables.map((rows, col) => {
                const arr = [];

                for (let row = 0; row < rows; row++) {
                    arr.push(
                        <Table
                            key={`${row}${col}`}
                            row={row + 1}
                            col={col + 1}
                            position={{
                                top: (row + 1) * (100 / (rows + 1)) - 5,
                                left: 20 * (col + 1),
                            }}
                        />
                    );
                }

                return arr;
            })}
        </div>
    );
};

const states = ({
    settings,
}) => ({
    tables: settings.tables,
});


export default connect(states)(Tables);