import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl, Button } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    console.log("currentUser debug: ", currentUser);
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
            Update
          </button>
          <FormControl defaultValue={profile.username} className="mb-2" onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl defaultValue={profile.password} className="mb-2" onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl defaultValue={profile.firstName} className="mb-2" onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <FormControl defaultValue={profile.lastName} className="mb-2" onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <FormControl defaultValue={profile.dob} type="date" className="mb-2" onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <FormControl defaultValue={profile.email} className="mb-2" onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select className="form-control mb-2" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}