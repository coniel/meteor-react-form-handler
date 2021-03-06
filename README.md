Meteor React form handler
=========================

Form creation and validation in React using
[SimpleSchema](<https://github.com/aldeed/meteor-simple-schema>).

This package provides only the \<Form\> component. You will also need to add one
of the form components packages:

-   [Material UI form
    components](<https://atmospherejs.com/coniel/react-form-handler-material-ui>)
    (coniel:react-form-handler-material-ui)

-   [Semantic UI form
    components](<https://atmospherejs.com/coniel/react-form-handler-semantic-ui>)
    (coniel:react-form-handler-semantic-ui)

Quick start
-----------

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var registrationFormSchema = new SimpleSchema({
    firstName: {
        type: String,
        max: 60,
        label: "First name",
        placeholder: "John"
    },
    lastName: {
        type: String,
        max: 60,
        label: "Last name",
        placeholder: "Doe"
    },
    gender: {
        type: String,
        allowedValues: ["Male", "Female", "Other"],
        label: "Gender"
    }
    email: {
        type: String,
        max: 60,
        label: "Email"
    },
    password: {
        type: String,
        max: 60,
        min: 8,
        label: "Password"
    },
    termsAgreement: {
        type: Boolean
    },
});

RegistrationForm = React.createClass({
    _onSubmit(doc) {
        Accounts.createUser(doc, function(error){
            if (error) {
                // Handle error
            } else {
                // Handle success
            }
        });
 
    },
    render() {
        return (
            <Form schema={registrationFormSchema} id="registration-form" onSubmit={this._onSubmit}>
                <TextInput name="firstName" layoutStyle="first-half" />
                <TextInput name="lastName" layoutStyle="second-half" />
                <Select name="gender" useAllowedValues />
                <TextInput name="email" />
                <TextInput name="password" type="password" />
                <Checkbox name="termsAgreement" />
                <SubmitButton label="Register" />
            </Form>
        )
    }
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The \<Form\> component
----------------------

The \<Form\> component requires three props: id, schema and onSubmit.

-   **id**: Must be unique across all forms

-   **schema**: Must be a SimpleSchema instance, with all the form fields
    specified by name.

-   **onSubmit**: Called when the form is successfully submitted and validated.
    It has one argument, which is an object with the form fields and their
    values.

If a user submits the form and it fails validation, the invalid fields are
styled accordingly and display an error message.

Configuration
-------------

### Debug mode

With debug enabled, validation errors will be printed to the console (it will do
more soon). To enable debugging, add the following in Meteor.startup:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FormHandler.debug = true;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### i18n (using TAP:i18n)

If you need to translate your form labels and errors, React Form Handler uses
the [TAP:i18n](<https://github.com/TAPevents/tap-i18n/>) package to handle
translations. In your schema, set the label property to the translation string
key (e.g. \`label: “labels.first\_name”\`) and it will be displayed in the users
current language.

To enable i18n, add the following in Meteor.startup:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FormHandler.i18n = true;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Ignore fields when validating

If you want to always ignore certain fields when validating forms, you can add
then to the array of ignored fields. This is especially useful for update forms
to which you pass a document that contains properties not set in the form (e.g.
\_id, createdAt, updatedAt…). This can also be done at the form level. To enable
globally ignored fields, add the following in Meteor.startup:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FormHandler.ignoreFields = ["_id", "createdAt", "updatedAt"...];
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Available input types
---------------------

### TextInput

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<TextInput name="[required]" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can add a type=“password” (or whatever else you want) property to change the
input to a password input, just as you would with a normal HTML input.

### TextArea

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<TextArea name="[required]" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Select

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<Select name="[required]" options={[required]} />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are two ways to define the options for the select:

-   **options prop**: must be an array of objects with a label and value
    property, e.g: [{label: “Red", value: “red”}, {label: “Blue”, value: “blue”}
    … ].

-   **useAllowedValues prop**: when this prop is added to the Select component
    (without any value), the Select will use the allowedValues from the schema
    (which you must first specify). It will use the values specified in
    allowedValues as both the value and the label of the options.

-   **multiple prop (Semantic UI only)**: when this prop is added to the Select
    component (without any value), the Select will allow multiple selections.
    The fields value will be an array of the selected options values.

-   \*\* search prop (Semantic UI only)\*\*: when this prop is added to the
    Select component (without any value), the Select will be searchable.

### Checkbox

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<Checkbox name="[required]" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### RadioButton

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<RadioButtonGroup name="[required]">
    <RadioButton label="[required]" value="[required]" />
    <RadioButton label="[required]" value="[required]" />
    <RadioButton label="[required]" value="[required]" />
</RadioButtonGroup>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Radio buttons must be created inside a radio button group. The name prop should
be set on the group (not the buttons). Each RadioButton should have a label and
value prop.

### DatePicker (Material UI only)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<DatePicker name="[required]" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Layout styles
-------------

React form handler uses React.Children.map and clones the children with new
props. This means that form input components must be first level children of the
form components (they can’t be nested inside a grid for example). I haven’t
figured out a clean way around this problem (**please open an issue if you have
a better solution**), so I created a set of layout styles. Each input can be
given a `` `layoutStyle` `` prop with values ranging from one fifth to one half.
So if you wanted to create a form with a firstName and lastName field next to
each other taking up 50% of the row each, you would use
\`layoutStyle=“first-half”\` on the first field, and
\`layoutStyle=“second-half”\`. For thirds or smaller, you would use
\`layoutStyle=“[position]-[fraction]”\`, e.g. for thirds:
\`layoutStyle=“first-third”\`, \`layoutStyle=“middle-third”\`,
layoutStyle=“last-third”. For a layout that is 1/4 - 1/2 - 1/4 you would do:
\`layoutStyle=“first-quarter”\`, \`layoutStyle=“middle-half”\`,
\`layoutStyle=“last-quarter”\`. Here are a list of available layout styles:

-   first-half

-   middle-half

-   second-half

-   first-third

-   first-two-thirds

-   middle-third

-   last-two-thirds

-   last-third

-   first-quarter

-   middle-quarter

-   last-quarter

-   first-fifth

-   first-two-fifths

-   first-three-fifths

-   first-four-fifths

-   middle-fifth

-   middle-two-fifths

-   middle-three-fifths

-   last-fifth

-   last-two-fifths

-   last-three-fifths

-   last-four-fifths
