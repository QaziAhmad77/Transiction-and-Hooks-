const { text } = require('express');
let db = require('../models/index');
let User = db.user;
let Contact = db.contact;
let Image = db.image;
let Video = db.video;
let Comment = db.comment;

console.log("Outside the function");
module.exports = {

  //Unmanage transection

  transection1: async (req, res) => {
    try {
      console.log("In try block");
      const { name, email, password } = req.body;
      const data = await User.create({
        name: name,
        email: email,
        password: password
      })
      if (data && data.id) {
        const { contactNumber, address } = req.body;
        await Contact.create({
          contactNumber: contactNumber,
          address: address,
          userId: data.id,
        })
      }
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  transection2: async (req, res) => {
    try {
      console.log("In try block");
      const { name, email, password } = req.body;
      const data = await User.create({
        name: name,
        email: email,
        password: password
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  transection3: async (req, res) => {
    try {
      const { contactNumber, address } = req.body;
      const data = await Contact.create({
        contactNumber: contactNumber,
        address: null,
        userId: 2,
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  transection4: async (req, res) => {
    try {
      const data = await User.findAll({
        include: [{
          model: Contact,
          as: 'contactDetails',
        }],
        where: { id: 1 }
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  transection5: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { contactNumber, address } = req.body;
      const data = await Contact.create({
        contactNumber: contactNumber,
        address: address,
        userId: null,
      })
      await t.commit();
      console.log("commit");
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      await t.rollback();
      console.log("rollback");
      res.send("Something went wrong");
    }
  },

  transection6: async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const { name, email, password } = req.body;
    const data = await User.create({
      name: name,
      email: email,
      password: password
    })
    try {
      if (data && data.id) {
        const { contactNumber, address } = req.body;
        await Contact.create({
          contactNumber: contactNumber,
          address: null,
          userId: null,
        })
      }
      await transaction.commit();
      console.log("commit");
      res.status(200).send({ data });
    } catch (error) {
      await transaction.rollback();
      console.log("rollback");
      await User.destroy({
        where: { id: data.id },
      })
      res.send("Something went wrong");
    }
  },

  // Manage transection

  transection7: async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const { name, email, password } = req.body;
    const data = await User.create({
      name: name,
      email: email,
      password: password
    })
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const { contactNumber, address } = req.body;
        await Contact.create({
          contactNumber: contactNumber,
          address: null,
          userId: null,
        })
      })
    } catch (error) {
      console.log(error.message);
      await User.destroy({
        where: { id: data.id },
      })
    }
    res.status(200).send({ data });
  },

  hooks1: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const data = await User.create({
        name: name,
        email: email,
        password: password
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany1: async (req, res) => {
    try {
      const { title, url } = req.body;
      const imageData = await Image.create({
        title: title,
        url: url,
      })
      const { titlevideo, text } = req.body;
      const videoData = await Video.create({
        title: titlevideo,
        text: text,
      })
      const { imageTitle, imageCommentableType } = req.body;
      const { videoTitle, videoCommentableType } = req.body;
      if (imageData.id && videoData.id) {
        await Comment.create({
          title: videoTitle,
          commentableId: imageData.id,
          commentableType: videoCommentableType,
        });
        await Comment.create({
          title: imageTitle,
          commentableId: imageData.id,
          commentableType: imageCommentableType,
        })
      }
      res.status(200).send({ imageData });
    } catch (error) {
      console.log("In catch block");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany2: async (req, res) => {
    try {
      const { title, url } = req.body;
      const imageData = await Image.create({
        title: title,
        url: url,
      })
      const { titlevideo, text } = req.body;
      const videoData = await Video.create({
        title: titlevideo,
        text: text,
      })
      const { imageTitle, imageCommentableType } = req.body;
      const { videoTitle, videoCommentableType } = req.body;
      if (imageData && imageData.id) {
        await Comment.create({
          title: imageTitle,
          commentableId: imageData.id,
          commentableType: imageCommentableType,
        })
      }
      if (videoData && videoData.id) {
        await Comment.create({
          title: videoTitle,
          commentableId: imageData.id,
          commentableType: videoCommentableType,

        })
      }
      res.status(200).send({ imageData });
    } catch (error) {
      console.log("In catch block");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany3: async (req, res) => {
    try {
      // const { title, url } = req.body;
      // const imageData = await Image.create({
      //   title: title,
      //   url: url,
      // })
      const imageData = {};
      const { titlevideo, text } = req.body;
      const videoData = await Video.create({
        title: titlevideo,
        text: text,
      })
      const { imageTitle, imageCommentableType } = req.body;
      const { videoTitle, videoCommentableType } = req.body;
      if (imageData && imageData.id) {
        await Comment.create({
          title: imageTitle,
          commentableId: imageData.id,
          commentableType: imageCommentableType,
        })
      }
      if (videoData && videoData.id) {
        await Comment.create({
          title: videoTitle,
          commentableId: imageData.id,
          commentableType: videoCommentableType,

        })
      }
      res.status(200).send({ videoData });
    } catch (error) {
      console.log("In catch block");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany4: async (req, res) => {
    try {
      const data = await Image.findAll({
        include: [{
          model: Comment,
        }],
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany5: async (req, res) => {
    try {
      const data = await Video.findAll({
        include: [{
          model: Comment,
        }],
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany6: async (req, res) => {
    try {
      const data = await Comment.findAll({
        include: [{
          model: Image,
        }],
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  polyOneTwoMany7: async (req, res) => {
    try {
      const data = await Comment.findAll({
        include: [{
          model: Video,
        }],
      })
      res.status(200).send({ data });
    } catch (error) {
      console.log("In catch block");
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },
}

