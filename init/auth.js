function init(app, query){
    app.brownShib = require('brown-shib')('https://local.cis-dev.brown.edu/', 'https://local.cis-dev.brown.edu/shibboleth-sp', 7);
    app.use(app.brownShib.passport.initialize());
    app.use(app.brownShib.passport.session());

    return app.brownShib;
};
module.exports = init;