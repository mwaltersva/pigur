"use strict";
exports.config = {
    dbPath: './db/db',
    dbConfig: {
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        storage: 'db/db',
    }
};
//# sourceMappingURL=config.js.map