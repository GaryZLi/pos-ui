import { makeStyles } from '@material-ui/styles';
import Table from './Table';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'relative',
    },
});

const columns = [4, 3, 3];

const Tables = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            {columns.map((rows, col) => {
                const t = [];

                for (let row = 0; row < rows; row++) {

                    console.log(col)
                    t.push(
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

                return t;
            })}
        </div>
    );
};

export default Tables;