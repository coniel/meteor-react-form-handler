Form = React.createClass({
    propTypes: {
        schema: React.PropTypes.instanceOf(SimpleSchema).isRequired,
        id: React.PropTypes.string.isRequired,
        onSubmit: React.PropTypes.func,
        resetOnSubmit: React.PropTypes.bool
    },
    getInitialState() {
        return {
            errors: {}
        }
    },
    componentWillMount() {
        FormHandler.initializeForm(this.props.id);
    },
    focusInput: function (name) {
        // Set focus to a form input by name
        this.refs[name].refs.input.focus();
    },
    submit() {
        this._onSubmit();
    },
    _onSubmit(event) {
        // Event is not defined if onSubmit is called pragmatically
        if (event) {
            event.preventDefault();
        }

        var doc = FormHandler.getFormDoc(this.props.id);
        var validationContext = this.props.schema.newContext();

        // Temporarily remove the doc's ignored fields
        // so an error isn't thrown when validating
        var ignoredFields = {};
        _.each(FormHandler.ignoreFields, (field) => {
            ignoredFields[field] = doc[field];
            delete doc[field];
        });

        // Remove empty strings
        doc = Utils.cleanNulls(doc);

        if (!validationContext.validate(doc)) {
            var errors = {};

            _.each(validationContext._invalidKeys, function(error) {
                errors[error.name] = error.type;
            });

            this.setState({errors: errors});

            if (FormHandler.debug) {
                console.error("React form handler validation errors", errors);
            }

        } else {
            this.setState({errors: {}});
            FormHandler.submitForm(this.props.id);

            if (this.props.onSubmit) {

                // Restore ignored fields
                if (ignoredFields) {
                    _.each(ignoredFields, (value, key) => {
                        if (value) {
                            doc[key] = value;
                        }
                    });
                }

                this.props.onSubmit(doc);
            }

            if (this.props.resetOnSubmit !== false) {
                this.refs.form.reset();
            }
        }
    },
    _renderChildren: function () {

        if (this.props.doc) {
            FormHandler.setFormDoc(this.props.id, this.props.doc);
        }

        var that = this;
        var formDoc = FormHandler.getFormDoc(this.props.id);

        if (this.props.children) {
            return React.Children.map(this.props.children, function (child) {
                if (child.props && child.props.name) {
                    var schemaObject = this.props.schema._schema[child.props.name];

                    if (!!schemaObject) {
                        var newChildProps = _.clone(child.props);
                        newChildProps.ref = child.props.name;
                        newChildProps.formId = that.props.id;
                        newChildProps.schema = schemaObject;

                        if (!formDoc[child.props.name]) {
                            if (child.props.defaultValue) {
                                newChildProps.defaultValue = child.props.defaultValue;
                            } else if (schemaObject.defaultValue) {
                                newChildProps.defaultValue = schemaObject.defaultValue;
                            }
                        } else {
                            newChildProps.defaultValue = formDoc[child.props.name];
                        }

                        if (schemaObject.type === Number) {
                            newChildProps._valueType = "number";
                        }
                        
                        if (schemaObject.label) {
                        	newChildProps.label = (FormHandler.i18n)? TAPi18n.__(schemaObject.label) : schemaObject.label;
                        }

                        if (schemaObject.placeholder || newChildProps.placeholder) {
                            var placeholder = newChildProps.placeholder || schemaObject.placeholder;
                        	newChildProps.placeholder = (FormHandler.i18n)? TAPi18n.__(placeholder) : placeholder;
                        }

                        if (schemaObject.allowedValues) {
                            newChildProps.allowedValues = schemaObject.allowedValues;
                        }

                        if (schemaObject.min) {
                            newChildProps.min = schemaObject.min;
                        }

                        if (schemaObject.max) {
                            newChildProps.max = schemaObject.max;
                        }

                        if (typeof this.props.schema._schema[child.props.name + ".$"] !== 'undefined') {
                            var itemSchemaObject = this.props.schema._schema[child.props.name + ".$"];
                            if (itemSchemaObject.allowedValues) {
                                newChildProps.allowedValues = itemSchemaObject.allowedValues;
                            }
                        }

                        if (this.state.errors[child.props.name]) {
                            newChildProps.errorText = (FormHandler.i18n)? TAPi18n.__('errors.' + this.state.errors[child.props.name]) : this.state.errors[child.props.name];
                            newChildProps.error = true;
                        } else if (!child.props.error) {
                            newChildProps.errorText = '';
                            newChildProps.error = false;
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

        let className = "";

        if (this.props.className) {
            className += " " + this.props.className;
        }

        if (FormHandler.formClass) {
            className += " " + FormHandler.formClass;
        }

        return (
            <form {...this.props} className={className} ref="form" id={this.props.id} onSubmit={this._onSubmit}>
                {this._renderChildren()}
                <div style={{clear: "both"}}></div>
            </form>
        )
    }
});