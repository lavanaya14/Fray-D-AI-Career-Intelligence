// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function LiveJobs() {
//   const { id } = useParams();

//   const [jobs, setJobs] = useState([]);
//   const [role, setRole] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [otherRoles, setOtherRoles] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loadingMore, setLoadingMore] = useState(false);

//   // 🔥 FETCH JOBS
//   const fetchJobs = async (pageNo, roleValue) => {
//     try {
//       setLoadingMore(true);

//       const res = await axios.get(
//         `http://127.0.0.1:8000/resume/jobs/${id}?role=${roleValue}&page=${pageNo}`
//       );

//       if (pageNo === 1) {
//         setJobs(res.data.jobs || []);
//       } else {
//         setJobs((prev) => [...prev, ...(res.data.jobs || [])]);
//       }

//       setRole(roleValue || "");
//       setOtherRoles(res.data.other_roles || []);
//       setLoading(false);
//       setLoadingMore(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // 🔥 INITIAL LOAD
//   useEffect(() => {
//     setJobs([]);
//     setPage(1);
//     fetchJobs(1, selectedRole || "");
//   }, [id, selectedRole]);

//   // 🔥 INFINITE SCROLL
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 100
//       ) {
//         if (!loadingMore) {
//           const nextPage = page + 1;
//           setPage(nextPage);
//           fetchJobs(nextPage, selectedRole);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [page, loadingMore, selectedRole]);

//   if (loading) {
//     return <h2 style={{ textAlign: "center" }}>Loading Jobs...</h2>;
//   }

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h1>💼 Live Job Openings</h1>

//         <h3>
//           Recommended Role:{" "}
//           <span style={{ color: "#2563eb" }}>
//             {role || "Software Developer"}
//           </span>
//         </h3>

//         {/* 🔥 OTHER ROLES */}
//         <div style={{ marginBottom: "20px" }}>
//           <h4>Other Suitable Roles:</h4>

//           {otherRoles.map((r, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setSelectedRole(r);
//                 setPage(1);
//                 setJobs([]);
//                 fetchJobs(1, r);
//               }}
//               style={{
//                 margin: "5px",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 cursor: "pointer",
//               }}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         {/* 🔥 JOB LIST */}
//         {jobs.length === 0 ? (
//           <p>No jobs found.</p>
//         ) : (
//           jobs.map((job, index) => (
//             <div key={index} style={styles.jobCard}>
//               <h2>{job.title}</h2>
//               <p>
//                 <strong>Company:</strong> {job.company}
//               </p>
//               <p>
//                 <strong>Location:</strong> {job.location}
//               </p>
//               <p>
//                 <strong>Salary:</strong> {job.salary}
//               </p>

//               <a
//                 href={job.apply_link}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={styles.button}
//               >
//                 Apply Now
//               </a>
//             </div>
//           ))
//         )}

//         {loadingMore && (
//           <p style={{ textAlign: "center" }}>Loading more jobs...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "40px",
//     background: "#f8fafc",
//     minHeight: "100vh",
//   },
//   card: {
//     width: "1000px",
//     background: "#fff",
//     padding: "35px",
//     borderRadius: "20px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   },
//   jobCard: {
//     marginTop: "20px",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#eff6ff",
//   },
//   button: {
//     display: "inline-block",
//     marginTop: "10px",
//     padding: "10px 18px",
//     background: "#2563eb",
//     color: "#fff",
//     borderRadius: "8px",
//     textDecoration: "none",
//   },
// };

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function LiveJobs() {
//   const { id } = useParams();

//   const [jobs, setJobs] = useState([]);
//   const [role, setRole] = useState("");
//   const [otherRoles, setOtherRoles] = useState([
//     "React Developer",
//     "Backend Developer",
//     "Cloud Developer",
//     "DevOps Engineer",
//     "Full Stack Developer"
//   ]);

//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const fetchJobs = async (pageNo, selectedRole = role) => {
//     setLoadingMore(true);

//     const res = await axios.get(
//       `http://127.0.0.1:8000/resume/jobs/${id}?role=${selectedRole}&page=${pageNo}`
//     );

//     if (pageNo === 1) {
//       setJobs(res.data.jobs);
//     } else {
//       setJobs(prev => [...prev, ...res.data.jobs]);
//     }

//     setRole(res.data.recommended_role || "Software Developer");
//     setLoading(false);
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     setJobs([]);
//     setPage(1);
//     fetchJobs(1, role);
//   }, [id]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 100
//       ) {
//         if (!loadingMore) {
//           const next = page + 1;
//           setPage(next);
//           fetchJobs(next, role);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [page, role, loadingMore]);

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <h2>💼 Live Jobs</h2>

//       <h3>
//         Recommended Role: {role || "Software Developer"}
//       </h3>

//       {/* ROLES */}
//       <div>
//         {otherRoles.map((r, i) => (
//           <button
//             key={i}
//             onClick={() => {
//               setRole(r);
//               setJobs([]);
//               setPage(1);
//               fetchJobs(1, r);
//             }}
//           >
//             {r}
//           </button>
//         ))}
//       </div>

//       {/* JOBS */}
//       {jobs.map((job, i) => (
//         <div key={i}>
//           <h3>{job.title}</h3>
//           <p>{job.company}</p>
//           <p>{job.location}</p>
//         </div>
//       ))}

//       {loadingMore && <p>Loading more...</p>}
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "40px",
//     background: "#f8fafc",
//     minHeight: "100vh",
//   },
//   card: {
//     width: "1000px",
//     background: "#fff",
//     padding: "35px",
//     borderRadius: "20px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   },
//   jobCard: {
//     marginTop: "20px",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#eff6ff",
//   },
//   button: {
//     display: "inline-block",
//     marginTop: "10px",
//     padding: "10px 18px",
//     background: "#2563eb",
//     color: "#fff",
//     borderRadius: "8px",
//     textDecoration: "none",
//   },
// };

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function LiveJobs() {
//   const { id } = useParams();

//   const [jobs, setJobs] = useState([]);
//   const [role, setRole] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [otherRoles, setOtherRoles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const fetchJobs = async (pageNo, roleValue) => {
//     try {
//       const safeRole = roleValue || "Software Developer";

//       const res = await axios.get(
//         `http://127.0.0.1:8000/resume/jobs/${id}?role=${encodeURIComponent(
//           safeRole,
//         )}&page=${pageNo}`,
//       );

//       if (pageNo === 1) {
//         setJobs(res.data.jobs || []);
//       } else {
//         setJobs((prev) => [...prev, ...(res.data.jobs || [])]);
//       }

//       setRole(res.data.recommended_role || safeRole);
//       setOtherRoles(res.data.other_roles || []);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setJobs([]);
//     setPage(1);
//     fetchJobs(1, selectedRole);
//   }, [id, selectedRole]);

//   if (loading) return <h2>Loading Jobs...</h2>;

//   return (
//     <div style={{ padding: "30px", background: "#f8fafc" }}>
//       <h1>💼 Live Job Openings</h1>

//       <h3>Recommended Role: {role}</h3>

//       {/* OTHER ROLES */}
//       <div>
//         <h4>Other Roles</h4>

//         {otherRoles.map((r, i) => (
//           <button
//             key={i}
//             onClick={() => {
//               const safeRole = r || "Software Developer";
//               setSelectedRole(safeRole);
//               setJobs([]);
//               setPage(1);
//               fetchJobs(1, safeRole);
//             }}
//             style={{
//               margin: "5px",
//               padding: "8px 12px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//             }}
//           >
//             {r}
//           </button>
//         ))}
//       </div>

//       {/* JOB LIST */}
//       {jobs.length === 0 ? (
//         <p>No jobs found</p>
//       ) : (
//         jobs.map((job, i) => (
//           <div
//             key={i}
//             style={{
//               marginTop: "20px",
//               padding: "20px",
//               background: "#fff",
//               borderRadius: "10px",
//               border: "1px solid #eee",
//             }}
//           >
//             <h2>{job.title}</h2>
//             <p>{job.company}</p>
//             <p>{job.location}</p>

//             <a
//               href={job.apply_link}
//               target="_blank"
//               rel="noreferrer"
//               style={{
//                 display: "inline-block",
//                 marginTop: "10px",
//                 padding: "10px 15px",
//                 background: "#2563eb",
//                 color: "white",
//                 borderRadius: "6px",
//                 textDecoration: "none",
//               }}
//             >
//               Apply Now
//             </a>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "40px",
//     background: "#f8fafc",
//     minHeight: "100vh",
//   },
//   card: {
//     width: "1000px",
//     background: "#fff",
//     padding: "35px",
//     borderRadius: "20px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   },
//   jobCard: {
//     marginTop: "20px",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#eff6ff",
//   },
//   button: {
//     display: "inline-block",
//     marginTop: "10px",
//     padding: "10px 18px",
//     background: "#2563eb",
//     color: "#fff",
//     borderRadius: "8px",
//     textDecoration: "none",
//   },
// };

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function LiveJobs() {
  const { id } = useParams();

  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("Software Developer");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRoles, setOtherRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (pageNo, roleValue) => {
    try {
      const safeRole = roleValue || "Software Developer";

      const res = await axios.get(
        `http://127.0.0.1:8000/resume/jobs/${id}?role=${encodeURIComponent(
          safeRole,
        )}&page=${pageNo}`,
      );

      const newJobs = res.data.jobs || [];

      if (pageNo === 1) {
        setJobs(newJobs);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }

      setRole(res.data.recommended_role || safeRole);
      setOtherRoles(res.data.other_roles || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setJobs([]);
    setPage(1);

    fetchJobs(1, selectedRole);
  }, [id, selectedRole]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading Jobs...</h2>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>💼 Live Job Openings</h1>

        <h3 style={styles.role}>Recommended Role: {selectedRole || role}</h3>

        {/* Roles */}

        <div style={styles.rolesSection}>
          {otherRoles.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedRole(r);
              }}
              style={styles.roleButton}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Jobs */}

        {jobs.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No Jobs Found</h3>
        ) : (
          jobs.map((job, i) => (
            <div key={i} style={styles.jobCard}>
              <h2>{job.title}</h2>

              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
                style={styles.applyButton}
              >
                Apply Job
              </a>
            </div>
          ))
        )}

        {/* LOAD MORE */}

        {jobs.length > 0 && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                const nextPage = page + 1;

                setPage(nextPage);

                fetchJobs(nextPage, selectedRole || role);
              }}
              style={styles.loadMore}
            >
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
 
  wrapper: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px 30px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "1400px",
    padding: "40px",
    boxSizing: "border-box",

    borderRadius: "30px",

    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",

    border: "1px solid rgba(255,255,255,0.08)",

    color: "white",

    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },

  loading: {
    textAlign: "center",
    marginTop: "100px",
  },

  // title: {
  //   textAlign: "center",
  //   marginBottom: "10px",
  // },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#fff",
    fontSize: "42px",
  },

  role: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "30px",
  },

  rolesSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "30px",
    justifyContent: "center",
  },

  roleButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    // background: "#dbeafe",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    fontWeight: "600",
  },

  jobCard: {
    marginTop: "20px",

    background: "rgba(255,255,255,0.05)",

    border: "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(20px)",

    borderRadius: "20px",

    padding: "25px",

    color: "#fff",

    transition: "0.3s",
  },

  // jobCard: {
  //   marginTop: "20px",
  //   padding: "24px",
  //   background: "#ffffffa9",
  //   borderRadius: "16px",
  //   boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  // },

  applyButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "12px 20px",
    // background: "#2563eb",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "700",
  },

  loadMore: {
    marginTop: "30px",
    padding: "14px 24px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};
