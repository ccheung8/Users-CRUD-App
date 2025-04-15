import { Router } from "express";
import usersController from "../../controllers/users.controller.js";

const router = Router();

// CREATE
router.post("/", (req, res) => {
  const timestamp = req.timestamp;
  const name = req.body.name;
  const age = req.body.age;
  const user = usersController.create(name, age, timestamp);

  res.send({
    msg: "User saved successfully",
    data: user
  })
});

// GET OR LIST
router.get("{/:userId}", (req, res) => {
  if (req.params.userId) {
    return res.send(usersController.get(req.params.userId));
  }
  const list = usersController.list();
  return res.send({
    data: list,
    count: list.length
  });
});

// UPDATE
router.put("/:userId", (req, res) => {
  const user = usersController.put(
    usersController.list(),
    parseInt(req.params.userId),
    req.body.name,
    req.body.age,
    req.timestamp
  );

  return res.send({
    msg: `Inserted ${user.name} into ${user.id}.json`,
    count: usersController.list().length
  });
});

// DELETE
router.delete("/:userId", (req, res) => {
  const deletedUser = usersController.delete(
    parseInt(req.params.userId),
    req.timestamp,
    usersController.list()
  );
    
  if (!deletedUser) {
    return res.status(404).send("Resource not found");
  }

  return res.send({
    msg: `User ID ${deletedUser.id} Successfully deleted`,
    deletedAt: deletedUser.deletedAt
  });
});

export default router;