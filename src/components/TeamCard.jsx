// import React, { useState, useEffect } from "react";
// import "./TeamCard.css";
// import axios from "../utils/axiosInstance";
// import toast from "react-hot-toast";
// import events from "../store/events.js";
// import Teamcardbg from "../backgrounds/team_card.jsx";

// const TeamCard = ({ team, onTeamDelete, onMemberUpdate, user }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [members, setMembers] = useState(team.members);
//   const eventName = events.find(
//     (event) => event.id === team.event.eventId
//   ).name;

//   const isLeader = team.teamLeader === user._id;
//   useEffect(() => {}, [team.teamLeader]);

//   const handleDeleteTeam = async () => {
//     const ans = window.confirm("Do you want to delete the team?");
//     if (!ans) {
//       return;
//     }
//     setIsProcessing(true);
//     await axios.delete("/team", {
//       data: { teamCode: team.teamCode },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     onTeamDelete(team.teamCode);
//     toast.success("Team deleted successfully.");
//     setIsProcessing(false);
//   };

//   const handleChangeLeader = async (newLeaderId) => {
//     setIsProcessing(true);
//     await axios.patch(
//       "/team/changeLeader",
//       {
//         teamCode: team.teamCode,
//         newLeader: newLeaderId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     toast.success("Leader changed successfully.");
//     team.teamLeader = newLeaderId;
//     setIsProcessing(false);
//   };

//   const handleLeaveTeam = async (memberId) => {
//     //leave team logic
//     return;
//   };
//   const handleRemoveMember = async (memberId) => {
//     const ans = window.confirm("Do you want to delete this member?");
//     if (!ans) {
//       return;
//     }
//     setIsProcessing(true);
//     await axios.delete("/member", {
//       data: { userId: memberId, teamId: team._id },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const updatedMembers = members.filter(
//       (member) => member.user._id !== memberId
//     );
//     setMembers(updatedMembers);
//     onMemberUpdate(team.teamCode, updatedMembers);
//     toast.success("Member removed successfully.");
//     setIsProcessing(false);
//   };

//   return (
//     <>
//       <div className="team-card" id={team.teamName}>
//         <Teamcardbg />
//         {/* {isLeader && ( */}
//         <div className="team-card">
//           {/* )} */}
//           <h3 className="team-name">{team.teamName}</h3>
//           <p className="text-center">
//             Event: <span className="font-bold">{eventName}</span>{" "}
//           </p>
//           <p className="text-center">
//             Code: <span className="highlight">{team.teamCode}</span>
//           </p>
//           {team.event.maxMembers - members.length && (
//             <p className="text-center">
//               Space Remaining:{" "}
//               <span className="highlight">
//                 {team.event.maxMembers - members.length}
//               </span>
//             </p>
//           )}

//           <div>
//             {members.length === 1 ? (
//               <p className="mt-5">Invite members by sharing code!!</p>
//             ) : (
//               <ul className="member-list ">
//                 <h5 className="font-bold">Members:</h5>
//                 {members.map((member) => (
//                   <li
//                     key={member.user._id}
//                     className="member-item text-white flex justify-between items-center"
//                   >
//                     <div className="flex items-center space-x-2">
//                       {member.user.name}
//                       {member.user._id === team.teamLeader && (
//                         <span className="ml-1 text-xs">(L)</span>
//                       )}
//                     </div>

//                     {isLeader && member.user._id !== user._id && (
//                       <button
//                         className="remove-member-button text-xl ml-2 flex items-center justify-center text-red-600"
//                         onClick={() => handleRemoveMember(member.user._id)}
//                       >
//                         x
//                       </button>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* {isLeader && (
//         <> */}
//           {team.teamLeader === user._id && (
//             <>
//               <button
//                 className="delete-team-button ml-7"
//                 disabled={isProcessing}
//               >
//                 <img src="/leadercard.png"></img>
//               </button>
//               <select
//                 className="change-leader-dropdown"
//                 onChange={(e) => handleChangeLeader(e.target.value)}
//                 disabled={isProcessing}
//               >
//                 <option value="">--Select Member--</option>
//                 {members.map((member) => {
//                   if (
//                     member.user._id === user._id ||
//                     member.user._id === team.teamLeader
//                   )
//                     return;
//                   return (
//                     <option key={member.user._id} value={member.user._id}>
//                       {member.user.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </>
//           )}
//           {team.teamLeader === user._id && (
//             <button
//               className="leave-team-button ml-7"
//               onClick={handleLeaveTeam}
//               disabled={isProcessing}
//             >
//               <img src="/leavecard.png"></img>
//             </button>
//           )}
//           {team.teamLeader === user._id && (
//             <button
//               className="delete-team-button ml-7"
//               onClick={handleDeleteTeam}
//               disabled={isProcessing}
//             >
//               <img src="/deletecard.png"></img>
//             </button>
//           )}
//           {message && <p className="error-message">{message}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeamCard;
import React, { useState, useEffect } from "react";
import "./TeamCard.css";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import events from "../store/events.js";
import Teamcardbg from "../backgrounds/team_card.jsx";

const TeamCard = ({ team, onTeamDelete, onMemberUpdate, user }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState(team.members);
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);
  const [selectedNewLeader, setSelectedNewLeader] = useState("");

  const eventName = events.find(
    (event) => event.id === team.event.eventId
  ).name;

  const isLeader = team.teamLeader === user._id;
  useEffect(() => {}, [team.teamLeader]);

  const handleDeleteTeam = async () => {
    const ans = window.confirm("Do you want to delete the team?");
    if (!ans) {
      return;
    }
    setIsProcessing(true);
    await axios.delete("/team", {
      data: { teamCode: team.teamCode },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    onTeamDelete(team.teamCode);
    toast.success("Team deleted successfully.");
    setIsProcessing(false);
  };

  const handleChangeLeader = async () => {
    if (!selectedNewLeader) {
      toast.error("Please select a new leader");
      return;
    }

    setIsProcessing(true);
    try {
      await axios.patch(
        "/team/changeLeader",
        {
          teamCode: team.teamCode,
          newLeader: selectedNewLeader,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Leader changed successfully.");
      team.teamLeader = selectedNewLeader;
      setIsChangeLeaderModalOpen(false);
    } catch (error) {
      toast.error("Failed to change leader");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeaveTeam = async (memberId) => {
    //leave team logic
    return;
  };

  const handleRemoveMember = async (memberId) => {
    const ans = window.confirm("Do you want to delete this member?");
    if (!ans) {
      return;
    }
    setIsProcessing(true);
    await axios.delete("/member", {
      data: { userId: memberId, teamId: team._id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const updatedMembers = members.filter(
      (member) => member.user._id !== memberId
    );
    setMembers(updatedMembers);
    onMemberUpdate(team.teamCode, updatedMembers);
    toast.success("Member removed successfully.");
    setIsProcessing(false);
  };

  return (
    <>
      {/* Change Leader Modal */}
      {isChangeLeaderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Change Team Leader</h2>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedNewLeader}
              onChange={(e) => setSelectedNewLeader(e.target.value)}
            >
              <option value="">Select New Leader</option>
              {members.map((member) => {
                // Exclude current leader and current user from selection
                if (
                  member.user._id !== user._id &&
                  member.user._id !== team.teamLeader
                ) {
                  return (
                    <option key={member.user._id} value={member.user._id}>
                      {member.user.name}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsChangeLeaderModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeLeader}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!selectedNewLeader || isProcessing}
              >
                Change Leader
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="team-card" id={team.teamName}>
        <Teamcardbg />
        <div className="team-card">
          <h3 className="team-name">{team.teamName}</h3>
          <p className="text-center">
            Event: <span className="font-bold">{eventName}</span>{" "}
          </p>
          <p className="text-center">
            Code: <span className="highlight">{team.teamCode}</span>
          </p>
          {team.event.maxMembers - members.length && (
            <p className="text-center">
              Space Remaining:{" "}
              <span className="highlight">
                {team.event.maxMembers - members.length}
              </span>
            </p>
          )}

          <div>
            {members.length === 1 ? (
              <p className="mt-5">Invite members by sharing code!!</p>
            ) : (
              <ul className="member-list ">
                <h5 className="font-bold">Members:</h5>
                {members.map((member) => (
                  <li
                    key={member.user._id}
                    className="member-item text-white flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      {member.user.name}
                      {member.user._id === team.teamLeader && (
                        <span className="ml-1 text-xs">(L)</span>
                      )}
                    </div>

                    {isLeader && member.user._id !== user._id && (
                      <button
                        className="remove-member-button text-xl ml-2 flex items-center justify-center text-red-600"
                        onClick={() => handleRemoveMember(member.user._id)}
                      >
                        x
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bottom-4">
            {team.teamLeader === user._id ? (
              <>
                <button
                  className="delete-team-button ml-7"
                  onClick={() => setIsChangeLeaderModalOpen(true)}
                  disabled={isProcessing}
                >
                  <img src="/leadercard.png" alt="Change Leader" />
                </button>

                <button
                  className="delete-team-button ml-7"
                  onClick={handleDeleteTeam}
                  disabled={isProcessing}
                >
                  <img src="/deletecard.png" alt="Delete Team" />
                </button>
              </>
            ) : (
              <button
                className="leave-team-button ml-7"
                onClick={handleLeaveTeam}
                disabled={isProcessing}
              >
                <img src="/leavecard.png" alt="Leave Team" />
              </button>
            )}
          </div>

          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default TeamCard;