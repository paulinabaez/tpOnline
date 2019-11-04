'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    nombre: { type: String, required: [true, 'No se puede dejar el nombre en blanco.' ]},
    apellidos: { type: String, required: [true, 'No se pueden dejar los apellidos en blanco.' ]},
    email: { type: String, unique: true, required: [true, 'Es necesario el email.' ]},
    password: { type: String, required: [true, 'Es necesaria la contraseña.' ]},
    tipo: {
        type: Schema.ObjectId,
        ref: 'UserTypes'
    },
});

UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = Math.floor(Math.random() * 11);

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

module.exports = mongoose.model('Usuario', UserSchema);
