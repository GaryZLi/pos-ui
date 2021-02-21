import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import wokIcon from '../../picSrc/wok.png';
import wokAllIcon from '../../picSrc/wokAll.png';
import exitIcon from '../../picSrc/exit.png';
import deleteIcon from '../../picSrc/delete.png';
import {
    updateLanguage,
    updateScreenType,
} from '../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        height: 100,
        width: '100%',
        display: 'flex',
    },
});


const Panel = ({
    language,
    updateLanguage,
    updateScreenType,
}) => {

    const panelList = [
        {
            iconSrc: exitIcon,
            name: {
                '中文': 'Bill 中文',
                English: 'Bill'
            },
            action: () => console.log('fire'),
        },
        {
            iconSrc: wokIcon,
            name: {
                '中文': 'Fire 中文',
                English: 'fire',
            },
            action: () => console.log('fire'),
        },
        {
            iconSrc: wokAllIcon,
            name: {
                '中文': 'fire all 中文',
                English: 'fire all',
            },
            action: () => console.log('fire all'),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'delete 中文',
                English: 'delete',
            },
            action: () => console.log('delete'),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'original 中文',
                English: 'Original',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'Delivery 中文',
                English: 'Delivery',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'Sort 中文',
                English: 'Sort UP',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'Sort 中文',
                English: 'Sort Down',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'Setting 中文',
                English: 'Setting',
            },
            action: () => console.log('Setting'),
        },
        {
            iconSrc: deleteIcon,
            name: {
                '中文': 'English',
                English: '中文',
            },
            action: () => updateLanguage(language),
        },
        {
            iconSrc: exitIcon,
            name: {
                '中文': 'exit 中文',
                English: 'exit'
            },
            action: () => updateScreenType('main'),
        },
    ];

    const classes = useStyles();
    
    return (
        <div className={classes.rootContainer}>
            {panelList.map(action => (
                <ActionButton
                    key={action.name.English}
                    iconSrc={action.iconSrc}
                    name={action.name[language]}
                    action={action.action}
                />
            ))}
        </div>
    );
};

const states = ({
    language,
}) => ({
    language,
});

const dispatches = {
    updateLanguage,
    updateScreenType,
};

export default connect(states, dispatches)(Panel);