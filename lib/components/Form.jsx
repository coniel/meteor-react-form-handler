Form = React.createClass({
    propTypes: {
        schema: React.PropTypes.instanceOf(SimpleSchema).isRequired,
        id: React.PropTypes.string.isRequired,
        onSubmit: React.PropTypes.func,
        resetOnSubmit: React.PropTypes.bool
    },
    componentWillMount() {
        console.log(this.props.id);
        FormHandler.initializeForm(this.props.id);
    },
    focusInput: function (name) {
        // Set focus to a form input by name
        this.refs[name].refs.input.focus();
    },
    _onSubmit(event) {
        // Event is not defined if onSubmit is called pragmatically
        if (event) {
            event.preventDefault();
        }

        FormHandler.submitForm(this.props.id);

        if (this.props.onSubmit) {
            var doc = FormHandler.getFormDoc(this.props.id);
            this.props.onSubmit(doc);
        }

        if (this.props.resetOnSubmit) {
            this.refs.form.getDOMNode().reset();
        }
    },
    _renderChildren: function () {
        var that = this;
        var formDoc = FormHandler.getFormDoc(this.props.id);

        if (this.props.children) {
            return React.Children.map(this.props.children, function (child) {
                if (child.props.name) {
                    var schemaObject = this.props.schema._schema[child.props.name];

                    if (!!schemaObject) {
                        var newChildProps = {
                            name: child.props.name,
                            ref: child.props.name,
                            formId: that.props.id,
                            value: formDoc[child.props.name]
                        };

                        if (!newChildProps.value) {
                            if (child.props.defaultValue) {
                                newChildProps.defaultValue = child.props.defaultValue;
                            } else if (schemaObject.defaultValue) {
                                newChildProps.defaultValue = schemaObject.defaultValue;
                            }
                        }

                        if (child.props.noFloatLabel) {
                            newChildProps.hintText = TAPi18n.__(schemaObject.label);
                        } else {
                            newChildProps.floatingLabelText = TAPi18n.__(schemaObject.label);
                        }

                        if (schemaObject.placeholder) {
                            newChildProps.hintText = TAPi18n.__(schemaObject.placeholder);
                        }

                        return React.cloneElement(child, newChildProps);
                    } else {
                        throw new Meteor.Error("input_schema_missing", "There is no schema defined for the input " + child.props.name);
                    }
                } else {
                    return child;
                }
            }.bind(this));
        }
    },
    render: function() {
        return (
            <form {...this.props} ref="form" id={this.props.id} onSubmit={this._onSubmit}>
                {this._renderChildren()}
                <div style={{clear: "both"}}></div>
            </form>
        )
    }
});