"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction =  (e) => {
    const serialized = { ... e};
    if(e.balance){
        serialized.balance = e.balance.toNumber();
    } 
}

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const balanceFloat = parseFloat(data.balance);
    if(NaN(balanceFloat)){
        throw new Error("Balance amount is invalid");
    }

    // If user's first amount
    const existingAccounts = await db.account.findMany({
        where: {
            userId: user.id,
        }
    });

    //if an account is default then we make other accounts not default as only one account can be default 
    const shouldBeDefault = existingAccounts.length == 0 ? true : data.isDefault;
    if(shouldBeDefault){
        await db.account.updateMany({
            where: {userId: user.id, isDefault: true},
            data: {isDefault: false}
        })
    }
    
    const account = await db.account.create({
        data: {
            ...data,
            balance: balanceFloat,
            userId: user.id,
            isDefault: shouldBeDefault,
        },
    });

    const serializeAccount = serializeTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, data: serializeAccount};

  } catch (error) {
    throw new Error(error.message);
  }
}
