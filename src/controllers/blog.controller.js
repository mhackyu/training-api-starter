const router = require('express').Router();

const Blog = require('../models/blog.model');

const oldBlogs = [];

router.get('/', async(req, res) => {
  try {
    const blogs = await Blog.query();

    return res.success('SUCCESS', '', {
      blogs
    });
    
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const blog = oldBlogs.find(b => b.id === Number(id));

  if (!blog) {
    return res.error('NOT_FOUND');
  }

  return res.success('SUCCESS', '', blog);
});

router.post('/', (req, res) =>  {
  const { title, body } = req.body;
  const blog = {
    id: oldBlogs.length + 1,
    title,
    body,
  };

  oldBlogs.push(blog);

  return res.success('CREATED', '', blog);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const blog = oldBlogs.find(b => b.id === Number(id));

  if (!blog) {
    return res.error('NOT_FOUND');
  }

  oldBlogs.splice(oldBlogs.indexOf(blog), 1);

  return res.success('SUCCESS', '', blog);
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const blog = oldBlogs.find(b => b.id === Number(id));

  if (!blog) {
    return res.error('NOT_FOUND');
  }

  blog.title = title;
  blog.body = body;

  return res.success('UPDATED', '', blog);
})

module.exports = router;


