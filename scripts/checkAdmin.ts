import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log("No users found. Creating an admin user...");
    
    // Check if admin role exists
    let role = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
    if (!role) {
      role = await prisma.role.create({
        data: { name: 'ADMIN', description: 'Administrator' }
      });
    }

    const passwordHash = await bcrypt.hash('admin@123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@sspc.edu.in',
        passwordHash,
        active: true,
        roleId: role.id
      }
    });
    console.log("Admin created:", admin.email, "Password: admin@123");
  } else {
    console.log("Users exist in DB:");
    users.forEach(u => console.log(`Email: ${u.email}, Active: ${u.active}, Deleted: ${u.deletedAt !== null}`));
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
