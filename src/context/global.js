import React, { createContext, useEffect, useState } from "react";

import api from "../services/api";

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@UFGDTIMETABLING:USER");
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
      setSigned(true);
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      const coursesResponse = await api.get(`/courses/all/${user._id}`);
      const professorsResponse = await api.get(`/professors/all/${user._id}`);
      if (coursesResponse.data.data.length) {
        setCourses(coursesResponse.data.data);
      }
      if (professorsResponse.data.data.length) {
        setProfessors(professorsResponse.data.data);
      }
    }

    user && fetchData();
  }, [user]);

  async function deleteCourse(tag) {
    await api.delete(`/courses/?tag=${tag}&user_id=${user._id}`);

    setCourses(courses.filter((course) => course.tag !== tag));
  }

  async function updateCourses(data) {
    const response = await api.patch(`/courses/${data.tag}`, {
      ...data,
      user_id: user._id,
    });

    setCourses(
      courses.map((course) => {
        if (course.tag !== response.data.data.tag) {
          return course;
        } else {
          return response.data.data;
        }
      })
    );
  }

  async function addCourses(data) {
    const { name, periods, semesters, tag } = data;

    try {
      const response = await api.post("/courses", {
        name,
        periods,
        semesters: parseInt(semesters),
        tag,
        subjects: [],
        user_id: user._id,
      });
      setCourses([...courses, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  }
  async function addProfessor(data) {
    const { code, courses, email, name, preferences, workload } = data;

    try {
      const response = await api.post(`/professors`, {
        code,
        email,
        name,
        workload,
        courses: courses ? courses : [],
        preferences: {
          schedule: preferences.schedule ? preferences.schedule : {},
          subjects: preferences.subjects ? preferences.subjects : [],
        },
        active: true,
        user_id: user._id,
      });
      setProfessors([...professors, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProfessor(data) {
    const { code } = data;
    try {
      await api.delete(`/professors?code=${code}&user_id=${user._id}`);
      setProfessors(professors.filter((prof) => prof.code !== code));
    } catch (err) {}
  }

  async function updateProfessors(data) {
    const { active, code, courses, email, name, preferences, workload } = data;
    try {
      await api.patch(`/professors/${code}`, {
        active,
        email,
        name,
        workload,
        courses: courses ? courses : [],
        preferences: {
          schedule: preferences.schedule ? preferences.schedule : {},
          subjects: preferences.subjects ? preferences.subjects : [],
        },
        user_id: user._id,
      });

      setProfessors(
        professors.map((prof) => {
          if (prof.code !== data.code) {
            return prof;
          } else {
            return data;
          }
        })
      );
    } catch (err) {}
  }

  async function loginUser(email, password) {
    try {
      const response = await api.post("/user/login", { email, password });
      setUser({ ...response.data.data });
      setSigned(true);
      localStorage.setItem(
        "@UFGDTIMETABLING:USER",
        JSON.stringify({ ...response.data.data })
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function registerUser(name, email, password) {
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });
      setUser({ ...response.data.data });
      setSigned(true);
      localStorage.setItem(
        "@UFGDTIMETABLING:USER",
        JSON.stringify({ ...response.data.data })
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function logout() {
    setUser({});
    setProfessors([]);
    setCourses([]);
    setSigned(false);
    localStorage.removeItem("@UFGDTIMETABLING:USER");
  }

  return (
    <GlobalContext.Provider
      value={{
        professors,
        courses,
        updateCourses,
        updateProfessors,
        addProfessor,
        deleteProfessor,
        user,
        setUser,
        signed,
        setSigned,
        loginUser,
        registerUser,
        logout,
        addCourses,
        deleteCourse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
