import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../Courses/People/Table"; // Ensure correct import path
import * as client from "./client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const fetchedUsers = await client.findAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to filter users by name
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      setLoading(true);
      setError("");
      try {
        const filteredUsers = await client.findUsersByPartialName(name);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error filtering users by name:", error);
        setError("Failed to filter users by name.");
      } finally {
        setLoading(false);
      }
    } else {
      fetchUsers(); // Reload all users if no name is provided
    }
  };

  // Function to filter users by role
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    setLoading(true);
    setError("");
    try {
      if (role) {
        const filteredUsers = await client.findUsersByRole(role);
        setUsers(filteredUsers);
      } else {
        fetchUsers(); // Reload all users if no role is selected
      }
    } catch (error) {
      console.error("Error filtering users by role:", error);
      setError("Failed to filter users by role.");
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new user
  const createUser = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers((prevUsers) => [...prevUsers, user]);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create new user.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // No need for `uid` dependency unless it's required for filtering users

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <FormControl 
        onChange={(e) => filterUsersByName(e.target.value)} 
        placeholder="Search people" 
        className="float-start w-25 me-2 wd-filter-by-name" 
      />
      
      <select 
        value={role} 
        onChange={(e) => filterUsersByRole(e.target.value)} 
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} />
    </div>
  );
}
