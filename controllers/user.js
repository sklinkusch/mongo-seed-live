const faker = require("faker");
const UserModel = require("../models/user");

exports.create = (amount = 5) => {
    new Array(amount).fill(0).map(() => ({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        age: Math.floor(Math.random() * 70 + 18),
        username: faker.internet.userName(),
        short_bio: faker.lorem.text(),
        address: {
            street: faker.address.streetName(),
            street_number: Math.floor(Math.random() * 7000 + 0),
            zip: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country(),
            state: faker.address.state()
        },
        phone_number: faker.phone.phoneNumber()
    }));
}

exports.addUser = async (req, res) => {
    console.log(req.body.email);
    const user = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        username: req.body.username,
        short_bio: req.body.bio,
        address: {
            street: req.body.street,
            street_number: req.body.number,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state
        },
        phone_number: req.body.phone
    };
    // insert in the DB -> await
    const newUser = await new UserModel(user)
        .save()
        .then(() => {
            console.log("User added! Check Compass!")
        })
        .catch(err => {
            console.error(err);
        })
}