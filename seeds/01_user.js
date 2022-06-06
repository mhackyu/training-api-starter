
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => 
      // Inserts seed entries
      knex('users').insert([
        { id: 1, username: 'mark123', first_name:'Mark Christian', last_name: 'Paderes' },
        { id: 2, username: 'michael', first_name:'Michael', last_name: 'Jordan' },
      ]),
    );
};
