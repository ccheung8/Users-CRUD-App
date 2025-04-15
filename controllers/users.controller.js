import BaseController from "./base.controller.js";
import User from "../models/user.model.js";

class UsersController extends BaseController {
  constructor() {
    super(User, "./data/users");
  }

  create(name, age, timestamp,
      id = this.nextId(this.fs.readdirSync(this.filepath))) {
    const user = new User(id, name, age, timestamp, timestamp);
    this.fs.writeFileSync(`${this.filepath}/${id}.json`, JSON.stringify(user));

    return user;
  }

  get(id) {
    const user = this.fs.readFileSync(`${this.filepath}/${id}.json`, "utf-8");
    return user;
  }

  put(usersList, id, name, age, timestamp) {
    // finds if user exists
    let existingUser;
    usersList.forEach((user) => {
      if (user.id === id) {
        return existingUser = user;
      }
    });

    // if existingUser doesn't exist then create
    if (!existingUser) {
      return this.create(name, age, timestamp, id);
    }

    // updates values of existingUser if provided
    existingUser.name = name ?? existingUser.name;
    existingUser.age = age ?? existingUser.age;
    existingUser.updatedAt = timestamp;

    // writes updated information
    this.fs.writeFileSync(
      `${this.filepath}/${id}.json`, JSON.stringify(existingUser)
    );

    return existingUser;
  }

  delete(id, timestamp, users) {
    // checks if user exists
    let userToDelete;
    users.forEach((user) => {
      if (user.id === id) {
        return userToDelete = user;
      }
    });

    if (!users.length || !userToDelete) {
      return;
    }

    this.fs.unlinkSync(`${this.filepath}/${userToDelete.id}.json`);
    userToDelete.deletedAt = timestamp;

    return userToDelete;
  }

  list() {
    const files = this.fs.readdirSync(this.filepath);
    const users = files.map(file => {
      return JSON.parse(
        this.fs.readFileSync(`${this.filepath}/${file}`, "utf-8"
      ));
    });

    return users;
  }
}

export default new UsersController();