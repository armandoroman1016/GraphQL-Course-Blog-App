const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// console.log(prisma)

async function main() {
//   await prisma.user.create({
//     data: {
//       name: "Alice",
//       email: "alice@prisma.io",
//       posts: {
//         create: {
//           title: "Hello World",
//         },
//       },
//       profile: {
//         create: {
//           bio: "I like turtles",
//         },
//       },
//     },
//   });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, {
    depth: null,
  });

  const updated = await prisma.post.update({
      where: {
          id: 1
      },
      data: {
          published: true
      }
  })

  console.log(updated)
}

main()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
