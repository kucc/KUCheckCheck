import { Empty, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import CourseContainer from "../../../../../components/Main/CourseContainer/CourseContainer";
import { firestoreService } from "../../../../../firebase";
import { StyledTimelineItem } from "../../../style";

function UserCoursePageCard() {
  const userId = document.location.href.split("/")[4];

  const [courseContainerArray, setcourseContainerArray] = useState([]);
  useEffect(() => {
    firestoreService
      .collection("users")
      .doc(userId)
      .get()
      .then((querySnapshot) => {
        setcourseContainerArray(querySnapshot.data().courseHistory.reverse());
      });
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      <Timeline>
        {courseContainerArray.length > 0 ? (
          courseContainerArray.map((course) => {
            return (
              <div
                style={{ display: "grid", gridTemplateColumns: "50px auto" }}
              >
                <div style={{ marginTop: "-3px" }}>{course.semester}</div>
                <StyledTimelineItem>
                  <CourseContainer
                    key={course.id}
                    course={course}
                    CourseApplicationState={false}
                  />
                </StyledTimelineItem>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </Timeline>
    </div>
  );
}

export default UserCoursePageCard;
