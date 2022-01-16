import React, { useEffect, useState } from 'react';

import { BiSearch } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { setCategory, setSearch } from '../../../redux/actions/search_action';
import {
  StyledIconContainer,
  StyledQuickSearchContainer,
  StyledQuickSearchText,
  StyledSearchBar,
  StyledSearchBtn,
  StyledSearchContainer,
  StyledTag,
} from './style';

function MainSearch() {
  const [selectedCategory, setselectedCategory] = useState('');
  const [randomCategory, setrandomCategory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // random인 요소를 4개 가진 배열을 생성
    const categoryData = [
      'Web',
      'App',
      '알고리즘',
      '머신러닝',
      'C',
      'Python',
      'Javascript',
      'Java',
    ];
    var newArray = [];
    while (newArray.length < 4) {
      const category = categoryData.splice(
        Math.floor(Math.random() * categoryData.length),
        1,
      )[0];
      newArray.push(category);
    }
    setrandomCategory(newArray);
    // redux 값을 초기화
    dispatch(setSearch(''));
    dispatch(setCategory(''));
  }, []);

  const changeSearch = e => {
    dispatch(setSearch(e.target.value));
  };

  const handleCategory = tag => {
    if (tag === selectedCategory) {
      setselectedCategory('');
      dispatch(setCategory(''));
    } else {
      setselectedCategory(tag);
      dispatch(setCategory(tag));
    }
  };

  return (
    <>
      <StyledSearchContainer>
        <StyledSearchBtn>
          <BiSearch />
        </StyledSearchBtn>
        <StyledSearchBar
          onChange={changeSearch}
          placeholder='세션/스터디명 ex) 바닐라 자바스크립트 세션'
        />
      </StyledSearchContainer>
      <StyledQuickSearchContainer>
        <StyledQuickSearchText>
          <StyledIconContainer>
            <FaHashtag color='white' />
          </StyledIconContainer>
          &emsp;빠른 검색
        </StyledQuickSearchText>
        <div>
          {randomCategory.map(tag => (
            <StyledTag
              key={tag}
              checked={selectedCategory === tag}
              onClick={() => handleCategory(tag)}>
              {tag}
            </StyledTag>
          ))}
        </div>
      </StyledQuickSearchContainer>
    </>
  );
}
export default MainSearch;