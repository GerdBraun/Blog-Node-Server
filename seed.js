import { sequelize, User, Post, Category,BridgePostCategory } from "./db/index.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = [
    {
      firstName: "Gerd",
      lastName: "Braun",
      email: "webmaster@your-d-sign.de",
      password: "Start$2017",
      avatar: "https://i.pravatar.cc/150?img=11",
      isAdmin: true,
    },
    {
      firstName: "Arlo",
      lastName: "Doyle",
      email: "Alana94@hotmail.com",
      password: "12345678",
      avatar: "https://i.pravatar.cc/150?img=6",
      isAdmin: false,
    },
    {
      firstName: "Lynn",
      lastName: "Smitham",
      email: "Emerson62@hotmail.com",
      password: "12345678",
      avatar: "https://i.pravatar.cc/150?img=2",
      isAdmin: true,
    },
    {
      firstName: "Demetrius",
      lastName: "Hills",
      email: "Anna.Mante65@hotmail.com",
      password: "12345678",
      avatar: "https://i.pravatar.cc/150?img=4",
      isAdmin: false,
    },
  ];

  const posts = [
    {
      title: "title",
      author: "author 1",
      authorId: 1,
      content: "content",
      cover:
        "https://www.your-d-sign.de/files/yds/images/learntec/Preisverleihung_04.jpg",
    },
    {
      title: "title",
      author: "author 2",
      authorId: 2,
      content: "content",
      cover:
        "https://www.your-d-sign.de/files/yds/images/learntec/Preisverleihung_12.jpg",
    },
    {
      title: "title",
      author: "author 1",
      authorId: 1,
      content: "content",
      cover: "https://placehold.co/800x450",
    },
    {
      title: "title",
      author: "author 3",
      authorId: 3,
      content: "content",
      cover: "https://placehold.co/800x450",
    },
    {
      title: "title",
      author: "author 2",
      authorId: 2,
      content: "content",
      cover: "https://placehold.co/800x450",
      Post:[1,2]
    },
  ];
  const categories = [
    {
      label: "Category 1",
      description: "this category has a nice description",
      authorId: 1,
    },
    {
      label: "Category 2",
      authorId: 2,
    },
    {
      label: "Category 3",
      authorId: 3,
    },
    {
      label: "Category 4",
      authorId: 1,
    },
    {
      label: "Category 5",
      authorId: 2,
    },
  ];

  const bridgePostsCategories = [
    {
      PostId:1,
      CategoryId:1,
    },
    {
      PostId:1,
      CategoryId:2,
    },
    {
      PostId:2,
      CategoryId:3,
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
  await Post.bulkCreate(posts, { individualHooks: true });
  await Category.bulkCreate(categories, { individualHooks: true });
  await BridgePostCategory.bulkCreate(bridgePostsCategories, { individualHooks: true });
};

try {
  await seedDB();
  console.log("Database seeded");
} catch (error) {
  console.error({ error });
} finally {
  sequelize.close();
  console.log("Database connection closed");
}
