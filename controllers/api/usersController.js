const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const db=require('../../database/models');

const usersApi = {
    'index': (req, res) => {

    },
    'all': (req, res) => {
        db.Usuario.findAll({

        })
        .then(function(usuarios){
            
        }).catch(error => console.error(error));
    },
    'profile': (req, res) => {

        db.Usuario.findByPk(parseInt(req.params.id,10), {

        })
        .then(function(result){
            
        })
        .catch(error => console.error(error));
    }
    
}

module.exports = usersApi;