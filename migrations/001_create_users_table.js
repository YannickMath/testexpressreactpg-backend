exports.up = (pgm) => {
    pgm.createTable('users', {
      id: 'id',
      name: { type: 'string', notNull: true },
      email: { type: 'string', notNull: true },
      password: { type: 'string', notNull: true },
      photo: { type: 'string', default: null },
      description: { type: 'string', default: null },
      timestamp: { type: 'timestamp', notNull: true },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('users');
  };
  