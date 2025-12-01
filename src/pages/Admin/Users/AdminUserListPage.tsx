import { useEffect, useState } from "react";
import { getAllUsers, updateUserRoles, deleteUser } from "../../../services/adminUserService";
import type { AdminUserResponseDto, UpdateUserRolesRequestDto } from "../../../types/admin";

export default function AdminUserListPage() {
  const [users, setUsers] = useState<AdminUserResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(function () {
    setLoading(true);
    setErrorMessage(null);

    getAllUsers()
      .then(function (fetchedUsers) {
        setUsers(fetchedUsers);
      })
      .catch(function () {
        setErrorMessage("Could not load users.");
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  function saveUserRoles(userId: number, updatedRoles: string[]) {
    const payload: UpdateUserRolesRequestDto = {
      roles: updatedRoles
    };

    updateUserRoles(userId, payload)
      .then(function (updatedUser) {
        const newUserList = [];
        for (let index = 0; index < users.length; index++) {
          const existingUser = users[index];
          if (existingUser.id === userId) {
            newUserList.push(updatedUser);
          } else {
            newUserList.push(existingUser);
          }
        }
        setUsers(newUserList);
      })
      .catch(function () {
        setErrorMessage("Could not update roles.");
      });
  }

  function removeUser(userId: number) {
    deleteUser(userId)
      .then(function () {
        const remainingUsers = [];
        for (let index = 0; index < users.length; index++) {
          const existingUser = users[index];
          if (existingUser.id !== userId) {
            remainingUsers.push(existingUser);
          }
        }
        setUsers(remainingUsers);
      })
      .catch(function () {
        setErrorMessage("Could not delete user.");
      });
  }

  if (loading === true) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  if (errorMessage !== null) {
    return (
      <p className="text-center mt-10 text-red-600">{errorMessage}</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Manage Users</h1>

      {users.map(function (user) {
        const hasPatient = user.roles.includes("PATIENT");
        const hasStaff = user.roles.includes("STAFF");
        const hasAdmin = user.roles.includes("ADMIN");

        function togglePatient() {
          let updated = user.roles.slice();

          if (hasPatient === false) {
            updated.push("PATIENT");
          } else {
            updated = updated.filter(function (roleName) {
              return roleName !== "PATIENT";
            });
          }

          saveUserRoles(user.id, updated);
        }

        function toggleStaff() {
          let updated = user.roles.slice();

          if (hasStaff === false) {
            updated.push("STAFF");
          } else {
            updated = updated.filter(function (roleName) {
              return roleName !== "STAFF";
            });
          }

          saveUserRoles(user.id, updated);
        }

        function toggleAdmin() {
          let updated = user.roles.slice();

          if (hasAdmin === false) {
            updated.push("ADMIN");
          } else {
            updated = updated.filter(function (roleName) {
              return roleName !== "ADMIN";
            });
          }

          saveUserRoles(user.id, updated);
        }

        return (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-6 mb-6 border-l-4 border-primary"
          >
            <p className="font-semibold text-gray-700">
            {user.firstName} {user.lastName}
            </p>

            <p className="text-gray-700 mb-4">
            {user.email}
            </p>


            <div className="space-y-2 mb-4">

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasPatient}
                  onChange={togglePatient}
                />
                <span>PATIENT</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasStaff}
                  onChange={toggleStaff}
                />
                <span>STAFF</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasAdmin}
                  onChange={toggleAdmin}
                />
                <span>ADMIN</span>
              </label>

            </div>

            <button
              onClick={function () {
                removeUser(user.id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}