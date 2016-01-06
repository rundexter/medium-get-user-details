var util = require('./util.js');
var request = require('request').defaults({
    baseUrl: 'https://api.medium.com/'
});

var pickOutputs = {
        'id': 'data.id',
        'username': 'data.username',
        'name': 'data.name',
        'url': 'data.url',
        'imageUrl': 'data.imageUrl'
    };

module.exports = {

    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var token = dexter.environment('medium_access_token'),
            api = '/v1/me';

        if (!token)
            return this.fail('A [medium_access_token] environment variable is required for this module');

        request.get({uri: api, auth: { bearer: token }, json: true}, function (error, response, body) {
            if (error)
                this.fail(error);
            else
                this.complete(util.pickOutputs(body, pickOutputs));
        }.bind(this));
    }
};
