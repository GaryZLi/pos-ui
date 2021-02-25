import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { updateItemModification } from '../../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        overflow: 'auto',
        flex: 1,        
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    sectionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    itemContainer: {
        height: 120,
        width: 150,
        backgroundColor: 'aliceblue',
        margin: 1,
        border: '1px solid black',
        fontSize: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',

        '&:active': {
            height: 110,
            width: 140,
            fontSize: 14,
            margin: 6,
        }
    }
});

const Modification = ({
    modifications,
    language,
    updateItemModification,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <div className={classes.sectionContainer}>
                {modifications.map(mod => (
                    <div
                        className={classes.itemContainer}
                        key={mod[`itemName${(language === 'English') ? '' : 'Chinese'}`]}
                        onMouseDown={() => updateItemModification(mod.itemName)}
                    >
                        <div>
                            {language === 'English'? mod.itemName : mod.itemNameChinese}
                        </div>
                        <div>
                            ${mod.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const states = ({
    modifications,
    language,
}) => ({
    modifications,
    language,
});

const dispatches = {
    updateItemModification,
};

export default connect(states, dispatches)(Modification);