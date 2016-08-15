// Layout styles that can be passed as a prop to form inputs
const FormLayoutStyles = {
    // Halves
    'first-half': {
        width: "calc(50% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'middle-half': {
        width: "calc(50% - 20px)",
        paddingLeft: 10,
        paddingRight: 10,
        float: "left"
    },
    'second-half': {
        width: "calc(50% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-half': {
        width: "calc(50% - 10px)",
        paddingLeft: 10,
        float: "left"
    },

    // Thirds
    'first-third': {
        width: "calc(100% / 3 - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'first-two-thirds': {
        width: "calc(200% / 3 - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'middle-third': {
        width: "calc(100% / 3 - 20px)",
        paddingLeft: 10,
        paddingRight: 10,
        float: "left"
    },
    'last-third': {
        width: "calc(100% / 3 - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-two-thirds': {
        width: "calc(200% / 3 - 10px)",
        paddingLeft: 10,
        float: "left"
    },

    // Quarters
    'first-quarter': {
        width: "calc(25% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'first-three-quarters': {
        width: "calc(75% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'middle-quarter': {
        width: "calc(25% - 20px)",
        paddingRight: 10,
        paddingLeft: 10,
        float: "left"
    },
    'last-quarter': {
        width: "calc(25% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-three-quarters': {
        width: "calc(75% - 10px)",
        paddingLeft: 10,
        float: "left"
    },

    // Fifths
    'first-fifth': {
        width: "calc(20% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'first-two-fifths': {
        width: "calc(40% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'first-three-fifths': {
        width: "calc(60% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'first-four-fifths': {
        width: "calc(80% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'middle-fifth': {
        width: "calc(20% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'middle-two-fifths': {
        width: "calc(40% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'middle-three-fifths': {
        width: "calc(60% - 10px)",
        paddingLeft: 5,
        paddingRight: 5,
        float: "left"
    },
    'last-fifth': {
        width: "calc(20% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-two-fifths': {
        width: "calc(40% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-three-fifths': {
        width: "calc(60% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'last-four-fifths': {
        width: "calc(80% - 10px)",
        paddingLeft: 10,
        float: "left"
    }
};

const AvailableFormLayoutStyles = [];

_.each(FormLayoutStyles, function (value, key) {
    AvailableFormLayoutStyles.push(key);
});

export default FormLayoutStyles;

export {
    FormLayoutStyles,
    AvailableFormLayoutStyles
}