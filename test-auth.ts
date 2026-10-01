import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function testAuth() {
  const email = "admin@sowdambikapolytechnic.com";
  const password = "sspc@admin2026";
  
  console.log(`Testing auth for ${email}...`);
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      console.log("User not found!");
      return;
    }
    
    console.log("User found:", { id: user.id, active: user.active, deletedAt: user.deletedAt });
    
    if (!user.active || user.deletedAt) {
      console.log("User is inactive or deleted.");
      return;
    }
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log("Password valid:", valid);
  } catch (error) {
    console.error("Error connecting to DB:", error);
  } finally {
    await db.$disconnect();
  }
}

testAuth();
