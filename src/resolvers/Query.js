const { forwardTo } = require("prisma-binding");

const Query = {
  employees: forwardTo("db"),
  // async employees(parent, args, ctx, info) {
  //   const employees = await ctx.db.query.employees();
  //   console.log({ employees, ctx });
  //   return employees;
  // },
  me(parent, args, ctx, info) {
    // check if current user ID
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
