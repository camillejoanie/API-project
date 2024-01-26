"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "140 S B St.",
          city: "San Mateo",
          state: "California",
          country: "USA",
          lat: 12.7542,
          lng: -90.1934,
          name: "Urban Ritual",
          description:
            "Founded in the heart of San Francisco, Urban Ritual is an American brand that aims to bring unity to everyone through a common daily routine—coffee and tea.",
          price: 190,
        },
        {
          ownerId: 1,
          address: "4923 Junipero Serra Blvd.",
          city: "Colma",
          state: "California",
          country: "USA",
          lat: 12.753,
          lng: -90.194,
          name: "YiFang",
          description:
            "Not your typical bubble tea shop. Experience the old-fashioned Taiwanese premium tea made with love & real ingredients.",
          price: 250,
        },
        {
          ownerId: 1,
          address: "3620 Balboa St",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 12.7587,
          lng: -90.8764,
          name: "Purple Kow",
          description:
            "We intend for our products to leave a lasting taste that you'll always think back to and occasionally crave. Years down the line, maybe you’ll be reminded of the taste of your favorite drink from Purple Kow and you’ll get a sudden craving for it.",
          price: 210,
        },
        {
          ownerId: 2,
          address: "1069 El Camino Real",
          city: "Millbrae",
          state: "California",
          country: "USA",
          lat: 12.7594,
          lng: -90.1504,
          name: "Wanpo Tea Shop",
          description:
            "A traditional tea beverage brand brewed out of Taiwan’s military dependents’ village.",
          price: 300,
        },
        {
          ownerId: 2,
          address: "1419 Burlingame Ave ste a",
          city: "Burlingame",
          state: "California",
          country: "USA",
          lat: 12.7777,
          lng: -90.1111,
          name: "Happy Lemon",
          description:
            "A world-leading beverage chain founded in 2006 by the Yummy-Town Group, a publicly listed tea culture company originating in Taiwan.",
          price: 150,
        },

        {
          ownerId: 3,
          address: "429 Stockton St.",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 12.7587,
          lng: -90.8764,
          name: "Boba Guys",
          description:
            "A boba shop where the creators wanted to fundamentally change the way people view boba, tea, and perhaps, food.",
          price: 140,
        },
        {
          ownerId: 3,
          address: "1916 Irving St",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 12.755,
          lng: -90.1555,
          name: "Tpumps",
          description:
            "At Tpumps, we use loose leaf teas to brew all of our high quality teas. We brew our tea fresh daily - controlling the time and temperature to ensure the freshest, best quality tea experience for our Tpumps fans.",
          price: 90,
        },
        {
          ownerId: 3,
          address: "310 S 3rd St.",
          city: "San Jose",
          state: "California",
          country: "USA",
          lat: 37.7749,
          lng: -122.4194,
          name: "Boba Bar",
          description:
            "Discover the world of boba at Boba Bar! Our carefully crafted drinks and cozy atmosphere make us the perfect spot for boba enthusiasts.",
          price: 80,
        },
        {
          ownerId: 4,
          address: "2815 California St.",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 37.7749,
          lng: -122.4194,
          name: "Tea Hut",
          description:
            "Our intention is to provide tasty & refreshing drinks that bring something new to the Bay Area’s boba industry. That refreshing feeling is achieved with our selection of ingredients, from the milks we offer to the teas we brew.",
          price: 95,
        },
        {
          ownerId: 4,
          address: "11111 N Wolfe Rd.",
          city: "Cupertino",
          state: "California",
          country: "USA",
          lat: 37.7808,
          lng: -122.4128,
          name: "7 Leaves",
          description:
            "Step into an enchanting haven with friendly smiles, freshly brewed coffee, soothing teas, and a comforting ambiance.",
          price: 85,
        },
        {
          ownerId: 2,
          address: "2315 Telegraph Ave.",
          city: "Berkeley",
          state: "California",
          country: "USA",
          lat: 37.793,
          lng: -122.4027,
          name: "The Alley",
          description:
            "Reminisce the touching satisfaction from that first cup of good tea, such unspeakable snugness will soak through your heart via a The Alley drink, it’s time for tea!",
          price: 88,
        },
        {
          ownerId: 4,
          address: "20688 Stevens Creek Blvd.",
          city: "Cupertino",
          state: "California",
          country: "USA",
          lat: 37.7937,
          lng: -122.4022,
          name: "Chicha San Chen",
          description:
            "We brew each cup of our tea individually with our proprietary teapresso machine - LION. Our patented technology precisely brews with high temperature and pressure - the tea's fragrance and essence are extracted within seconds to retain the freshest taste.",
          price: 130,
        },
        {
          ownerId: 5,
          address: "1728 Franklin St. Ste A",
          city: "Oakland",
          state: "California",
          country: "USA",
          lat: 37.7766,
          lng: -122.4193,
          name: "Yokee Milk Tea",
          description:
            "We specialize in bubble milk teas,fruit teas,smoothies, various teas and also the brown sugar boba tea. We insisted to used the high quality tea leaves and fresh fruits. And we are also continue to create more new style drinks to our customers.",
          price: 87,
        },
        {
          ownerId: 5,
          address: "2528A Durant Ave.",
          city: "Berkeley",
          state: "California",
          country: "USA",
          lat: 37.7903,
          lng: -122.4016,
          name: "Feng Cha Teahouse 奉茶",
          description:
            "In Feng Cha, we always working hard on finding good ingredients to make our quality drinks and fine pastries, even the music that you hear in store is carefully chosen to ensure a relaxing in-store experience.",
          price: 89,
        },
        {
          ownerId: 6,
          address: "600 Market St",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 37.7886,
          lng: -122.4019,
          name: "Tong Sui",
          description:
            "Organic, low-calorie coconut pudding dessert and refreshing beverages. Indulge guilt-free while enjoying the freshest flavors.",
          price: 93,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  },
};
