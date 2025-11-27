import { useState } from "react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser
} from "../services/adminUserService";

import type {
  AdminUserResponseDto,
  UpdateUserRolesRequestDto
} from "../types/admin";

function useAdminUsers() {
  const [users, setUsers] = useState<AdminUserResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fetchUsers() {
    setIsLoading(true);
    setErrorMessage(null);

    getAllUsers()
      .then(function (fetchedUsers) {
        setUsers(fetchedUsers);
      })
      .catch(function () {
        setErrorMessage("Could not load users.");
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  function saveUserRoles(userId: number, updatedRoles: string[]) {
    const payload: UpdateUserRolesRequestDto = {
      roles: updatedRoles
    };

    updateUserRoles(userId, payload)
      .then(function (updatedUser) {
        const newUserList = users.map(function (existingUser) {
          if (existingUser.id === userId) {
            return updatedUser;
          }
          return existingUser;
        });

        setUsers(newUserList);
      })
      .catch(function () {
        setErrorMessage("Could not update roles.");
      });
  }

  function removeUser(userId: number) {
    deleteUser(userId)
      .then(function () {
        const remainingUsers = users.filter(function (existingUser) {
          return existingUser.id !== userId;
        });
        setUsers(remainingUsers);
      })
      .catch(function () {
        setErrorMessage("Could not delete user.");
      });
  }

  return {
    users,
    isLoading,
    errorMessage,
    fetchUsers,
    saveUserRoles,
    removeUser
  };
}

export default useAdminUsers;