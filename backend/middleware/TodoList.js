const moment = require('moment');

class TodoList {
    constructor(dbConnection) {
        this.TABLE_NAME = 'todo_list';
        this.db = dbConnection;
    }

    _initData (data) {
        let newData = Object.assign({}, data);
        if (typeof newData.userId !== 'string' || newData.userId.length == 0) {
            newData.user_id = 'unknown';
        }

        if (typeof newData.title !== 'string' || newData.title.length == 0) {
            newData.title = '제목없음';
        }

        if (typeof newData.content !== 'string' || newData.content.length == 0) {
            newData.content = '내용없음';
        }

        if (isNaN(newData.priority)) {
            newData.priority = 0;
        } else {
            newData.priority = parseInt(newData.priority);
        }

        if (moment(newData.deadline).isValid()) {
            newData.deadline = moment(newData.deadline).format('YYYY-MM-DD');
        } else {
            newData.deadline = null;
        }

        if (typeof newData.todo !== undefined) {
            newData.todo = data.todo ? 1 : 0;
        }

        return newData;
    }

    async getList() {
        let lists = await this.db(this.TABLE_NAME).select();
        // todo 값을 boolean으로 변경
        lists = lists.map(elem => {
            elem.todo = elem.todo == 1;
            return elem;
        });
        return lists;
    }

    async deleteElement(id) {
        return this.db(this.TABLE_NAME).where('id', id).del();
    }

    async addElement(data) {
        let inputData = this._initData({
            user_id: data.userId,
            title: data.title,
            content: data.content,
            priority: data.priority,
            deadline: data.deadline
        });
        return this.db(this.TABLE_NAME).insert(inputData);
    }

    async modifyElement(data, id) {
        let inputData = this._initData({
            user_id: data.userId,
            title: data.title,
            content: data.content,
            priority: data.priority,
            deadline: data.deadline,
            todo: data.todo
        });
        return this.db(this.TABLE_NAME).update(inputData).where('id', id);
    }
}

module.exports = TodoList;