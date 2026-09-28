import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@sowdambikapolytechnic.com';
  
  // Hash with a known-good method
  const newPassword = 'sspc@admin2026';
  const passwordHash = await bcrypt.hash(newPassword, 12);
  
  await prisma.user.update({
    where: { email },
    data: { 
      passwordHash,
      active: true,
      deletedAt: null
    }
  });
  
  // Verify it works
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log('ERROR: user not found!');
    return;
  }
  const valid = await bcrypt.compare(newPassword, user.passwordHash);
  console.log(`Password reset successful: ${valid}`);
  console.log(`Login with: ${email} / ${newPassword}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
