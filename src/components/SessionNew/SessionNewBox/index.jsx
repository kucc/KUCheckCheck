import React from "react";
import { firestoreService } from "../../../firebase";
import PSessionNewBox from "./PSessionNewBox";

export default function LoginBox() {
  const enrollHandler = async (sessionInfo) => {
    const {
      courseName,
      courseInfo,
      courseGoal,
      language,
      difficulty,
      requireTime,
      courseType,
      courseDate,
      coursePlace,
      courseNotice,
      courseMember,
      courseCurriculum,
    } = sessionInfo;
    await firestoreService
      .collection("courses")
      .add({
        courseType,
        language,
        difficulty,
        requireTime,
        courseName,
        courseInfo,
        courseGoal,
        courseDate,
        coursePlace,
        courseNotice,
        courseMember,
        courseCurriculum,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
      <PSessionNewBox enrollHandler={enrollHandler} />
    </>
  );
}
