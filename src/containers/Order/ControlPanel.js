import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    updateFocusedItems,
    updateFocusedSection,
} from '../../redux/actions';

const useStyles = makeStyles({
    rootContainer: {
        width: 376,
        overflow: 'auto',
        backgroundColor: '#ededed'
    },
    sectionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    sectionItem: {
        height: 90,
        width: 90,
        fontSize: 14,
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: 10,
        margin: 1,
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',

        '&:active': {
            transform: 'scale(0.90)',
        }
    },
    sectionName: {
        display: 'flex',
        wordBreak: 'break-word',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
    }
});

// TODO
// maybe bill, choose cash or credit
// menu sections
// apply discount
// button to send shit to printer at a certain time aka FUTURE ORDERS

const ControlPanel = ({
    menu,
    language,
    focusedItems,
    focusedSection,
    modNames,
    updateFocusedItems,
    updateFocusedSection,
}) => {
    const classes = useStyles();
    const [sections, setSections] = useState([]);
    const numOfFocusedItems = Object.keys(focusedItems).filter(item => focusedItems[item] && item !== 'all');
    
    // TODO: maybe create a db for the sections, with name in english and chinese
    useEffect(() => {
        const set = {};
        const arr = [];

        for (const item of menu) {
            set[item.sectionName] = item.sectionNameChinese;
        }

        for (const key of Object.keys(set)) {
            arr.push({
                English: key,
                '中文': set[key],
            })
        }

        setSections([
            ...arr.sort((a, b) => {
                if (a.English < b.English) return -1;
                
                return 1;
            })
        ]);
    }, [menu]);

    // DELETE: https://www.tiktok.com/@rachael.minjarez1/video/6931076678378671365?sender_device=pc&sender_web_id=6933057260022695430&is_from_webapp=v1&is_copy_url=0

    if (focusedSection.English === 'Pay' || focusedSection.English === 'Pay All') return <div/>;

    return (
        <div className={classes.rootContainer}>
            <div className={classes.sectionContainer}>
                {sections.map((section, id) => (
                    <div 
                        className={classes.sectionItem}
                        key={section.English}
                        style={{
                            backgroundColor: focusedSection.English === section.English? 'skyblue' : 'white',
                        }}
                        onMouseDown={() => updateFocusedSection({
                            English: section.English,
                            '中文': section['中文'],
                        })}
                    >
                        <div 
                            className={classes.sectionName}
                        >
                            {section[language]}
                        </div>
                        <div>
                            {String.fromCharCode(65 + id)}
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.divider}/>
            <div className={classes.sectionContainer}>
                <button
                    className={classes.sectionItem}
                    style={{
                        backgroundColor: focusedItems.all ? 'skyblue' : 'white',
                    }}
                    onMouseDown={() => updateFocusedItems('all')}
                >
                    {language === 'English'? 'All' : 'All 中文'}
                </button>
                {Object.keys(modNames).map(mod => (
                    <button
                        disabled={mod === 'Edit'? numOfFocusedItems.length !== 1 : !numOfFocusedItems.length}
                        className={classes.sectionItem}
                        key={mod}
                        style={{
                            backgroundColor: focusedSection.English === mod? 'skyblue' : 'white',
                        }}
                        onMouseDown={() => updateFocusedSection({
                            English: modNames[mod].English,
                            '中文': modNames[mod]['中文'], 
                        })}
                    >
                        {modNames[mod][language]}
                    </button>
                ))}
            </div>
        </div>
    );
};

const states = ({
    menu,
    language,
    focusedItems,
    focusedSection,
    modNames,
}) => ({
    menu,
    language,
    focusedItems,
    focusedSection,
    modNames,
});

const dispatches = {
    updateFocusedItems,
    updateFocusedSection,
};

export default connect(states, dispatches)(ControlPanel);