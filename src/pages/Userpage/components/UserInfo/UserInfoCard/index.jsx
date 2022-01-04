import React, { useEffect, useState } from "react";
import { firestoreService } from "../../../../../firebase";
import { FiPaperclip } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
  StyledInfoCardContainer,
  StyledDetailCommentBox,
  StyledInfoCardEmoji,
  StyledInfoCardContour,
  StyledInfoDetailContainer,
  StyledInfoDetailName,
  StyledInfoDetailText,
  StyledInfoIconContainer,
  StyledInfoLink,
  StyledInfoEmail,
  StyledInfoBottomContainer,
  StyledInfoBottom,
} from "./style";

function UserInfoCard({ userData }) {
  const [firebaseUser, setfirebaseUser] = useState("");
  //유저 정보 불러오기
  useEffect(() => {
    async function loadUserData() {
      // key 값이 변함에 따라 값을 업데이트 해와야 하므로 다시 firebase 호출
      // 다른 방법으로 Top 컴포넌트에서 변경된 값을 prop으로 가져와서 update 해주는 방법이 있음.
      if (userData) {
        const data = await firestoreService
          .collection("users")
          .doc(userData.userId)
          .get();
        setfirebaseUser(data.data());
      }
    }
    loadUserData();
  }, [userData]);

  return (
    <StyledInfoCardContainer>
      <StyledInfoCardEmoji>
        {firebaseUser && firebaseUser.emoji}
      </StyledInfoCardEmoji>
      <StyledInfoCardContour />
      <StyledInfoDetailContainer>
        <StyledInfoDetailName>
          {firebaseUser && firebaseUser.name}
        </StyledInfoDetailName>
        <StyledInfoDetailText>
          {firebaseUser && firebaseUser.comment}
        </StyledInfoDetailText>
        <StyledDetailCommentBox>
          {firebaseUser && firebaseUser.detailComment}
        </StyledDetailCommentBox>
        <StyledInfoBottomContainer>
          <StyledInfoBottom>
            <StyledInfoIconContainer>
              <FiPaperclip color="white" />
            </StyledInfoIconContainer>
            <StyledInfoLink href={firebaseUser && firebaseUser.link}>
              {firebaseUser && firebaseUser.link}
            </StyledInfoLink>
          </StyledInfoBottom>
          <StyledInfoBottom>
            <StyledInfoIconContainer>
              <HiOutlineMail color="white" />
            </StyledInfoIconContainer>
            <StyledInfoEmail>
              {firebaseUser && firebaseUser.email}
            </StyledInfoEmail>
          </StyledInfoBottom>
        </StyledInfoBottomContainer>
      </StyledInfoDetailContainer>
    </StyledInfoCardContainer>
  );
}

export default UserInfoCard;