import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  await prisma.permission.createMany({
    data: [
      {
        permissionLevel: 0,
        permissionName: 'user'
      },
      {
        permissionLevel: 1,
        permissionName: 'func1'
      },
      {
        permissionLevel: 2,
        permissionName: 'manager'
      },
      {
        permissionLevel: 3,
        permissionName: 'ceo'
      },
      {
        permissionLevel: 5,
        permissionName: 'PO'
      },
      {
        permissionLevel: 6,
        permissionName: 'dev'
      },
    ]
  })
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })