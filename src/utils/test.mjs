import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const user = await db.user.create({
  data: {
    fullName: 'new user3',
    company: 'Adeeva N',
    username: 'Rockey Boy',
    country: 'Canada',
    contact: '123456789',
    email: 'rockeyboy@getnada.com',
    status: 'Active'
  }
})

console.log('created', user)

const data = await db.user.findMany()
