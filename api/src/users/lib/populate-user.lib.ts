export const populateUser = {
  path: 'jobs',
  populate: [
    {
      path: 'created',
      model: 'Job',
      populate: {
        path: 'owner',
        model: 'User',
      },
    },
    {
      path: 'applied',
      model: 'Job',
      populate: {
        path: 'owner',
        model: 'User',
      },
    },
  ],
};
