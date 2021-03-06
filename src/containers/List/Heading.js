import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: 50,
        width: '80%',
        display: 'flex',
        marginTop: 50,
    },
    container: {
        display: 'flex',
    },
    heading: {
        height: '100%',
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    }
});

const headings = [
    {
        English: '#',
        中文: '#',
    },
    {
        English: 'Phone',
        中文: 'Phone 中文',
    },
    {
        English: 'Paid',
        中文: 'Paid 中文',
    },
    {
        English: 'Type',
        中文: 'Type 中文',
    },
    {
        English: 'Price',
        中文: 'Price 中文',
    },
    {
        English: 'Time',
        中文: 'Time 中文',
    },
]

const Heading = ({
    columnWidths,
    language
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            {headings.map((heading, id) => (
                <div
                    key={id}
                    style={columnWidths[id]}
                >
                    <div className={classes.heading}>
                        {heading.English}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Heading;