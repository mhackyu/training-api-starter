const { Model } = require('objection');

const User =  require('./user.model');

/**
 * @swagger
 *  components:
 *   schemas:
 *    Blog:
 *      type: object
 *      required:
 *        - title
 *        - body
 *        - user_id
 *      properties:
 *        id:
 *          type: integer
 *          description: The unique identifier for a blog
 *        title:
 *          type: string
 *          description: The title of the blog
 *        body:
 *          type: string
 *          description: The body of the blog
 *        user_id:
 *          type: integer
 *          description: The user id of the blog
 *        created_at:
 *          type: date
 *          description: The date and time the blog was created
 *        updated_at:
 *          type: date
 *          description: The date and time the blog was updated
 *      example:
 *        title: My first blog
 *        body: This is my first blog
 *        user_id: 1
 */
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