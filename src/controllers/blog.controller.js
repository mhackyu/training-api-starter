const router = require('express').Router();

const Blog = require('../models/blog.model');

router.get('/', async(req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const blogs = await Blog.query().withGraphJoined('users').page(page - 1, limit);

    return res.success('SUCCESS', '', {
      blogs: blogs.results,
      total: blogs.total,
      page: Number(page),
      limit: Number(limit),
    });
    
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.query().findById(id);

    if (!blog) return res.error('NOT_FOUND');

    return res.success('SUCCESS', '', {
      blog
    })
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
});

router.post('/', async (req, res) =>  {
  try {
    const blog = await Blog.query().insert(req.body);
    return res.success('CREATED', '', { blog });
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const count = await Blog.query().deleteById(id);
    return res.success('SUCCESS', '', { count }); 
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
})

router.put('/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.query().findById(id).patchAndFetchById(id, req.body);
    return res.success('UPDATED', '', { blog });    
  } catch (error) { 
    return res.error('OBJECTION_ERROR', error);
  }

})

module.exports = router;


