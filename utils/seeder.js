const Room = require('../models/room')
const mongoose = require('mongoose')
const rooms = require('../data/rooms')


mongoose.connect("mongodb+srv://Godshield:0258@cluster0.ssjnh.mongodb.net/BookIT?retryWrites=true&w=majority").then(con => {
    console.log('conncted to database')
})

const seedRooms = async () => {
    try {
        await Room.deleteMany()
        console.log('Rooms are deleted')

        await Room.insertMany(rooms)
        console.log('All rooms are added')

        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms()