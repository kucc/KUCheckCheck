import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { NavBar } from '@components/NavBar';

import { BASE_COLOR } from '@utility/COLORS';
import { StyledBackground, StyledSidePadding } from '@utility/COMMON_STYLE';

import CourseAttendanceCard from './CourseAttendanceCard';
import { StyledRoundBox, StyledTextBase } from './CourseAttendanceCard/style';
import CourseAttendanceTop from './CourseAttendanceTop';

export const AttendacePage = ({ courseData }) => {
  const courseName = courseData.courseName;
  const userData = courseData.courseAttendance;
  const courseId = courseData.courseId;
  const courseCheckAdmin = courseData.courseCheckAdmin;
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseAttendance, setcourseAttendance] = useState();
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    courseData.courseAttendance &&
      setcourseAttendance(courseData.courseAttendance);
  }, [courseData]);

  const onEditedAttendance = data => {
    let newcourseAttendance = courseAttendance;
    courseAttendance.map((course, key) => {
      if (course.id === data.id) {
        newcourseAttendance[key] = data;
      }
    });
    setcourseAttendance(newcourseAttendance);
  };

  const renderCourseAttendanceCard = () => {
    if (userData) {
      return userData.map((userData, key) => {
        return (
          <CourseAttendanceCard
            key={key}
            userData={userData}
            isEditMode={isEditMode}
            editedAttendance={data => onEditedAttendance(data)}
          />
        );
      });
    }
  };

  return (
    <StyledBackground>
      <NavBar />
      <StyledSidePadding>
        <CourseAttendanceTop
          courseName={courseName}
          courseId={courseId}
          isEditMode={isEditMode}
          toggleEditMode={() => setIsEditMode(prev => !prev)}
          courseAttendance={courseAttendance}
          courseCheckAdmin={courseCheckAdmin}
        />
        {/* 모바일일때는 왼쪽에 text 표시 */}
        {isMobile ? (
          <>
            <div style={{ display: 'flex', gap: '6px' }}>
              <StyledRoundBox
                style={{
                  backgroundColor: BASE_COLOR,
                  marginTop: '30px',
                  marginLeft: '-20px',
                }}>
                <StyledTextBase>1주차</StyledTextBase>
                <StyledTextBase>2주차</StyledTextBase>
                <StyledTextBase>3주차</StyledTextBase>
                <StyledTextBase>4주차</StyledTextBase>
                <StyledTextBase>5주차</StyledTextBase>
                <StyledTextBase>6주차</StyledTextBase>
                <StyledTextBase>7주차</StyledTextBase>
                <StyledTextBase>8주차</StyledTextBase>
              </StyledRoundBox>
              {renderCourseAttendanceCard()}
            </div>
          </>
        ) : (
          renderCourseAttendanceCard()
        )}
      </StyledSidePadding>
    </StyledBackground>
  );
};

AttendacePage.propTypes = {
  courseData: PropTypes.object,
};
