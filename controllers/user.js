const faker = require("faker");
const UserModel = require("../models/user");
/* validate also on updates 
1. define opts
2. pass opts to every update*/
const opts = { runValidators: true };

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
    console.log(user);
    // insert in the DB -> await

    if (req.body.id) {
        console.log("Updating");
        const updateUser = UserModel.updateOne({ _id: req.body.id }, { $set: user }, opts)
            .then(() => {
                console.log("User updated! Check Compass!")
                res.redirect(`/?status=success&message='User successfully updated'`);
            })
            .catch(err => {
                console.error(err);
                res.redirect(`/?status=alert&message=${err}`);
            });
    } else {
        console.log("Adding a new user");
        const newUser = await new UserModel(user)
            .save()
            .then(() => {
                console.log("User added! Check Compass!")
                res.redirect(`/?status=success&message='All went well'`);
            })
            .catch(err => {
                console.error(err);
                res.redirect(`/?status=alert&message=${err}`);
            })
    }
}

exports.delete = async (req, res) => {
    const user = await UserModel.findById(req.params.userID);
    const deleteUser = await UserModel.deleteOne({ _id: req.params.userID })
        .then(() => {
            console.log('User successfully deleted!');
            res.redirect(`/?status=success&message='User successfully deleted'`);
        })
        .catch(err => {
            console.error(err);
            res.redirect(`?status=alert&message=${err}`)
        })
}

