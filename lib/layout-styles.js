// Layout styles that can be passed as a prop to form inputs
FormLayoutStyles = {
    'first-half': {
        width: "calc(50% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'second-half': {
        width: "calc(50% - 10px)",
        paddingLeft: 10,
        float: "left"
    },
    'first-three-quarters': {
        width: "calc(75% - 10px)",
        paddingRight: 10,
        float: "left"
    },
    'last-quarter': {
        width: "calc(25% - 10px)",
        paddingLeft: 10,
        float: "left"
    }
};

AvailableFormLayoutStyles = [];

Meteor.startup(function () {
    _.each(FormLayoutStyles, function (value, key) {
        AvailableFormLayoutStyles.push(key);
    });
});