const { Model } = require('objection');

const User =  require('./user.model');

class Blog extends Model {
  static get tableName() {
    return 'blogs';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'body', 'user_id'],

      property: {
        title: {
          type: 'string', minLength: 1, maxLength: 50
        },
        body: {
          type: 'string'
        },
        user_id: {
          type: 'integer'
        }
      }
    }
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'blogs.user_id',
          to: 'users.id'
        }
      }
    }
  }
}


module.exports = Blog;