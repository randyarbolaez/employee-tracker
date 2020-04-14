const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createEmployee(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be signed in to do that!");
    }
    console.log(ctx.request.userId, "!!!!!!!=======USERID");
    const employee = await ctx.db.mutation.createEmployee(
      {
        data: {
          // this is how we create a relationship between restaurant & user
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
          ...args,
        },
      },
      info
    );
    return employee;
  },
  updateEmployee(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateEmployee(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteEmployee(parent, args, ctx, info) {
    const where = { id: args.id };

    const employee = await ctx.db.query.employee({ where }, `{id,name}`);

    return ctx.db.mutation.deleteEmployee({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcyrpt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`User wasn't found for email ${email}`);
    }
    // check if their password is correct
    const valid = await bcyrpt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    // generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // return the user :)
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Successfully logged out, Goodbye!" };
  },
};

module.exports = Mutations;
