// container object
var db = {}

//set up sql
var pg = require('pg')
var Sequelize = require('sequelize')
db.conn = new Sequelize('productopendata', process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD, {
		host: 'localhost',
		dialect: 'postgres',
		define: {
			timestamps: false
		}
	});



//Models
db.barcode = db.conn.define('barcode', {
	number: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [3, Infinity]
		},
	},
	product: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [3, Infinity]
		},
	}
});


// //establish relationships
// db.country.hasMany(db.city)
// db.city.belongsTo(db.country)


db.conn.sync({force: true
}).then(function(){
	console.log('sync started')
}).then(function(){
	Promise.all([
		db.barcode.create({
			number: 123,
			product: 'Tomato'
		}),
		db.barcode.create({
			number: 456,
			product: 'Banana'
		}),
		db.barcode.create({
			number: 789,
			product: 'Kiwi'
		})
	])
})





module.exports = db;