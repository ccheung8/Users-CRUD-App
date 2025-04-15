import fs from "fs";

class BaseController {
  constructor(model, filepath) {
    this.model = model;
    this.filepath = filepath;
    this.fs = fs;
  }

  nextId(users) {
    // sorts users
    users.sort((a, b) =>
      Number(a.replace(".json", "")) - Number(b.replace(".json", "")));

    for (let i = 0; i < users.length; i++) {
      if (Number(users[i].replace(".json", "")) != (i + 1)) {
        return i + 1;
      }
    }

    // json files are in order 1 by 1
    return users.length + 1;
  }
}

export default BaseController;