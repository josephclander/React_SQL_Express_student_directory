const express = require('express');
const router = express.Router();
const { Course, User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

// A /api/courses GET route that will return a list of all courses including the User that owns each course and a 200 HTTP status code.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    });
    res.json(courses);
  })
);

// A /api/courses/:id GET route that will return the corresponding course along with the User that owns that course and a 200 HTTP status code.
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    });
    if (course) {
      res.json(course);
    } else {
      const err = new Error(`Course ${id} not found.`);
      err.status = 404;
      next(err);
    }
  })
);

// A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post(
  '/',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const newCourse = await Course.create(req.body);
      res.location(`/api/courses/${newCourse.id}`).status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        next(error);
      }
    }
  })
);

// A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    // stipulation added to client side that cannot see option to update unless the owner of the course
    // this technically means 403 and 404 won't ever fire
    if (!course) {
      res.status(404).json({ message: `Course ${req.params.id} not found.` });
    } else if (course.userId !== req.currentUser.id) {
      res.status(403).json({
        message: `User ${req.currentUser.id} is not the owner of course ${course.id}`,
      });
    } else {
      try {
        await course.update(req.body);
        res.status(204).end();
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map((err) => err.message);
          res.status(400).json({ errors });
        } else {
          next(error);
        }
      }
    }
  })
);

// A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    // stipulation added to client side that cannot see option to update unless the owner of the course
    // this technically means 403 and 404 won't ever fire
    if (!course) {
      res.status(404).json({ message: `Course ${req.params.id} not found.` });
    } else if (course.userId !== req.currentUser.id) {
      res.status(403).json({
        message: `User ${req.currentUser.id} is not the owner of course ${course.id}`,
      });
    } else {
      await course.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;
