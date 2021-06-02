const router = require("express").Router();
const User = require(`../models/User`);

router.get("/", (req, res) => {
  res.json({ msg: "This route is connected" });
});

router.post("/register", (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, doc) => {
    console.log(req.body);
    if (err) throw err.message;
    res.json(doc);
  });
});

router.get("/find/:key/:value?/:param?", async (req, res) => {
  switch (req.params.param) {
    // greater then
    case "gt":
      await User.find((err, users) => {
        res.json(users);
      })
        .where(req.params.key)
        .gt(req.params.value);
      return;
    //   less then
    case "lt":
      await User.find((err, users) => {
        res.json(users);
      })
        .where(req.params.key)
        .lt(req.params.value);
      return;
  }

  switch (req.params.key) {
    case "totalAge":
      await User.aggregate(
        [
          {
            $group: {
              _id: null,
              age: { $sum: "$age" },
            },
          },
        ],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
      return;
    case "avgAge":
      await User.aggregate(
        [
          {
            $group: {
              _id: null,
              age: { $avg: "$age" },
            },
          },
        ],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
      return;
    case "min":
      await User.aggregate(
        [
          {
            $group: {
              _id: null,
              age: { $min: "$age" },
            },
          },
        ],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
      return;
    case "max":
      await User.aggregate(
        [
          {
            $group: {
              _id: null,
              age: { $max: "$age" },
            },
          },
        ],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
      return;
    default:
      await User.find((err, users) => {
        if (users.length !== 0) {
          res.json(users);
        } else {
          res.json({
            msg: `We could find no matches of ${req.params.value} in ${req.params.key}, our apologies!`,
          });
        }
      })
        .where(req.params.key)
        .equals(req.params.value);
  }
});

router.get("/sum", (req, res) => {
  User.aggregate(
    [
      {
        $group: {
          _id: null,
          age: { $max: "$age" },
        },
      },
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
