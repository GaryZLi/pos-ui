import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateItems } from '../../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        overflow: 'auto',
        // backgroundColor: 'yellow',
        flex: 1,        
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    sectionContainer: {
        // flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        // alignContent: 'flex-start',
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

const Menu = ({
    menu,
    language,
    focusedSection,
    updateItems,
}) => {
    const classes = useStyles();
    const [currentMenu, setCurrentMenu] = useState([]);

    useEffect(() => {
        const temp = [
            ...menu
        ]
        .filter(item => item.sectionName === focusedSection)
        .sort((a, b) => {
            if (a.itemName < b.itemName) return -1;

            return 1;
        });

        setCurrentMenu(() => [
            ...temp
        ]);

    }, [focusedSection, menu]);

    return (
        <div className={classes.rootContainer}>
            <div className={classes.sectionContainer}>
                {currentMenu.map(item => (
                    <div
                        className={classes.itemContainer}
                        key={item.itemName + Math.random()}
                        onClick={() => updateItems('add', item)}
                    >
                        <div>
                            {language === 'English'? item.itemName : item.itemNameChinese}
                        </div>
                        <div>
                            ${item.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const states = ({
    menu,
    language,
    focusedSection,
}) => ({
    menu,
    language,
    focusedSection,
});

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(Menu);