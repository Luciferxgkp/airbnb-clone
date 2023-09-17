import prisma from '@/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoritesIds || [])],
        },
      },
    });

    return favorites;
  } catch (error) {
    throw new Error(error);
  }
}