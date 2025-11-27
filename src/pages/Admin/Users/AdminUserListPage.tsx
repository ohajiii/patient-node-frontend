import { useEffect } from "react";
import useAdminUsers from "../../../hooks/useAdminUsers";

export default function AdminUserListPage() {
  const admin = useAdminUsers();

  useEffect(function () {
    admin.fetchUsers();
  }, []);

  if (admin.isLoading === true) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  if (admin.errorMessage !== null) {
    return (
      <p className="text-center mt-10 text-red-600">{admin.errorMessage}</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Manage Users</h1>

      {admin.users.map(function (user) {
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

          admin.saveUserRoles(user.id, updated);
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

          admin.saveUserRoles(user.id, updated);
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

          admin.saveUserRoles(user.id, updated);
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
                admin.removeUser(user.id);
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