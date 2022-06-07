const { CronJob } = require('cron');
const Blog = require('../models/blog.model');

const job = new CronJob(
	'*/3 * * * * *',
	(async () => {
    const data = {
      title: 'Blog worker',
      body: 'This is a blog worker',
      user_id: 1,
    }
		await Blog.query().insert(data);
	}),
	null,
	false,
	'Asia/Singapore'
);

module.exports = job;
