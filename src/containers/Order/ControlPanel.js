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
    updateFocusedItems,
    updateFocusedSection,
}) => {
    const classes = useStyles();
    const [sections, setSections] = useState([]);
    const [operation, setOperation] = useState();
    const [modify, setModify] = useState();
    const modifications = {
        English: [
            {
                name: 'Add',
                action: () => updateFocusedSection('Add'),
            },
            {
                name: 'Less',
                action: () => updateFocusedSection('Less'), 
            },
            {
                name: 'No',
                action: () => updateFocusedSection('No'),
            },
            {
                name: 'Modify Price',
                action: () => modify? setModify() : setModify('Modify Price'),
            },
            {
                name: 'Modify Quantity',
                action: () => modify? setModify() : setModify('Modify Quantity'),
            },
            {
                name: 'Change',
                action: () => updateFocusedSection('Change'),
            },
            {
                name: 'Future',
                action: () => console.log('Future'),
            },
        ],
        '中文': [
            'Add 中文',
            'Less 中文',
            'No 中文',
            'Modify Price 中文',
            'Modify Quantity 中文',
            'Change 中文',
            'Future 中文',
            '+',
            '*',
            '-',
            0.5,
            1,
            5,
            10,
        ],
    };
    const numOfFocusedItems = Object.keys(focusedItems).filter(item => focusedItems[item]);
    const operations = [
        {
            name: 0.5,
            action: () => console.log(modify, operation, 0.5, numOfFocusedItems[0]),
        },
        {
            name: 1,
            action: () => console.log(modify, operation, 1, numOfFocusedItems[0]),
        },
        {
            name: 5,
            action: () => console.log(modify, operation, 5, numOfFocusedItems[0]),
        },
        {
            name: 10,
            action: () => console.log(modify, operation, 10, numOfFocusedItems[0]),
        },
    ];

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

    return (
        <div className={classes.rootContainer}>
            <div className={classes.sectionContainer}>
                {sections.map((section, id) => (
                    <div 
                        className={classes.sectionItem}
                        key={section.English}
                        style={{
                            backgroundColor: focusedSection === section.English? 'skyblue' : 'white',
                        }}
                        onMouseDown={() => updateFocusedSection(section.English)}
                        // onMouseDown={() => updateFocusedSection(section.English)}
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
                {modifications[language].map(mod => (
                    <button
                        disabled={!numOfFocusedItems.length}
                        className={classes.sectionItem}
                        key={mod.name}
                        style={{
                            backgroundColor: focusedSection === mod.name? 'skyblue' : 'white',
                        }}
                        onMouseDown={mod.action}
                    >
                        {mod.name}
                    </button>
                ))}
            </div>
            <div className={classes.divider} />
            <div className={classes.sectionContainer}>
                    {/* PLUS */}
                    <button
                        className={classes.sectionItem}
                        style={{
                            backgroundColor: operation === '+' && numOfFocusedItems.length === 1? 'skyblue' : 'white',
                            position: 'relative'
                        }}
                        disabled={!modify || numOfFocusedItems.length !== 1}
                        onMouseDown={() => operation === '+'? setOperation() : setOperation('+')}
                    >
                        <div style={{
                            height: 3,
                            width: 30,
                            backgroundColor: !modify || numOfFocusedItems.length !== 1? '#1010104d' : 'black',
                            position: 'absolute'
                        }}/>
                        <div style={{
                            height: 30,
                            width: 3,
                            backgroundColor: !modify || numOfFocusedItems.length !== 1? '#1010104d' : 'black',
                            position: 'absolute'
                        }}/>
                    </button>
                    {/* MULTIPLY */}
                    <button
                        className={classes.sectionItem}
                        style={{
                            backgroundColor: modify && operation === 'x' && numOfFocusedItems.length === 1? 'skyblue' : 'white',
                            position: 'relative',
                        }}
                        disabled={!modify || numOfFocusedItems.length !== 1} // TODO: if i change out of focusedItems: all to focusedItems: {}, i must check to see if focusedItems has length
                        onMouseDown={() => operation === 'x'? setOperation() : setOperation('x')}
                    >
                        <div style={{
                            height: 3,
                            width: 30,
                            backgroundColor: !modify || numOfFocusedItems.length !== 1? '#1010104d' : 'black',
                            position: 'absolute',
                            transform: 'rotate(-45deg)',
                            borderRadius: 30,
                        }}/>
                        <div style={{
                            height: 30,
                            width: 3,
                            backgroundColor: !modify || numOfFocusedItems.length !== 1? '#1010104d' : 'black',
                            position: 'absolute',
                            transform: 'rotate(-45deg)',
                            borderRadius: 30,
                        }}/>
                    </button>
                    {/* SUBTRACT */}
                    <button
                        className={classes.sectionItem}
                        style={{
                            backgroundColor: modify && operation === '-' && numOfFocusedItems.length === 1? 'skyblue' : 'white'
                        }}
                        disabled={!modify || numOfFocusedItems.length !== 1}
                        onMouseDown={() => operation === '-'? setOperation() : setOperation('-')}
                    >
                        <div style={{
                            height: 3,
                            width: 30,
                            backgroundColor: !modify || numOfFocusedItems.length !== 1? '#1010104d' : 'black',
                        }}/>
                    </button>
            </div>
            <div className={classes.sectionContainer}>
                {operations.map(op => (
                    <button
                        className={classes.sectionItem}    
                        key={op.name}
                        disabled={!operation || numOfFocusedItems.length !== 1}
                        onMouseDown={op.action}
                    >
                        {op.name}
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
}) => ({
    menu,
    language,
    focusedItems,
    focusedSection,
});

const dispatches = {
    updateFocusedItems,
    updateFocusedSection,
};

export default connect(states, dispatches)(ControlPanel);