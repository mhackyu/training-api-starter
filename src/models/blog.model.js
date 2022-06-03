const { Model } = require('objection');

const User =  require('./user.model');

class Blog extends Model {
  static get tableName() {
    return 'blogs';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.user_id',
          to: 'users.id'
        }
      }
    }
  }
}


module.exports = Blog;