import {AppComponents, backendFactory, frontendFactory} from 'express-dynamic-components';
import {GigyaApi, GigyaWebSDK} from '../custom-components';

const app = require('express')();

(async () => {
    app.get('/test', (req, res) => {
        res.send('hello beautiful people');
    });

    console.log('installing...');
    try {
        backendFactory.addType(GigyaApi);
        frontendFactory.addType(GigyaWebSDK);
        await new AppComponents(app, require('./compConfig.json')).install();
        console.log('listening...');
        app.listen(8080);
    }
    catch (e) {
        console.log(e);
    }
})();
