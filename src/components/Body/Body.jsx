// import React, { useEffect, useRef, useState } from "react";
// import ReactToPrint from "react-to-print"; // Print React components in the browser
// import { ArrowDown } from "react-feather"; //collection of simply beautiful open source icons
// import styles from "./Body.module.css";
// import Editor from "../Editor/Editor";
// import Resume from "../Resume/Resume";

// const MakeResume = () => {
//   //multiple color options
//   const colors = ["#0bc5ea", "#000000FF"];
//   const [activeColor, setActiveColor] = useState(colors[1]);
//   const resumeRef = useRef();
//   const sections = {
//     basicInfo: "Basic Info",
//     workExp: "Work Experience",
//     project: "Projects",
//     education: "Education",
//     achievement: "Achievements",
//     summary: "Summary",
//     other: "Other",
//   };

//   const [resumeInformation, setResumeInformation] = useState({
//     [sections.basicInfo]: {
//       id: sections.basicInfo, 
//       sectionTitle: sections.basicInfo,
//       detail: {}, //detail is a object as we can have multiple user details e.g. phone no. address
//     },
//     [sections.workExp]: {
//       id: sections.workExp,
//       sectionTitle: sections.workExp,
//       details: [], // work experience can be more than 1, so used array to respresent that
//     },
//     [sections.project]: {
//       id: sections.project,
//       sectionTitle: sections.project,
//       details: [],
//     },
//     [sections.education]: {
//       id: sections.education,
//       sectionTitle: sections.education,
//       details: [],
//     },
//     [sections.achievement]: {
//       id: sections.achievement,
//       sectionTitle: sections.achievement,
//       points: [],
//     },
//     [sections.summary]: {
//       id: sections.summary,
//       sectionTitle: sections.summary,
//       detail: "",
//     },
//     [sections.other]: {
//       id: sections.other,
//       sectionTitle: sections.other,
//       detail: "",
//     },
//   });
//   useEffect(() => {
//   }, [resumeInformation]);

//   return (
//       <div className={styles.container}>
//         <p className={styles.heading}>Create ATS Free Resume</p>
//         <div className={styles.toolbar}>
//           <div className={styles.colors}>
//             {colors.map((item) => (
//               <span
//                 key={item}
//                 style={{ backgroundColor: item }}
//                 className={`${styles.color} ${
//                   activeColor === item ? styles.active : ""
//                 }`}
//                 onClick={() => setActiveColor(item)}
//               />
//             ))}
//           </div>
//           <ReactToPrint
//             trigger={() => {
//               return (
//                 <button>
//                   Download as PDF <ArrowDown />
//                 </button>
//               );
//             }}
//             //store the change when button clicked
//             content={() => resumeRef.current}
//           />
//         </div>
//         <div className={styles.main}>
//           <Editor
//             sections={sections}
//             information={resumeInformation}
//             setInformation={setResumeInformation}
//           />

//           <Resume
//             ref={resumeRef}
//             sections={sections}
//             information={resumeInformation}
//             activeColor={activeColor}
//           />
//         </div>
//       </div>
//   );
// };

// export default MakeResume;

import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown, Sun, Moon } from "react-feather";
import styles from "./Body.module.css";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

const MakeResume = () => {
  const colors = ["#0bc5ea", "#000000FF"];
  const [activeColor, setActiveColor] = useState(colors[1]);
  const [theme, setTheme] = useState("light"); // Theme state
  const resumeRef = useRef();
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Update theme
  }, [theme]);

  // Function to get AI suggestions for a section
  const handleAISuggestions = async (section) => {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Suggest content for the "${section}" section of a professional resume.`,
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      const suggestion = data.choices[0]?.text.trim();

      if (suggestion) {
        setResumeInformation((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            detail: prev[section].detail + suggestion,
          },
        }));
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Create ATS-Free Resume</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download as PDF <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
          handleAISuggestions={handleAISuggestions} // Pass AI handler
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
};

export default MakeResume;
