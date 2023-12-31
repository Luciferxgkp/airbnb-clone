'use client';
import Avatar from '@/components/avatar';
import MenuItem from '@/components/navbar/menu-item';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useRentModal from '@/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const UserMenu = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div
      className="
    relative
    "
    >
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
             md:block
                text-sm
                font-semibold
                px-4
                py-3
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
             "
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleMenu}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                absolute
                top-12
                right-0
                w-[40vw]
                md:w-3/4
                bg-white
                shadow-md
                rounded-xl
                overflow-hidden
                z-10
                text-sm
            "
        >
          <div
            className="
                    flex
                    flex-col
                    cursor-pointer
                "
          >
            {currentUser ? (
              <>
                <MenuItem
                  label="My Trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My Favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My Reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My Properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Log Out" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Log In" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
