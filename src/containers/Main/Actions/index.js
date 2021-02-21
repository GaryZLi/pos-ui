import { connect } from 'react-redux';
import Setting from './Action';
import {
    updateLanguage,
    updateScreenType,
} from '../../../redux/actions';

const styles = {
    rootContainer: {
        height: '100%',
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
};

const Settings = ({
    language,
    updateLanguage,
    updateScreenType,
}) => {

    const mainActions = [
        {
            name: {
                '中文': 'Order 中文',
                English: 'Order',
            },
            action: () => updateScreenType('order')
        },
        {
            name: {
                '中文': 'Open 中文',
                English: 'Open',
            },
            action: () => console.log('Open')
        },
        {
            name: {
                '中文': 'List 中文',
                English: 'List',
            },
            action: () => console.log('List'),
        },
        {
            name: {
                '中文': 'English',
                English: '中文',
            },
            action: () => updateLanguage(language),
        },
    ];

    return (
        <div style={styles.rootContainer}>
            {mainActions.map(setting => (
                <Setting
                    key={setting.name[language]}
                    name={setting.name[language]}
                    action={setting.action}
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

export default connect(states, dispatches)(Settings);