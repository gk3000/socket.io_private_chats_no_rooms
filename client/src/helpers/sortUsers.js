// Function to sort users with current user first
const sortUsers = (users, currentUser) => {
    // sorting array to put the current user first
    users.sort((a, b) => {
        // if the user name is the current user, put it first
        if (a.userName === currentUser) {
          return -1;
        }
        // if the user name is not the current user, put it last
        if (b.userName === currentUser) {
          return 1;
        }
        // if the user name is not the current user, sort by user name
        return 0;
      });

    return users;
};

module.exports = sortUsers;