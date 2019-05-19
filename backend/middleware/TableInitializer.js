class TableInitializer {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    _createTable (tableName, func) {
        return new Promise((resolve, reject) => {
            this.db.schema.hasTable(tableName).then(exists => {
                if (!exists) {
                    this.db.schema.createTable(tableName, func)
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                } else {
                    resolve(true);
                }
            }).catch(err => reject(err));
        });
    }

    createTable () {
        return this._createTable('todo_list', t => {
            t.increments('id').primary().notNullable();
            t.string('user_id').notNullable();
            t.string('title').notNullable();
            t.string('content').notNullable();
            t.timestamp('deadline').nullable();
            t.boolean('todo').default(false);
            t.integer('priority').defaultTo(0);
        });
    }

    _dropTable (tableName) {
        return new Promise((resolve, reject) => {
            this.db.schema.dropTableIfExists(tableName).then(res => resolve(res)).catch(err => reject(err));
        })
    }

    dropTable () {
        return this._dropTable('todo_list');
    }
}

module.exports = TableInitializer;